const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "support",//aka the folder name without js
    aliases: ["support"],
    category: "support",//this is what ever ever dir you are in (dev, info, moderation, music)
    description: "message a user",
    usage: "support {user <@id>} {msg content}",
    run: async (client, message, args) => {
//your code goes here!
      
//const args = message.content.slice(`m+reply `.length).split( );
const memberr = args[1];
const userr = message.mentions.users.first();
const user = message.guild.member(userr);
      

const argse = message.content.slice(`m+reply ${userr}`.length).split( );
      
const supportMessage = argse;
      
const embed = new Discord.MessageEmbed()
  .setTitle(`Message Sent!`)
  .setDescription(`Successfully send the message to <@${user.id}> (${userr.tag})`)
  .addField("Message:", supportMessage)
  .setColor("62c95d")
  .setTimestamp()
message.author.send(embed)

const replyEmbed = new Discord.MessageEmbed()
  .setTitle(`New Message!`)
  .setDescription(`**You have recieved a message from ${message.author.tag}**`)
  .addField("Message:", supportMessage)
  .setColor("4f8edb")
  .setTimestamp()
user.send(replyEmbed)

      
//end code
  }
}
