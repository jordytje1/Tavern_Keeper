/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'nickname',
	category: 'utility',
	description: 'Set a specified user\'s nickname.',
	aliases: ['nick'],
	usage: `${prefix}nickname < @user | userid > <nickname>`,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_NICKNAMES')) {
			return message.channel.send(
				'You do not have the permission to use this command.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'Please specify a user to nickname.',
			);
		}

		const nickname = args.slice(1).join(' ');
		if (!nickname) {
			return message.channel.send(
				'Please provide a nickname.',
			);
		}

		member.setNickname(nickname);
		const embed = new MessageEmbed()
			.setDescription(`**${member.user.tag}'s nickname has been changed to ${nickname}**`)
			.setColor('GREEN');
		message.channel.send(embed);
	},
};