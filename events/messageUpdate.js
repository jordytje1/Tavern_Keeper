/* eslint-disable no-empty */
const { MessageEmbed } = require('discord.js');

module.exports = async (oldMessage, newMessage) => {
	if(oldMessage.author.bot) {return;}
	else {
		const embed = new MessageEmbed()
			.setAuthor('Message Edited')
			.setThumbnail(oldMessage.author.displayAvatarURL())
			.setColor('YELLOW')
			.addFields(
				{ name: 'Edited by:', value:`${oldMessage.author} ID: ${oldMessage.author.id}` },
				{ name: 'Edited in:', value:`${oldMessage.channel}` },
				{ name: 'Before', value: oldMessage.content },
				{ name: 'After', value: newMessage.content },
			)
			.setTimestamp()
			.setFooter(`User ID: ${oldMessage.author.id}`);
		const channel = oldMessage.guild.channels.cache.find(
			(ch) => ch.id === '720997712602071098',
		);
		if (!channel) return;
		channel.send(embed);
	}
};