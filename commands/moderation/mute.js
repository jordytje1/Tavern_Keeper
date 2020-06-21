const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'mute',
	category: 'moderation',
	description: 'Mute a specified user.',
	aliases: ['silent'],
	usage: `${prefix}mute <@user> <reason>`,
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
		if(!member) {
			return message.channel.send(
				'Please specify a user to mute.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You cannot mute yourself.',
			);
		}

		if(member.user.bot) {
			return message.channel.send(
				'You are not allowed to mute bots.',
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


		const mutedRole = message.guild.roles.cache.get('720997710911635531');
		const verifiedRole = message.guild.roles.cache.get('722461320632467516');
		if(mutedRole) {
			member.roles.add(mutedRole);
			member.roles.remove(verifiedRole);
			const embed = new MessageEmbed()
				.setDescription(`**You have been muted in ${message.guild.name}. | ${Reason}**`)
				.setColor('RED');
			member.send(embed);
			const sembed = new MessageEmbed();
			await message.channel.send(sembed.setDescription(`**${member.user.tag} was muted. | ${Reason}**`).setColor('GREEN'));
		}
	},
};

