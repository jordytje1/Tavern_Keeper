/* eslint-disable no-shadow */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'report',
	category: 'moderation',
	description: 'Report a user who is breaking the rules.',
	aliases: [],
	usage: `${prefix}report < @user | userid > <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'Please specify a user to report',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You are not allowed report yourself',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		if(member.user.bot) {
			return message.channel.send(
				'You are not allowed to report bots',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'Are you trying to get yourself into trouble?',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'You are not allowed to report someone without a reason.',
			).then (message.delete({ timeout: 5000 })).then(message.delete()).then(embed => {embed.delete();});
		}

		const channel = member.guild.channels.cache.get('724508956981985351');
		const embed = new MessageEmbed()
			.setAuthor('New User Reported')
			.setColor('RED')
			.addFields(
				{ name: 'Reported User', value: `${member.user} ID: ${member.id}` },
				{ name: 'Reported By', value: `${message.author} ID: ${message.author.id}` },
				{ name: 'Reported In', value: message.channel },
				{ name: 'Reason', value: Reason })
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
			.setFooter('Reported at');
		channel.send(embed);

		const mEmbed = new MessageEmbed()
			.setDescription('**The user was reported.**')
			.setColor('GREEN');
		message.channel.send(mEmbed).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
	},
};