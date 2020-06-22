const { MessageEmbed } = require('discord.js');

module.exports = async (member) => {
	const channel = member.guild.channels.cache.find(ch => ch.id === '720997710911635533');
	if (!channel) return;
	channel.send(
		`${member} just left ${member.guild.name}. Goodbye ${member}! ${member.guild.name} has ${member.guild.memberCount} members now.`,
	);

	const logchannel = member.guild.channels.cache.get('723134799551922236');
	const embed = new MessageEmbed()
		.setAuthor('Member Left', `${member.user.displayAvatarURL()}`)
		.setColor('RED')
		.setDescription(`${member.user.tag}`)
		.setThumbnail(member.user.displayAvatarURL())
		.setTimestamp()
		.setFooter(`User ID: ${member.user.id}`);
	logchannel.send(embed);
};