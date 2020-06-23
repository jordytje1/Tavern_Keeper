/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'guilds',
	category: 'Info',
	description: 'Shows a list of servers that the bot is in.',
	aliases: ['servers'],
	usage: `${prefix}guilds`,
	run: async (client, message, args) => {
		if (message.author.id !== '450846017890549761') return;

		const list = client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n');

		const botembed = new MessageEmbed()
			.setDescription(`**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.`)
			.setColor('BLUE')
			.addField('Servers', list);
		message.channel.send(botembed);
	},
};