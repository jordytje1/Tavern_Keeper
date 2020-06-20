const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	category: 'Moderation',
	description: 'Kick a specified user from the server.',
	aliases: [],
	usage: '>kick <@user> <reason>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.reply(
				'You do not have the permission to use this commnad.',
			);
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.reply(
				'I do not have the permission to use this commnad.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.reply(
				' Please specify a user to kick!',
			);
		}

		if(member.id === message.author.id) {
			return message.reply(
				'You cannot kick yourself',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.reply(
				'Are you trying to get yourself into trouble?',
			);
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.reply(
				'You are not allowed to kick someone without a reason.',
			);
		}

		if (!member.kickable) {
			return message.reply(
				'You cannot kick this user, they may have a role higher then me or the same role as me.',
			);
		}

		member.kick();
		const channel = client.channels.cache.get('720997712602071098');
		const Embed = new MessageEmbed()
			.setAuthor('Member Kicked', `${member.user.displayAvatarURL()}`)
			.setColor('RED')
			.setThumbnail(`${member.user.displayAvatarURL()}`)
			.addFields(
				{ name: 'Kicked User', value: `${member.user} ID: ${member.id}` },
				{ name: 'Kicked By', value: `${message.author} ID: ${message.author.id}` },
				{ name: 'Kicked In', value: message.channel },
				{ name: 'Reason', value: Reason })
			.setTimestamp()
			.setFooter('Kicked at');
		channel.send(Embed);

		const kEmbed = new MessageEmbed()
			.setDescription(`**${member.user.tag} was kicked. |** ${Reason}`)
			.setColor('GREEN');
		message.channel.send(kEmbed).then (message.delete());
	},
};