const Discord = require("discord.js");

module.exports = {
    name: "kick",
    category: 'moderation',
    description: "Kicks the mentioned user.",
    usage: "kick \@username",
    run: (client, message, args) => {
        console.log("ACTIVITY: " + message.author.username + " ran the command: " + message.content)
        var member = message.mentions.members.first();
        if(!member.hasPermission('ADMINISTRATOR')){
            member.kick().then((member) => {
                const kicked = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been successfully kicked!")
                message.channel.send(kicked);
            })
        }
        else {
            return message.reply(member.displayName + " could not be kicked!")
        }
    }
}
