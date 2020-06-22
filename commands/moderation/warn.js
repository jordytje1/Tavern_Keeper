/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const prefix = process.env.prefix;

module.exports = {
	name: 'warn',
	category: 'moderation',
	description: 'Warn a specified user for breaking the rules.',
	aliases: ['strike'],
	usage: `${prefix}warn < @user | userid > <reason>`,
	guildOnly: true,
	run: async (client, message, args) => {

		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('You do not have the permission to use this commnad.');
		}

		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

		if(!user) {
			return message.channel.send('Please specify a user to warn.');
		}

		if(message.mentions.users.first().bot) {
			return message.channel.send('You are not allowed to warn bots');
		}

		if(message.author.id === user.id) {
			return message.channel.send('You are not allowed to warn yourself');
		}

		if(user.id === message.guild.owner.id) {
			return message.channel.send('Are you trying to get yourself into trouble?');
		}

		const Reason = args.slice(1).join(' ');

		if(!Reason) {
			return message.channel.send('You are not allowed to warn someone without a reason.');
		}

		const warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

		if(warnings === 5) {
			return message.channel.send(`${message.mentions.users.first().username} already reached the limit of 5 warnings`);
		}

		if(warnings === null) {
			db.set(`warnings_${message.guild.id}_${user.id}`, 1);
			const embed = new MessageEmbed()
				.setDescription(`**You have been warned in ${message.guild.name} |${Reason}** `)
				.setColor('RED');
			user.send(embed);
			const sembed = new MessageEmbed();
			await message.channel.send(sembed.setDescription(`**${user.user.tag} was warned. | ${Reason}**`).setColor('GREEN'));
		}
		else if(warnings !== null) {
			db.add(`warnings_${message.guild.id}_${user.id}`, 1);
			const embed = new MessageEmbed()
				.setDescription(`**You have been warned in ${message.guild.name} | ${Reason}** `)
				.setColor('RED');
			user.send(embed);
			const sembed = new MessageEmbed();
			await message.channel.send(sembed.setDescription(`**${user.user.tag} was warned. | ${Reason}**`).setColor('GREEN'));
		}


	},
};