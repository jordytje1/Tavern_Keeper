const { MessageEmbed } = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'giveaway',
	description: 'Create a simple giveaway',
	usage: '<time> <channel> <prize>',
	category: 'fun',
	run: async (bot, message, args) => {
		if (!args[0]) return message.channel.send('You did not specify your time!');
		if (
			!args[0].endsWith('d') &&
      !args[0].endsWith('h') &&
      !args[0].endsWith('m')
		) {
			return message.channel.send(
				'Please use the correct time format.',
			);
		}
		if (isNaN(args[0][0])) return message.channel.send('That is not a number!');
		const channel = message.mentions.channels.first();
		if (!channel) {
			return message.channel.send(
				'Please specify the giveaway channel.',
			);
		}
		const prize = args.slice(2).join(' ');
		if (!prize) return message.channel.send('No prize specified!');
		message.channel.send(`Giveaway created in ${channel}`);
		const Embed = new MessageEmbed()
			.setTitle(`${prize}`)
			.setDescription(
				`React with 🎉 to enter this giveaway!\nEnds in: **${ms(ms(args[0]))}**\nHosted by: ${message.author}`,
			)
			.setTimestamp(Date.now() + ms(args[0]))
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

			}, ms(args[0]));
		});
	},
};