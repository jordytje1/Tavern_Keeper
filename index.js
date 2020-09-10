require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const prefix = "!";
const unverify_role = 'Your Unverified RoleID Here';
const verify_role = '752905551318351904';
const log = '753313405833576498';
const blacklisted = ["word1", "word2", "word3"]; // and continue doing this until you have entered all your desired words
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

client.on("message", message => {
  let delete = false
  for(word in blacklisted){
    if(message.content.includes(word)) delete = true
  }
  if(delete) message.delete()
});


keepAlive();
client.login(process.env.BOT_TOKEN);
