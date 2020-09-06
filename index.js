require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

 client.on('guildMemberAdd', member=> {
    member.addRole(member.guild.roles.find("name","lol"));
    });

keepAlive();
client.login(process.env.BOT_TOKEN);
