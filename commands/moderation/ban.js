const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'ban',
	category: 'moderation',
	description: 'Ban a specified user from the server.',
	aliases: [],
	usage: `${prefix}ban <@user> <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this command.',
			);
		}

		if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'I do not have the permission to use this command.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'Please specify a user to ban.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You cannot ban yourself.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'Are you trying to get yourself into trouble?',
			);
		}

		const Reason = message.content.split(' ').slice(2).join(' ');
		if (!Reason) {
			return message.channel.send(
				'Please provide a reason.',
			);
		}

		if (!member.bannable) {
			return message.channel.send(
				'You are not allowed ban this user, they may have a role higher then me or the same role as me.',
			);
		}

		member.ban();
		const embed = new MessageEmbed()
			.setDescription(`**You have been banned from ${message.guild.name} | ${Reason}**`)
			.setColor('RED');
		member.send(embed);
		const sembed = new MessageEmbed();
		await message.channel.send(sembed.setDescription(`**${member.user.tag} was banned. | ${Reason}**`).setColor('GREEN'));
	},
};