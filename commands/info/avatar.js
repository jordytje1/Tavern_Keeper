/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'avatar',
	category: 'info',
	description: 'Get the avatar of a specified user, or your own avatar.',
	aliases: ['pfp', 'icon'],
	usage: `${prefix}avatar [ @user | userid ]`,
	guildOnly: true,
	run: async (client, message, args) => {
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
		const embed = new MessageEmbed()
			.setTitle(`${member.user.username}'s avatar`)
			.setURL(member.user.displayAvatarURL({ dynamic: true }))
			.setImage(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
			.setColor('BLUE');
		message.channel.send(embed);
	},
};
