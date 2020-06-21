/* eslint-disable no-unused-vars */
const prefix = process.env.prefix;

module.exports = {
	name: 'dadjoke',
	category: 'fun',
	description: 'Get a random dad joke.',
	aliases: ['joke'],
	usage: `${prefix}dadjoke`,
	run: async (client, message, args) => {
		const customDiscordJokes = require('custom-discord-jokes');
		customDiscordJokes.getRandomDadJoke (function(joke) {
			message.channel.send(joke);
		});
	},
};