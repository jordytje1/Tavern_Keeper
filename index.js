require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const prefix = "!";
const PREFIX = "!";
const unverify_role = 'Your Unverified RoleID Here';
const config = require("./config.json");
const { MessageEmbed } = require("discord.js");
const verify_role = '752905551318351904';
const Discord = require("discord.js");

const log = '753313405833576498';
const welcomes = '715172419131670569'
const welcome = '752211512248107177'
const embed = require('discord.js');
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
	if (reaction.channel.message.id === '822769916288434195') {
		if (reaction.emoji.name === '✅') await reaction.message.guild.members.cache.get(user.id).roles.add('752905551318351904')
		if (reaction.emoji.name === '❎') await reaction.message.guild.members.cache.get(user.id).roles.add('754682919624245379')
	}
})
client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if (user.bot) return
	if (reaction.channel.id === '822769916288434195') {
		if (reaction.emoji.name === '✅') await reaction.message.guild.members.cache.get(user.id).roles.remove('752905551318351904')
		if (reaction.emoji.name === '❎') await reaction.message.guild.members.cache.get(user.id).roles.remove('754682919624245379')
	}
})












const {WebhookClient} = require('./config'), cooldown = new Set();
const Hook = async (hook, data) => {
    if(config.logging.enabled === false) return null;
    if(!hook) return null;
    if(typeof hook !== "string") return null;
    if(!data) return null;
    if(typeof data !== "object") return null;
    let h = hook.replace(/https:\/\/(discord|discordapp).com\/api\/webhooks\//, '').split("/");
    if(!h[0]) return null;
    if(!h[1]) return null;
    let Hook = new WebhookClient(h[0], h[1]);
    if(data.status === "Success"){
    Hook.send({embeds: [
        {
            color: data.type == "Added" ? 0xFF000 : 0xFF0000,
            title: `Reaction Role Logs`,
            fields: [
                {name: "Action", value: data.type, inline: false},
                {name: `User`, value: `\`@${data.user.tag}\` (${data.user.id})`, inline: false},
                {name: `Reaction`, value: `${data.emoji}`, inline: true},
                {name: `Role`, value: `${data.role} \`@${data.role.name}\` (${data.role.id})`}
            ],
            author: {
                name: data.user.tag,
                icon_url: data.user.displayAvatarURL()
            },
            timestamp: Date.now
        }
    ]}).catch(() => {});
    }else
    if(data.status === "Failed"){
    Hook.send({embeds: [
        {
            color: 0xFF0000,
            title: `Reaction Role Logs`,
            description: data.reason,
            fields: [
                {
                    name: `INFO`,
                    value: `Failed ${data.type} role ${data.type === "added" ? "to" : "from"} ${data.user} (${data.user.id})`
                }
            ],
            author: {
                name: data.user.tag,
                icon_url: data.user.displayAvatarURL()
            },
            timestamp: Date.now
        }
    ]}).catch(() => {});
    }
}
class Reactions extends Client{
    constructor(){
        super({
            fetchAllMembers: false,
            disableEveryone: true,
            presence: {
                status: "dnd",
                activity: {
                    name: `${config.roles.length} reaction roles`,
                    type: "WATCHING"
                }
            }
        });
        this.on('ready', () =>  console.log(`${this.user.tag} is now ready!`))
        this.on('shardReady', (id) => console.log(`Shard: ${id} is now ready!`))
        this.on('shardResume', (id, replayed) => console.log(`Shard: ${id} has resumed!`))
        this.on('shardReconnecting', (id) => console.log(`Shard: ${id} is now reconnecting!`))
        this.on('shardDisconnect', (event, id) => console.log(`Shard: ${id} has Disconnected!`))
        this.on('shardError', (error, id) => console.log(`Shard: ${id} Error: ${error.stack}`))
        this.on('raw', async (event) => {
            if(!event) return null;
            if(event.t === "MESSAGE_REACTION_ADD"){
            if(config.roles.length === 0) return null;
            if(!Array.isArray(config.roles)) return console.log(`config.roles isn't an array!`);
             for await (const data of config.roles){
                if(!data.emoji) return null;
                if(!data.channelID) return null;
                if(!data.roleID) return null;
                let guild = this.guilds.cache.get(event.d.guild_id);
                if(!guild) return null;
                let role = guild.roles.cache.get(data.roleID);
                if(!role) return null;
                let channel = guild.channels.cache.get(data.channelID);
                if(!channel) return null;
                if(channel.id !== event.d.channel_id) return null;
                let member = guild.members.cache.get(event.d.user_id);
                if(!member) return null;
                if(member.user.bot) return null;
                let msg = await channel.messages.fetch(data.messageID);
                if(!msg) return null;
                if(msg.id !== event.d.message_id) return null;
                if(event.d.emoji.name === data.emoji || event.d.emoji.id === data.emoji) {
                    await msg.reactions.cache.get(event.d.emoji.id ? event.d.emoji.id : event.d.emoji.name).users.remove(member.id);
                    if(cooldown.has(member.user.id)) return member.send({embed: {color: 0xFF0000, author: {name: guild.name, icon_url: guild.iconURL()}, title: `Woah there.. you're on a 10s cooldown!`}}).catch(() => {});
                    if(!cooldown.has(member.user.id)) cooldown.add(member.user.id);
                    setTimeout(() => cooldown.delete(member.user.id), 10000);
                    if(member.roles.cache.has(role.id)){
                        member.roles.remove(role.id).then(() => {
                            Hook(config.logging.webhook, {
                                status: "Success",
                                user: member.user,
                                type: "Removed",
                                role: role,
                                emoji: event.d.emoji.id ? this.emojis.cache.get(event.d.emoji.id) : event.d.emoji
                            });
                        }).catch((error) => {
                            Hook(config.logging.webhook, {
                                status: "Failed",
                                user: member.user,
                                reason: error.stack,
                                type: "remove"
                            });
                        });
                    }else{
                        member.roles.add(role.id).then(() => {
                            Hook(config.logging.webhook, {
                                status: "Success",
                                user: member.user,
                                type: "Added",
                                role: role,
                                emoji: event.d.emoji.id ? this.emojis.cache.get(event.d.emoji.id) : event.d.emoji
                            });
                        }).catch(() => {
                            Hook(config.logging.webhook, {
                                status: "Failed",
                                user: member.user,
                                reason: error.stack,
                                type: "added"
                            });
                        });
                    }
                }
             }   
            }
        })
    }
};






		  
 
let userApplications = {}

client.on("message", function(message) {
  if (message.author.equals(client.user)) return;

  let authorId = message.author.id;

  if (message.content === "%apply") {
      console.log(`Apply begin for authorId ${authorId}`);
      // User is not already in a registration process 
	  
      if (!(authorId in userApplications)) {
          userApplications[authorId] = { "step" : 1}

          message.author.send("```We need to ask some questions so  we can know a litte bit about yourself```");
          message.author.send("```Application Started - Type '#Cancel' to cancel the application```");
          message.author.send("```Question 1: In-Game Name?```");
      }

  } else {

      if (message.channel.type === "dm" && authorId in userApplications) {
          let authorApplication = userApplications[authorId];

          if (authorApplication.step == 1 ) {
              authorApplication.answer1 = message.content;
              message.author.send("```Question 2: Age?```");
              authorApplication.step ++;
          }
          else if (authorApplication.step == 2) {
		   authorApplication.answer2 = message.content;
              message.author.send("```Question 3: Timezone? NA, AU, EU, NZ, or Other? (If other, describe your timezone)```");
              authorApplication.step ++;
          }
          else if (authorApplication.step == 3) {
		   authorApplication.answer3 = message.content;
              message.author.send("```Question 4: Do you have schematica?```");
              authorApplication.step ++;
          }

          else if (authorApplication.step == 4) {
		   authorApplication.answer4 = message.content;
              message.author.send("```Thanks for your registration. Type %apply to register again```");
              delete userApplications[authorId];
    let applystaff = new MessageEmbed()
    .setTitle('apply')
    .setThumbnail(message.author.avatarURL())
    .addFields(
		{ name: 'Question 1: In-Game Name?', value: `${authorApplication.answer1}` },
		{ name: 'Question 2: Age?', value: `${authorApplication.answer2}` },
		{ name: 'Question 3: Timezone? NA, AU, EU, NZ, or Other? (If other, describe your timezone', value: `${authorApplication.answer3}` },
		{ name: 'Question 4: Do you have schematica?', value: `${authorApplication.answer4}` },
	)
    .setColor("#ff2509")
    .setFooter(`Requested`)
    .setTimestamp()
		  client.channels.cache.get('752211513401671763').send(applystaff);
          }

      }
  }


});



















client.on('message', async message => {
if(message.content == '!close') {
     message.channel.delete()
}
});












client.on("guildMemberAdd", member => {
  if (member.guild.id !== "715171185133879358") return;
	const welcomess = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been joined ODD warriors")
  client.channels.cache.get(welcomes).send(welcomess);
})
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
  if (member.guild.id !== "715171185133879358") return;
  
	
	
	
	         const welcomesss = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been leaved ODD warriors")
  client.channels.cache.get(welcomes).send(welcomesss);
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
