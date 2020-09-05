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






client.on("guildMemberAdd", member => { // Adds the role to the new member
	if(v.enabled) // Checks if the bot is on
	{
		let role = member.guild.roles.cache.find(role => role.name === v.test);
		member.roles.add(role);
	}
	else if(v.roleID) // If role specified in the JSON, bot is always on
	{
		let role = member.guild.roles.cache.find(role => role.id === v.734367385447825482);
		member.roles.add(role);
	}
});









keepAlive();
client.login(process.env.BOT_TOKEN);
