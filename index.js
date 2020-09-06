require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const client = new Client({
	disableEveryone: true,
});

const config = require('./config.json');

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});



client.on('guildMemberAdd', (guild, member) => {
	guild.addMemberRole(member.id, config.roleID, `Role added by Tom's AutoRole`)
});

keepAlive();
client.login(process.env.BOT_TOKEN);
