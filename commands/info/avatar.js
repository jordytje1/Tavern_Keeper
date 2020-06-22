/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'avatar',
	category: 'info',
	description: 'Get the avatar of the tagged user, or your own avatar.',
	aliases: ['pfp', 'icon'],
	usage: `${prefix}avatar [@user]`,
	guildOnly: true,
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;
		const aEmbed = new MessageEmbed()
			.setTitle(`${user.username}'s avatar`)
			.setImage(user.avatarURL({ dynamic: true }))
			.setColor('BLUE')
			.setTimestamp();
		message.channel.send(aEmbed);
	},
};
