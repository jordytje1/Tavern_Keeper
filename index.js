require('dotenv').config();
const { Client, Collection, Discord } = require('discord.js');
const keepAlive = require('./server');
prefix = "!",
const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

var emojiname = ["", ""],
    rolename = ["", ""];




client.on("message", e => {
    if (e.content.startsWith(prefix + "reaction")) {
        if (!e.channel.guild) return;
        for (let o in emojiname) {
            var n = [e.guild.emojis.find(e => e.name == emojiname[o])];
            for (let o in n) e.react(n[o])
        }
    }
});

client.on("messageReactionAdd", (e, n) => {
    if (n && !n.bot && e.message.channel.guild)
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.find(e => e.name == rolename[o]);
                e.message.guild.member(n).addRole(i).catch(console.error)
            }
});

client.on("messageReactionRemove", (e, n) => {
    if (n && !n.bot && e.message.channel.guild)
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.find(e => e.name == rolename[o]);
                e.message.guild.member(n).removeRole(i).catch(console.error)
            }
});




keepAlive();
client.login(process.env.BOT_TOKEN);
