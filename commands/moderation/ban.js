const Discord = require("discord.js");

module.exports = {
    name: "ban",
    category: 'moderation',
    description: "Bans the mentioned user.",
    usage: "ban \@username",
    run: (client, message, args) => {
        console.log("ACTIVITY: " + message.author.username + " ran the command: " + message.content)
        var member = message.mentions.members.first();
        if (!member) {
            return message.reply("please mention a user to ban!")
        }
        if(!member.hasPermission('ADMINISTRATOR')){
            member.ban().then((member) => {
                const banned = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been successfully banned!")
                message.channel.send(banned);
            })
        }
        else {
            return message.reply(member.displayName + " could not be banned!")
        }
    }
}
