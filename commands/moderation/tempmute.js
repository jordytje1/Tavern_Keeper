const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const prefix = process.env.prefix;

module.exports = {
	name: 'tempmute',
	category: 'Moderation',
	description: 'Temporarily mute a specific user.',
	aliases: ['tmute'],
	usage: `${prefix}tempmute <@user | userid> <time> <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this command.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'I do not have the permission to use this command.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'Please specify a user to mute.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You cannot mute yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.user.bot) {
			return message.channel.send(
				'You are not allowed to mute bots.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'Are you trying to get yourself into trouble?',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const verifiedRole = message.guild.roles.cache.get('722461320632467516');
		const mutedRole = message.guild.roles.cache.get('720997710911635531');

		if(!mutedRole) return message.channel.send('Mute role not found.');


		const time = args[1];
		if(!time) {
			return message.channel.send('Please specify a time.').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = args.slice(2).join(' ');
		if (!Reason) {
			return message.channel.send(
				'Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		if(mutedRole) {
			member.roles.remove(verifiedRole);
			member.roles.add(mutedRole);
			const channel = message.guild.channels.cache.get('720997712602071098');
			const Embed = new MessageEmbed()
				.setAuthor('Member Tempmuted', `${member.user.displayAvatarURL()}`)
				.setColor('RED')
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: 'Tempmuted User', value: `${member.user} ID: ${member.id}` },
					{ name: 'Tempmuted By', value: `${message.author} ID: ${message.author.id}` },
					{ name: 'Tempmuted In', value: message.channel },
					{ name: 'Tempmute Duration', value: ms(ms(time)) },
					{ name: 'Reason', value: Reason })
				.setTimestamp()
				.setFooter('Tempmuted at');
			channel.send(Embed);
			const embed = new MessageEmbed()
				.setDescription(`**You have been tempmuted for${ms(ms(time))} in ${message.guild.name}. | ${Reason}**`)
				.setColor('RED');
			member.send(embed);
			const sembed = new MessageEmbed();
			await message.channel.send(sembed.setDescription(`**${member.user.tag} was muted for ${ms(ms(time))}. | ${Reason}**`).setColor('GREEN'));
		}

		setTimeout(function() {
			member.roles.add(verifiedRole);
			member.roles.remove(mutedRole);
			const channel = message.guild.channels.cache.get('720997712602071098');
			const Embed = new MessageEmbed()
				.setAuthor('Member Ummuted', `${member.user.displayAvatarURL()}`)
				.setColor('GREEN')
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: 'Unmuted User', value: `${member.user} ID: ${member.id}` },
					{ name: 'Umuted By', value: `${client.user} ID: ${client.user.id}` },
					{ name: 'Reason', value: 'Temporary Mute Complete' })
				.setTimestamp()
				.setFooter('Unmuted at');
			channel.send(Embed);
			const embed = new MessageEmbed()
				.setDescription(`**You have been unmuted in ${message.guild.name}. | Temporary mute completed**`)
				.setColor('GREEN');
			member.send(embed);
			const sembed = new MessageEmbed();
			message.channel.send(sembed.setDescription(`**${member.user.tag} was unmuted. | Temporary mute complete**`).setColor('GREEN'));
		}, ms(time));
	},
};