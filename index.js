require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { BOT_PREFIX, BOT_VERSION, BOT_TOKEN } = process.env;
const keepAlive = require('./server');

const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();

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

keepAlive();
client.login(BOT_TOKEN);
client.on('ready', () => {
	client.user.setActivity(`${BOT_PREFIX}help`, { type: 'PLAYING' });
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Version:', BOT_VERSION);
	console.log('Prefix:', BOT_PREFIX);
});
