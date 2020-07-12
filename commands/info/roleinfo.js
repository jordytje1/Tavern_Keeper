/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const prefix = process.env.prefix;

const option = {
	true: 'Yes',
	false: 'No',
};

module.exports = {
	name: 'roleinfo',
	category: 'Info',
	description: 'Displays information about a provided role.',
	aliases: ['role'],
	usage: `${prefix}channelinfo <role>`,
	run: async (client, message, args) => {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if(!role) {
			return message.channel.send(
				'Please specify a role',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
    
		const embed = new MessageEmbed()
			.setDescription(`**Role information for ${role.name}**`)
			.setColor(role.hexColor)
			.addField('General', [
				`**❯ Name:** ${role.name}`,
				`**❯ ID:** ${role.id}`,
				`**❯ Hex Color:** ${role.hexColor.toUpperCase()}`,
				`**❯ Created on:** ${moment(role.createdTimestamp).format('Do MMMM YYYY HH:mm')}`,
				'\u200b',
			])
			.addField('Server', [
				`**❯ Position:** ${role.position}`,
				`**❯ Hoisted:** ${option[role.hoist]}`,
				`**❯ Mentionable:** ${option[role.mentionable]}`,
				`**❯ Members:** ${role.members.size}`,
				'\u200b',
			])
			.addField('Permissions', [
				`${role.permissions.toArray().map(x => x.split('_').map(y => y[0] + y.slice(1).toLowerCase()).join(' ')).join(', ')}`,
			]);


		return message.channel.send(embed);
	},
};