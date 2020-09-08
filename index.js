require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const client = new Client({
	disableEveryone: true,
});
const prefix = "!";
const unverify_role = 'Your Unverified RoleID Here';
const verify_role = '752905551318351904';
client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


let memberlog = "752211513401671763";



client.on("guildMemberAdd", member => {
  if (member.guild.id !== "752211511996317827") return;
  
  client.channels.cache.get(memberlog).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
  member.roles.add("752585847534125096"); // Member role.
})



client.on("guildMemberRemove", member => {
  if (member.guild.id !== "752211511996317827") return;
  
  client.channels.cache.get(memberlog).send(`So long... **${member.user.tag}** ... :(`);
});




client.on('message', (message) => {
  if (message.channel.id !== "752211511996317827") return;
	message.delete()





keepAlive();
client.on('message', (message) => {

    if (message.content == "!verify"){
        message.member.roles.add(verify_role)
	    message.delete()
    }

});

client.login(process.env.BOT_TOKEN);
