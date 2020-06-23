const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'mute',
	category: 'Moderation',
	description: 'Mute a specified user.',
	aliases: ['silent'],
	usage: `${prefix}mute <@user | userid> <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this command.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'I do not have the permission to use this command.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'Please specify a user to mute.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'You cannot mute yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.user.bot) {
			return message.channel.send(
				'You are not allowed to mute bots.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'Are you trying to get yourself into trouble?',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}


		const mutedRole = message.guild.roles.cache.get('720997710911635531');
		const verifiedRole = message.guild.roles.cache.get('722461320632467516');
		if(mutedRole) {
			member.roles.add(mutedRole);
			member.roles.remove(verifiedRole);
			const channel = message.guild.channels.cache.get('720997712602071098');
			const Embed = new MessageEmbed()
				.setAuthor('Member Muted', `${member.user.displayAvatarURL()}`)
				.setColor('RED')
				.setThumbnail(`${member.user.displayAvatarURL()}`)
				.addFields(
					{ name: 'Muted User', value: `${member.user} ID: ${member.id}` },
					{ name: 'Muted By', value: `${message.author} ID: ${message.author.id}` },
					{ name: 'Muted In', value: message.channel },
					{ name: 'Reason', value: Reason })
				.setTimestamp()
				.setFooter('Muted at');
			channel.send(Embed);
			const embed = new MessageEmbed()
				.setDescription(`**You have been muted in ${message.guild.name}. | ${Reason}**`)
				.setColor('RED');
			member.send(embed);
			const sembed = new MessageEmbed();
			await message.channel.send(sembed.setDescription(`**${member.user.tag} was muted. | ${Reason}**`).setColor('GREEN'));
		}
	},
};

