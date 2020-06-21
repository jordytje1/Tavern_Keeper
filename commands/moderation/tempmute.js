const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const prefix = process.env.prefix;

module.exports = {
	name: 'tempmute',
	category: 'moderation',
	description: 'Temporarily mute a specific user.',
	aliases: ['tmute'],
	usage: `${prefix}tempmute <@user> <time> <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			);
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'I do not have the permission to use this commnad.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'Please specify a user to mute',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You cannot mute yourself',
			);
		}

		if(member.user.bot) {
			return message.channel.send(
				'You are not allowed to mute bots',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'Are you trying to get yourself into trouble?',
			);
		}

		const verifiedRole = message.guild.roles.cache.get('722461320632467516');
		const mutedRole = message.guild.roles.cache.get('720997710911635531');

		if(!mutedRole) return message.channel.send('Mute role not found');


		const time = args[1];
		if(!time) {
			return message.channel.send('Please specify a time!');
		}

		const Reason = args.slice(2).join(' ');
		if (!Reason) {
			return message.channel.send(
				'You are not allowed to mute someone without a reason.',
			);
		}
		if(mutedRole) {
			member.roles.remove(verifiedRole);
			member.roles.add(mutedRole);
			const channel = client.channels.cache.get('720997712602071098');
			const tEmbed = new MessageEmbed()
				.setAuthor('Member Tempmuted', `${member.user.displayAvatarURL()}`)
				.setColor('RED')
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: 'Tempmuted User', value: `${member.user} ID: ${member.id}` },
					{ name: 'Tempmuted By', value: `${message.author} ID: ${message.author.id}` },
					{ name: 'Tempmuted In', value: message.channel },
					{ name: 'Duration', value: `${ms(ms(time))}` },
					{ name: 'Reason', value: Reason })
				.setTimestamp()
				.setFooter('Tempmuted at');
			channel.send(tEmbed);

			const Embed = new MessageEmbed()
				.setDescription(`**${member.user.tag} was muted for ${ms(ms(time))} |** ${Reason}`)
				.setColor('GREEN');
			message.channel.send(Embed).then (message.delete());

			const sEmbed = new MessageEmbed()
				.setDescription(`**You were tempmuted for ${ms(ms(time))} in ${message.guild.name}. |** ${Reason}`)
				.setColor('RED');
			member.send(sEmbed);
		}

		setTimeout(function() {
			member.roles.add(verifiedRole);
			member.roles.remove(mutedRole);
			const channel = client.channels.cache.get('720997712602071098');
			const tEmbed = new MessageEmbed()
				.setAuthor('Member Unmuted', `${member.user.displayAvatarURL()}`)
				.setColor('GREEN')
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: 'Unmuted User', value: `${member.user} ID: ${member.id}` },
					{ name: 'Unmuted By', value: `${client.user} ID: ${client.user.id}` },
					{ name: 'Unmuted In', value: message.channel },
					{ name: 'Duration', value: `${ms(ms(time))}` },
					{ name: 'Reason', value: 'Temporary mute completed' })
				.setTimestamp()
				.setFooter('Unmuted at');
			channel.send(tEmbed);

			const Embed = new MessageEmbed()
				.setDescription(`**${member.user.tag} was unmuted. |** Temporary mute completed`)
				.setColor('GREEN');
			message.channel.send(Embed);
		}, ms(time));
	},
};