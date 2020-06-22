/* eslint-disable no-unused-vars */
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { prefix, token, version } = process.env;
const fs = require('fs');

const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) {command.run(client, message, args);}
});

// Edited Messages
client.on('messageUpdate', async (oldMessage, newMessage) => {
	require('./events/messageUpdate')(oldMessage, newMessage);
});

// Deleted Messages
client.on('messageDelete', async (message) => {
	require('./events/messageDelete')(message);
});

// Welcome Message
client.on('guildMemberAdd', async (member) => {
	require('./events/welcome')(member);
});

// Leave Message
client.on('guildMemberRemove', async (member) => {
	require('./events/goodbye')(member);
});


// Auto Responder
client.on('message', message => {
	if (message.author.bot) return;

	if (message.content.toLocaleLowerCase().startsWith('hi')) {
		message.channel.send(`Hello, ${message.author}`);
	}
	else if (message.content.toLocaleLowerCase().startsWith('hello')) {
		message.channel.send(`Hi, ${message.author}`);
	}
});

client.login(process.env.token);
client.on('ready', () => {
	client.user.setActivity(`${prefix}help`, { type: 'PLAYING' });
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Version:', version);
	console.log('Prefix:', prefix);
});
