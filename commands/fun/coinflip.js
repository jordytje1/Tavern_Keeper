/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;


module.exports = {
	name: 'coinflip',
	category: 'fun',
	description: 'Roll a dice and get a random number from 1 - 6.',
	aliases: ['cf', 'coinf'],
	usage: `${prefix}coinflip`,
	run: async (client, message, args) => {
		const responses = ['Heads', 'Tails'];
		const response =
		responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(' Flipping...').then((msg) => {
			const Embed = new MessageEmbed()
				.setTitle('You filpped a . .')
				.setColor('BLUE')
				.setDescription(
					`${response}!`,
				);
			msg.edit(Embed);
		});
	},
};