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
		const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
		const aEmbed = new MessageEmbed()
			.setTitle(`${user.user.username}'s avatar`)
			.setURL(`${user.user.displayAvatarURL({ dynamic: true })}`)
			.setImage(user.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor('BLUE')
			.setTimestamp();
		message.channel.send(aEmbed);
	},
};
