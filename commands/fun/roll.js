/* eslint-disable no-unused-vars */
const rollDice = () => Math.floor(Math.random() * 6) + 1;
const prefix = process.env.prefix;

module.exports = {
	name: 'roll',
	category: 'fun',
	description: 'Roll a dice and get a random number from 1 - 6.',
	aliases: ['rolldice', ' diceroll'],
	usage: `${prefix}roll`,
	run: async (client, message, args) => {
		message.channel.send(`${message.author}, You rolled a ` + rollDice());
	},
};