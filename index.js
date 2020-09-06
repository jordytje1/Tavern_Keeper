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


client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial); await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if ((reaction.message.channel.id === "734022513838915666") && (reaction.emoji.name === '🔒')) {
            reaction.message.guild.members.cache.get(user.id).roles.add('734367385447825482').catch()
    }
});


keepAlive();
client.login(process.env.BOT_TOKEN);
