/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { parseDur } = require('../../functions.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'uptime',
	description: 'Check the bot\'s uptime.',
	category: 'Info',
	aliases: [ 'ontime' ],
	usage: `${prefix}uptime`,
	run: async (client, message, args) => {
		const duration = parseDur(client.uptime);
		message.channel.send('⌛ Loading...').then((msg) => {
			const pEmbed = new MessageEmbed()
				.setTitle(':inbox_tray: I am online!')
				.setColor('BLUE')
				.setDescription(
					`Online for: ${duration}`,
				);
			msg.edit(pEmbed);
		});


	},
};