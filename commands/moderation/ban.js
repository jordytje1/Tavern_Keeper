const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'ban',
	category: 'moderation',
	description: 'Ban a specified user from the server.',
	aliases: [],
	usage: `${prefix}ban <@user> <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			);
		}

		if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'I do not have the permission to use this commnad.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'Please specify a user to ban!',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You cannot ban yourself',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'Are you trying to get yourself into trouble?',
			);
		}

		const Reason = message.content.split(' ').slice(2).join(' ');
		if (!Reason) {
			return message.channel.send(
				'You are not allowed to ban someone without a reason.',
			);
		}

		if (!member.bannable) {
			return message.channel.send(
				'You cannot ban this user, they may have a role higher then me or the same role as me.',
			);
		}

		member.ban();
		const channel = client.channels.cache.get('720997712602071098');
		const Embed = new MessageEmbed()
			.setAuthor('Member Banned', `${member.user.displayAvatarURL()}`)
			.setColor('RED')
			.setThumbnail(`${member.user.displayAvatarURL()}`)
			.addFields(
				{ name: 'Banned User', value: `${member.user} ID: ${member.id}` },
				{ name: 'Banned By', value: `${message.author} ID: ${message.author.id}` },
				{ name: 'Banned In', value: message.channel },
				{ name: 'Reason', value: Reason })
			.setTimestamp()
			.setFooter('Banned at');
		channel.send(Embed);

		const bEmbed = new MessageEmbed()
			.setDescription(`**${member.user.tag} was banned. |** ${Reason}`)
			.setColor('GREEN');
		message.channel.send(bEmbed).then (message.delete());
	},
};