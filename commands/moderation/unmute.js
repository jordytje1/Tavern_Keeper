const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'unmute',
	category: 'Moderation',
	description: 'Unmute a specified user.',
	aliases: ['unsilent'],
	usage: `${prefix}unmute < @user | userid > <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this command.',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'I do not have the permission to use this command.',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'Please specify a user to unmute.',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You are not allowed to unmute yourself.',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}


		const mutedRole = message.guild.roles.cache.get('720997710911635531');
		const verifiedRole = message.guild.roles.cache.get('722461320632467516');
		if(mutedRole) {
			member.roles.remove(mutedRole);
			member.roles.add(verifiedRole);
			const embed = new MessageEmbed()
				.setDescription(`**You have been unmuted in ${message.guild.name} | ${Reason}**`)
				.setColor('GREEN');
			member.send(embed);
			const sembed = new MessageEmbed();
			await message.channel.send(sembed.setDescription(`**${member.user.tag} was unmuted. | ${Reason}**`).setColor('GREEN'));
		}
	},
};