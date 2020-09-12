require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const prefix = "!";
const unverify_role = 'Your Unverified RoleID Here';
const verify_role = '752905551318351904';
const log = '753313405833576498';
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



client.on("guildMemberAdd", member => {
  if (member.guild.id !== "752211511996317827") return;
  
  client.channels.cache.get(memberlog).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
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
  
  client.channels.cache.get(memberlog).send(`So long... **${member.user.tag}** ... :(`);
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









client.on("message",async message=>{
    if(message.author.bot||message.type=="dm")return;
    var arg = message.content.toLowerCase().split(" ");
    if(arg[0]!='!ticket')return;
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")||!message.guild.me.hasPermission("MANAGE_ROLES")){
        message.channel.send("Not enough permissions I require the `MANAGE_CHANNELS` and `MANAGE_ROLES` permission!");
        return;
    }
    let TicketCategory = message.guild.channels.find(channel=>channel.name==="Open Tickets");
    if(TicketCategory==null){
        await message.guild.createChannel('Open Tickets', {
            type: 'category',
            permissionOverwrites: [{
              id: message.guild.id,
              deny: ['READ_MESSAGES']
            }]
          })
          .then(t=>TicketCategory=t)
          .catch(console.error);
    }
    switch (arg[1]) {
        case "create":
            if(arg.length<=2){
                message.reply("Incorrect usage! pls type `!ticket create (reason)`");
                return;
            }
            let reason = arg.slice(2).join(" ");
            // reason=message.author+" issued a ticket with the reason\n\n**"+reason+"**";
            reason = new Discord.RichEmbed()
            .setTitle("User "+message.author.username+" issued a ticket!")
            .setDescription(reason)
            .setFooter("Pls solve as quickly as possible!")
            .setColor('#32cd32');
            if(reason.length>=1800){
                message.reply("Pls describe your problem in less words")
                return;
            }
            let roles = message.guild.roles.filter(x=>x.hasPermission("MANAGE_CHANNELS"));
            let perms=[];
            roles.forEach(role => {
               perms.push( 
                    {
                        id:role.id,
                        allow:["READ_MESSAGES"]
                    }
                )
              });
              perms.push(
                    {
                        id:message.guild.id,
                        deny: ["READ_MESSAGES"]
                    },
                    {
                        id: message.author.id,
                        allow:["READ_MESSAGES"]
                    }
              );
            message.guild.createChannel(message.author.username+"s ticket",{
                type:"text",
                parent:TicketCategory.id,
                permissionOverwrites:perms
            }).then(channel=>channel.send(reason))
            break;
        case "delete":
            if(!message.channel.name.endsWith("ticket")){
                message.reply("You must type this command in a open ticket");
                break;
            }
            message.reply("Are you sure you want to close this ticket?\nType `!ticket confirm` to confirm.");
            
            const collector = message.channel.createMessageCollector(
                m=>m.content.toLowerCase().startsWith("!ticket confirm")&&m.author.id==message.author.id,
                {time:20000,max:1}
            );
            collector.on('collect', m => {
                if(!m.channel.deletable)message.reply("Error!!! I cannot delete this channel");
                else m.channel.delete();
              });
            break;
        case "help":
            var help = new Discord.RichEmbed()
                .setTitle("Hello "+message.author.username+"!")
                .setDescription("How to create a ticket? Use the commands in any channel of the discord server.")
                .addField("!ticket create <reason>","Create a private channel with you and staff to solve to issuse together!")
                .addField("!ticket delete","Issue is solved? then you can delete the channel with ticket delete")
                .setColor('#32cd32');
            message.author.send(help);
            break;
        default:
            break;
    }
});















keepAlive();
client.login(process.env.BOT_TOKEN);
