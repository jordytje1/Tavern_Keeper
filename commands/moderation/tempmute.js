const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You have insufficient permissions to execute this command.");
  let muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!muteUser) return message.channel.send("Couldn't find user | **Usage:** `>mute @user <time> <reason>`");
  if(muteUser.hasPermission("ADMINISTRATOR")) return message.channel.send(":clown: You tried. :clown:");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.channel.send("Specify a reason | **Usage:** `>mute @user <time> <reason>`");

  let muterole = message.guild.roles.find(r => r.name === "Muted")
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#5c5c5c",
        permissions:[]
      });

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      
    }catch(e){
      console.log(e.stack);
    }
  }
  let length = args[1];
  if(!length) return message.channel.send("**Usage:** `>mute @user <time> <reason>`");
  message.delete().catch();

  let muteLogEmbed = new Discord.RichEmbed()
  .setAuthor(`Punishment | ${muteUser.user.tag} | Mute`, muteUser.user.displayAvatarURL)
  .setDescription(`**Target:** ${muteUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${reason}\n \n**Issued Duration:** ${length}\n \n**Issued In:** ${message.channel}`)
  .setColor("#e74c3c")
  .setTimestamp()
  .setFooter(`ID: ${muteUser.id}`)

  let channel = message.guild.channels.find(c => c.name === "modlogs");
  if(!channel) return message.reply("Log channel not found.");
  channel.send(muteLogEmbed).then(() => {
    message.delete()
    muteUser.send(`You've been **muted** in **${message.guild.name}** for reason: **${reason}**, and duration: **${length}**`).catch(err => console.log(err))
    message.channel.send(`${muteUser} has been **muted** for **${length}**.`)
})

  await(muteUser.addRole(muterole.id));

  setTimeout(function(){
    muteUser.removeRole(muterole.id);

    let unmuteLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${muteUser.user.tag} | Unmute`, muteUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${muteUser}\n \n**Removed By:** ${bot.user}\n \n**Issued Reason:** Expired/False\n \n**Issued In:** Console`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter(`ID: ${muteUser.id}`)

    channel.send(unmuteLogEmbed).then(() => {
      muteUser.send(`Your **mute** in **${message.guild.name}** has **expired**. You may now talk.`).catch(err => console.log(err))
  })
;

  }, ms(length));

}

module.exports.help = {
  name: "mute"
