/* eslint-disable no-empty */
const { MessageEmbed } = require('discord.js');

module.exports = async (message) => {
	if (message.author.bot) {return;}
	else {
		const embed = new MessageEmbed()
			.setAuthor('Message Deleted')
			.setThumbnail(message.author.displayAvatarURL())
			.setColor('RED')
			.addFields(
				{ name: 'Deleted by:', value:`${message.author} ID: ${message.author.id}` },
				{ name: 'Deleted in:', value:`${message.channel}` },
				{ name: 'Content:', value:`${message.content}` },
			)
			.setTimestamp()
			.setFooter('Deleted at');
		const channel = message.guild.channels.cache.find(
			(ch) => ch.id === '720997712602071098',
		);
		if (!channel) return;
		channel.send(embed);
	}
};