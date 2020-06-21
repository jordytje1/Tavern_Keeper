/* eslint-disable no-inner-declarations */
/* eslint-disable no-mixed-spaces-and-tabs */
const { MessageEmbed } = require('discord.js');
const PREFIX = process.env.prefix;

module.exports = {
	name: 'stats',
	category: 'info',
	description: 'Display info about this server or a tagged user.',
	aliases: [ 'info' ],
	usage: `${PREFIX}stats | ${PREFIX}stats [@user] | ${PREFIX}stats [user_id]`,
	guildOnly: true,
	  run: async (client, message) => {
		const args = message.content.split(' ');
		if(args.length > 2) {
			message.channel.send(`Incorrect Usage: ${PREFIX}stats | ${PREFIX}stats <user_id> | ${PREFIX}stats @mention`);
		}
		else if(args.length === 2) {
			const member = message.mentions.members.size === 1 ?
				message.mentions.members.first() :
				message.guild.members.cache.get(args[1]);
			if(member) {
				const uEmbed = new MessageEmbed()
					.setColor('BLUE')
					.setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
					.setThumbnail(member.user.displayAvatarURL())
					.setTimestamp()
					.addFields(
						{ name:'Status', value: member.presence.status },
						{ name:'Account Created On', value: member.user.createdAt.toLocaleString() },
						{ name:'Joined Server On', value: member.joinedAt.toLocaleString() },
						{ name:'Voice Channel', value: member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None' },
						{ name:'Kickable', value: member.kickable },
					)
					.setDescription(`Roles:
           ${member.roles.cache.map(role => role.toString()).join(',')}`);
				message.channel.send(uEmbed);
			}
			else {
				message.channel.send(`I couldn't find that member with ID ${args[1]}`);
			}

		}
		else {
			const { guild } = message;
			function capitalizeFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
			const sEmbed = new MessageEmbed()
				.setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
				.setThumbnail(guild.iconURL())
				.setTimestamp()
				.addFields(
					{ name:'Guild Owner', value: guild.owner.user.tag },
					{ name:'Location', value: guild.region.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) },
					{ name:'Created On', value: guild.createdAt.toLocaleString() },
					{ name:'Total Members', value: `${guild.memberCount} (${guild.members.cache.filter(member => !member.user.bot).size} Users ${guild.members.cache.filter(member => member.user.bot).size} Bots)` },
					{ name:'Total Channels', value: `${guild.channels.cache.filter(ch => ch.type === 'text').size} Text ${guild.channels.cache.filter(ch => ch.type === 'voice').size} Voice` },
					{ name:'Verification', value: `${capitalizeFirstLetter(message.guild.verificationLevel.toString().toLowerCase())}` },
				)
				.setColor('BLUE');
			message.channel.send(sEmbed);
		}
	},
};
