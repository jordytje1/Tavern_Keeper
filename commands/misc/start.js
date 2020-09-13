const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "start",//aka the folder name without js
    aliases: ["start"],
    category: "modmail",//this is what ever ever dir you are in (dev, info, moderation, music)
    description: "Start a thread",
    usage: "start",
    dev: false,//if it is for the dev the true;
    run: async (client, message, args) => {
//your code goes here!
const start = new Discord.MessageEmbed()
  .setTitle(`Start Message Thread`)
  .setDescription(`To start a message thread, please DM me and we will forword your message to the staff team!`)
  .setFooter(`Requested by: ${message.author.tag}`)
  .setColor("RANDOM")

message.channel.send(start)
//end code
  }
}
