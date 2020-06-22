/* eslint-disable no-inner-declarations */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'help',
	aliases: ['h', 'commands'],
	category: 'info',
	description: 'Returns all commands, or one specific command info',
	usage: `${prefix}help [command]`,
	run: async (client, message, args) => {
		if (args[0]) {
			return getCMD(client, message, args[0]);
		}
		else {
			return getAll(client, message);
		}
	},
};

function getAll(client, message) {
	const embed = new MessageEmbed()
		.setTitle(`${client.user.username}'s Commands`)
		.setFooter(`${client.user.username}'s Help`, `${client.user.avatarURL()}`)
		.setTimestamp()
		.setColor('BLUE')
		.setDescription(`This server's prefix is \`${prefix}\`.\nFor more info on a specific command, type \`${prefix}help <command name>\`.`);

	const categories = [...new Set(client.commands.map(cmd => cmd.category))];

	for (const category of categories) {
		embed.addField(`${(category)}`, client.commands.filter(cmd =>
			cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
	}
	return message.channel.send(embed);
}

function getCMD(client, message, input) {
	const embed = new MessageEmbed();

	const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

	const info = `No information found for command ${input.toLowerCase()}`;

	if (!cmd) {
		return message.channel.send(embed.setColor('BLUE').setDescription(info)).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete();});
	}
	else{
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		const hembed = new MessageEmbed()
			.setTitle('Command Info')
			.setColor('BLUE')
			.setTimestamp()
			.setFooter('Syntax: <> = required, [] = optional', `${client.user.avatarURL()}`)
			.addFields(
				{ name: 'Name:', value: `${cmd.name}` },
				{ name: 'Catergory:', value: `${capitalizeFirstLetter(cmd.category.toString().toLowerCase())}` },
				{ name: 'Description:', value: `${cmd.description}` },
				{ name: 'Usage:', value: `${cmd.usage}` },
				{ name: 'Aliases:', value: `${cmd.aliases.map((a) => `\`${a}\``).join(', ')}` || '`None`' },
			);
		message.channel.send(hembed);
	}
}