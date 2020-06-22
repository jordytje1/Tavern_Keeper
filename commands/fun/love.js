/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { getMember } = require('../../functions.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'love',
	category: 'fun',
	description: 'Calculates the love affinity you have for another person.',
	aliases: ['ship'],
	usage: `${prefix}love [@user]`,
	run: async (client, message, args) => {
		let person = getMember(message, args[0]);

		if (!person || message.author.id === person.id) {
			person = message.guild.members.cache
				.filter(m => m.id !== message.author.id)
				.random();
		}

		const love = Math.random() * 100;
		const loveIndex = Math.floor(love / 10);
		const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

		const embed = new MessageEmbed()
			.setColor('#ffb6c1')
			.addField(`☁ **${person.user.username}** loves **${message.member.displayName}** this much:`,
				`💟 ${Math.floor(love)}%\n\n${loveLevel}`);

		message.channel.send(embed);
	},
};