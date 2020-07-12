/* eslint-disable no-mixed-spaces-and-tabs */
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const prefix = process.env.prefix;

module.exports = {
	name: 'giveaway',
	description: 'Create a simple giveaway',
	usage: `${prefix}giveaway <time> <channel> <prize>`,
	category: 'Utility',
	run: async (bot, message, args) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
    
    const time = args[1]
		if (!time) return message.channel.send('You did not specify your time.').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		
		if (isNaN(time)) return message.channel.send('That is not a number.').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		const channel = message.mentions.channels.first();
		if (!channel) {
			return message.channel.send(
				'Please specify the giveaway channel.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const prize = args[0];
		if (!prize) return message.channel.send('No prize specified.').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		message.channel.send(`Giveaway created in ${channel}`);
		const Embed = new MessageEmbed()
			.setTitle(`${prize}`)
			.setDescription(
				`React with 🎉 to enter this giveaway!\nEnds in: **${ms(ms(args[0]))}**\nHosted by: ${message.author}`,
			)
			.setTimestamp(Date.now() + ms(args[1]))
			.setFooter('Ends at:')
			.setColor('BLUE');
		channel.send(Embed).then((msg)=>{
			msg.react('🎉');
			setTimeout(() => {
				if (msg.reactions.cache.get('🎉').count <= 1) {
					message.channel.send(`Reactions: ${msg.reactions.cache.get('🎉').count}`);
					Embed.setTitle(`${prize}`);
					Embed.setDescription(
						`Nobody won, there was not enough poeple for me to draw a winner.\nHosted by: ${message.author}`,
					);
					Embed.setFooter('Ended at:');
					Embed.setTimestamp();
					Embed.setColor('RED');
					msg.edit(Embed);
				}

				else{
					const winner = msg.reactions.cache
						.get('🎉')
						.users.cache.filter((u) => !u.bot)
						.random();
					Embed.setTitle(`${prize}`);
					Embed.setDescription(
						`Winner: ${winner}\nHosted by: ${message.author}`,
					);
					Embed.setFooter('Ended at:');
					Embed.setTimestamp();
					Embed.setColor('GREEN');
					msg.edit(Embed);
				}

			}, ms(time));
		});
	},
};