const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const prefix = process.env.prefix;

module.exports = {
	name: 'help',
	aliases: ['h', 'commands'],
	category: 'info',
	description: 'Returns all commands, or one specific command info',
	usage: `${prefix}help | ${prefix}help [command]`,
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
		.setColor('BLUE');


	const commands = (category) => {
		return client.commands
			.filter((cmd) => cmd.category === category)
			.map((cmd) => `- \`${cmd.name}\``)
			.join(' ');
	};

	const info = client.categories
		.map(
			(cat) =>
				stripIndents`${cat[0].toUpperCase() + cat.slice(1)} \n${commands(
					cat,
				)}`,
		)
		.reduce((string, category) => string + '\n' + category);

	return message.channel.send(
		embed.setDescription(`This server's prefix is \`${prefix}\`.\nFor more info on a specific command, type \`${prefix}help <command name>\`.\n\n${info}`),
	);
}

function getCMD(client, message, input) {
	const embed = new MessageEmbed();

	const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

	const info = `No information found for command ${input.toLowerCase()}`;

	if (!cmd) {
		return message.channel.send(embed.setColor('BLUE').setDescription(info));
	}
	else{
		const hembed = new MessageEmbed()
			.setTitle('Command Info')
			.setColor('BLUE')
			.setTimestamp()
			.setFooter('Syntax: <> = required, [] = optional', `${client.user.avatarURL()}`)
			.addFields(
				{ name: 'Name:', value: `${cmd.name}` },
				{ name: 'Catergory:', value: `${cmd.category}` },
				{ name: 'Description:', value: `${cmd.description}` },
				{ name: 'Usage:', value: `${cmd.usage}` },
				{ name: 'Aliases:', value: `${cmd.aliases.map((a) => `\`${a}\``).join(', ')}` || 'None' },
			);
		message.channel.send(hembed);
	}
}