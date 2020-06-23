/* eslint-disable no-shadow */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'clear',
	category: 'Moderation',
	description: 'Clear up to 99 messages in a specified channel',
	aliases: ['purge', ' prune'],
	usage: `${prefix}clear <amount> [reason]`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(
				'I do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.channel.send('That is not a valid number.').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else if (amount <= 1 || amount > 100) {
			return message.channel.send('Please input a number between 1 and 99.').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = message.content.split(' ').slice(2).join(' ');

		message.channel.bulkDelete(amount, true);
		const channel = client.channels.cache.get('720997712602071098');
		const Embed = new MessageEmbed()
			.setAuthor('Bulk Message Deleted')
			.setThumbnail(message.author.displayAvatarURL())
			.setColor('RED')
			.addFields(
				{ name: 'Delete by', value: `${message.author} ID: ${message.author.id}` },
				{ name: 'Delete In', value: message.channel },
				{ name: 'Reason', value: Reason || 'No reason specified' })
			.setTimestamp()
			.setFooter('Deleted at');
		channel.send(Embed);

		const cEmbed = new MessageEmbed()
			.setDescription(`**Successfully cleared ${args[0]} messages.**`)
			.setColor('GREEN');
		message.channel.send(cEmbed).then(embed => {embed.delete({ timeout: 5000 });});
	},
};