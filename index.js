require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const client = new Client({
	disableEveryone: true,
});
const prefix = "!";
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
  member.roles.add("752218148719034395"); // Member role.
})

client.on("guildMemberRemove", member => {
  if (member.guild.id !== "752211511996317827") return;
  
  client.channels.cache.get(memberlog).send(`So long... **${member.user.tag}** ... :(`);
});

client.on("messageReactionAdd", async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== "752211511996317827") return; // Use this if your bot was only for one server/private server.
  
  if (reaction.message.channel.id === "752211512545771591") { // This is a #self-roles channel.
    if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("752230218235772931") // Minecraft role.
      return user.send("Minecraft role was given!").catch(() => console.log("Failed to send DM."));
    }
    
    if (reaction.emoji.name === "2️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("708554654409293894"); // Roblox role.
      return user.send("Roblox role was given!").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return; // If the channel was not a #self-roles, ignore them.
  }
})

client.on("messageReactionRemove", async (reaction, user) => {
  // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== "752211511996317827") return;
  
  if (reaction.message.channel.id === "752211512545771591") {
    if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("752230218235772931") // Minecraft role removed.
      return user.send("Minecraft role was taken!").catch(() => console.log("Failed to send DM."));
    }
    
    if (reaction.emoji.name === "2️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("708554654409293894") // Minecraft role removed.
      return user.send("Roblox role was taken!").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return;
  }
})









































keepAlive();
client.login(process.env.BOT_TOKEN);
