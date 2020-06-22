const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'kick',
	category: 'moderation',
	description: 'Kick a specified user from the server.',
	aliases: [],
	usage: `${prefix}kick < @user | userid > <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this command.',
			);
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'I do not have the permission to use this command.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'Please specify a user to kick.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You cannot kick yourself.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'Are you trying to get yourself into trouble?',
			);
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'Please provide a reason.',
			);
		}

		if (!member.kickable) {
			return message.channel.send(
				'You are not allowed kick this user, they may have a role higher then me or the same role as me.',
			);
		}

		member.kick();
		const embed = new MessageEmbed()
			.setDescription(`**You have been kicked from ${message.guild.name} | ${Reason}**`)
			.setColor('RED');
		member.send(embed);
		const sembed = new MessageEmbed();
		await message.channel.send(sembed.setDescription(`**${member.user.tag} was kicked. | ${Reason}**`).setColor('GREEN'));
	},
};