require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const prefix = "!";
const PREFIX = "!";
const unverify_role = 'Your Unverified RoleID Here';
const { MessageEmbed } = require("discord.js");
const verify_role = '752905551318351904';
const Discord = require("discord.js");
const log = '753313405833576498';
const welcome = '752211512248107177';
const bannedWords = [`kut`, `vagina/`, `homo /`, `kanker/`, `kk/`, `kkr/`, `tyfus/`, `tering/`, `penis`, `.gg`, `discord.gg`, `discord gg`, `discordgg`, `discord gg /`];
const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Map();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


let memberlog = "752211513401671763";







client.on('message', async message => {
	if (message.content.startsWith('${PREFIX}reactionroles')) {
		let msg = await message.channel.send('react for some roles')
		await msg.react('✅').then(msg.react('❎'))
		
	}
})
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if (user.bot) return
	if (reaction.channel.message.id === '754770037306294462') {
		if (reaction.emoji.name === '✅') await reaction.message.guild.members.cache.get(user.id).roles.add('752905551318351904')
		if (reaction.emoji.name === '❎') await reaction.message.guild.members.cache.get(user.id).roles.add('754682919624245379')
	}
})
client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if (user.bot) return
	if (reaction.channel.id === '752211512248107175') {
		if (reaction.emoji.name === '✅') await reaction.message.guild.members.cache.get(user.id).roles.remove('752905551318351904')
		if (reaction.emoji.name === '❎') await reaction.message.guild.members.cache.get(user.id).roles.remove('754682919624245379')
	}
})
















client.on("message", (message) => {
    
    
    if (message.channel.type === "dm") { 
        var args = message.content.split(" ").slice(0)
        var args = args.slice(0).join(" ")
        var BOT_ID = client.user.id
        var userID = message.author.id
        if (message.content.startsWith(config.PREFIX)) return message.channel.send(":x: Please use commands in real server! :x:") 
        if (message.author.bot) return;
        message.channel.send("This message has been send to the staff! :incoming_envelope:").then(msg => msg.delete(3000))
        if (message.content.startsWith(config.PREFIX)) return
        if (args.length > 1024) return message.reply("Your message content too many characters (1024 Limit) :/") 
        var embed = new Discord.RichEmbed()
            .setColor(config.ORANGE)
            .setAuthor("New Message", "https://cdn.discordapp.com/attachments/502649544622735362/520740243133956138/receive.png")
            .addBlankField(true)
            .addField(`Sent by: ${message.author.username}`, 
            args)
            .addBlankField(true)
            .setTitle("*Message**:")
            .setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.avatarURL)
            .setTimestamp()
        client.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send(embed).catch(console.log(`Message recieved from ${userID}!(${message.author.username})`))
        client.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send({embed: {
            "description": `${config.PREFIX}reply ${message.author.id} <message>`,
        }
    })
    }else
    
    
    if (message.content.startsWith(config.PREFIX + "reply")) {
        if (message.author.id !== config.YOUR_ID) return message.reply('You cannot use that!')
        var args = message.content.split(" ").slice(0)
        var Rargs = message.content.split(" ").slice(2).join(" ")
        var userID = args[1]
        if (isNaN(args[1])) return message.reply("This is not an ID! Make sure to you the user's ID!")
        var embed = new Discord.RichEmbed()
            .setColor(config.ORANGE)
            .setAuthor("New Message", "https://cdn.discordapp.com/attachments/502649544622735362/520740243133956138/receive.png")
            .addBlankField(true)
            .setDescription(Rargs)
            .addBlankField(true)
            .setTitle("**Message**:")
            .setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.avatarURL)
        client.users.get(userID).send(embed).catch(console.log(`Message was sent to ${userID}!`))
        if (message.author.bot) return;
        message.channel.send("Your Message was Sent!").then(msg => msg.delete(3000)).catch(console.error)

    }

});



































client.on("guildMemberAdd", member => {
  if (member.guild.id !== "752211511996317827") return;
  
	
	
		 const welcomes = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been joined ⚡𝙎𝙥𝙖𝙧𝙠𝙮⚡𝙨𝙪𝙥𝙥𝙤𝙧𝙩 𝙨𝙚𝙧𝙫𝙚𝙧")
  client.channels.cache.get(welcome).send(welcomes);
  member.roles.add("752585847534125096"); // Member role.
})


client.on("guildMemberAdd", member => {
  if (member.guild.id !== "653322621710106635") return;
  
  client.channels.cache.get(log).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
  member.roles.add("653329683085000744"); // Member role.
})

client.on('message', (message) => {

if(message.content == 'ping') {
     message.delete()
}
});


client.on("guildMemberRemove", member => {
  if (member.guild.id !== "752211511996317827") return;
  
	
	
	
	         const bye = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been leaved ⚡𝙎𝙥𝙖𝙧𝙠𝙮⚡𝙨𝙪𝙥𝙥𝙤𝙧𝙩 𝙨𝙚𝙧𝙫𝙚𝙧")
  client.channels.cache.get(welcome).send(bye);
});


client.on("guildMemberRemove", member => {
  if (member.guild.id !== "653322621710106635") return;
  
  client.channels.cache.get(log).send(`**${member.user.tag}** has left the server 😭`);
});

client.on('message', (message) => {

    if (message.content == "!verify"){
        message.member.roles.add(verify_role)
	    message.delete()
    }

});



client.on(`message`, async message => {
    try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
            if (message.author.id === message.guild.ownerID) return;
            await message.delete();
            await message.channel.send(`**please shut up your mouth and watch your language`);
        }
    } catch (e) {
        console.log(e);
    }
});





var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = 'play.questal.eu'; // Your MC server IP or hostname address
var mcPort = 25607; // Your MC server port (25565 is the default)

var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;

function getStatus() {
    return new Promise((resolve, reject) => {
        request(url, function(err, response, body) {
            var status;
            if(err) {
                console.log(err);
                reject(new Error('API error'));
            } else {
                body = JSON.parse(body);
                if(body.online) {
                    status = (body.players.now || '0') + ' of ' + body.players.max;
                } else {
                    status = 'offline';
                }
                resolve(status);
            }
        });

    })
}

async function interval() {
    client.user.setPresence({ game: { name: await getStatus() }, status: 'online' })
        .then(console.log)
        .catch(console.error);
}


client.on('message', async message => {
    if (message.content === mcCommand) {
        message.reply(await getStatus());
    }
});
 

keepAlive();
client.login(process.env.BOT_TOKEN);
