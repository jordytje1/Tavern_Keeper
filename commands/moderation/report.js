const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'report',
	category: 'moderation',
	description: 'Report a user who is breaking the rules.',
	aliases: [],
	usage: '>report <@user> <reason>',
	guildOnly: true,
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.reply(
				'Please specify a user to report',
			);
		}

		if(member.id === message.author.id) {
			return message.reply(
				'You are not allowed report yourself',
			);
		}

		if(member.user.bot) {
			return message.reply(
				'You are not allowed to report bots',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.reply(
				'Are you trying to get yourself into trouble?',
			);
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.reply(
				'You are not allowed to report someone without a reason.',
			).then (message.delete());
		}

		const channel = member.guild.channels.cache.get('720997712602071098');
		const embed = new MessageEmbed()
			.setAuthor('New User Reported')
			.setColor('RED')
			.addFields(
				{ name: 'Reported User', value: `${member.user} ID: ${member.id}` },
				{ name: 'Reported By', value: `${message.author} ID: ${message.author.id}` },
				{ name: 'Reported In', value: message.channel },
				{ name: 'Reason', value: Reason })
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
			.setFooter('Reported at');
		channel.send(embed);

		const mEmbed = new MessageEmbed()
			.setDescription('**The user was reported.**')
			.setColor('GREEN');
		message.channel.send(mEmbed).then (message.delete());
	},
};