const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "reply",//aka the folder name without js
    aliases: ["reply"],
    category: "modmail",//this is what ever ever dir you are in (dev, info, moderation, music)
    description: "Reply to a message",
    usage: "reply {user <@id>} {msg content}",
    run: async (client, message, args) => {
//your code goes here!
      
//const args = message.content.slice(`m+reply `.length).split( );
const memberr = args[1];
const userr = message.mentions.users.first();
const user = message.guild.member(userr);
      
//if (user.roles.has('746858184504770651')) {
if(message.member.roles.cache.some(role => role.name === '『💛』『support』')){

const argse = message.content.slice(`m+reply ${userr}`.length).split( );
      
const replyMessage = argse;
      
const embed = new Discord.MessageEmbed()
  .setTitle(`Message Sent!`)
  .setDescription(`Successfully send the message to <@${user.id}> (${userr.tag})`)
  .addField("Message:", replyMessage)
  .setColor("62c95d")
  .setTimestamp()
message.author.send(embed)

const replyEmbed = new Discord.MessageEmbed()
  .setTitle(`New Reply!`)
  .setDescription(`**You have recieved a reply from ${message.author.tag}**`)
  .addField("Message:", replyMessage)
  .setColor("4f8edb")
  .setTimestamp()
user.send(replyEmbed)

  } else{

  message.reply(`Error Code 403 ||| Solution: Please gain the role "Modmail Access" to run this command!`)
    
  }
      
//end code
  }
}
