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


client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");

    if(!channel) return;

    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor(pink)
        .setAuthor('IdealBot', 'https://hypixel.net/attachments/ideal-png.1417277/', 'https://hypixel.net/threads/ideal-ideal-%E2%9D%96-level-52-%E2%9D%96-sweaty-skyblock-guild-%E2%9D%96-top-10-sb-guild-%E2%9D%96-splashes-%E2%9D%96-events-%E2%9D%96-recruiting.2500755/')
        .setTitle('Welcome!')
        .setDescription(`${member} just joined the discord! Make sure to read #rules!`)
        .setThumbnail(message.user.avatarURL)
        .setFooter('Note: The maximum amount of answers is 9.')
        .setTimestamp();

    channel.send(welcomeEmbed);
});



keepAlive();
client.login(process.env.BOT_TOKEN);
