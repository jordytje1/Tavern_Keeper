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
		 let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }
  let avatar = user.displayAvatarURL({ size: 128, dynamic: true });

		const embed = new MessageEmbed()
			.setTitle(`${user.tag}'s avatar`)
			.setURL(avatar)
			.setImage(avatar)
			.setColor('BLUE');
		message.channel.send(embed);
	},
};