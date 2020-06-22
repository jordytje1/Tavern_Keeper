/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const prefix = process.env.prefix;

module.exports = {
	name: 'check',
	category: 'moderation',
	description: 'Get the warnings of you or specfied person.',
	aliases: ['warnings'],
	usage: `${prefix}check [ @user | userid ]`,
	guildOnly: true,
	run: (client, message, args) => {
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

		if(warnings === null) warnings = 0;

		const embed = new MessageEmbed()
			.setTitle(`Moderation information for ${user.user.username}#${user.user.discriminator}`)
			.setDescription(`**❯ Strikes:** ${warnings}`)
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor('BLUE');
		message.channel.send(embed);


	},
};