/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'avatar',
	category: 'Info',
	description: 'Get the avatar of a specified user, or your own avatar.',
	aliases: ['pfp', 'icon'],
	usage: `${prefix}avatar [@user | userid]`,
	guildOnly: true,
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.author;
		const embed = new MessageEmbed()
			.setTitle(`${member.username}'s avatar`)
			.setURL(member.user.displayAvatarURL({ dynamic: true }))
			.setImage(member.user.displayAvatarURL({ dynamic: true }))
			.setColor('BLUE');
		message.channel.send(embed);
	},
};
