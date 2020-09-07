const Discord = require("discord.js");

module.exports = {
    name: "kick",
    category: 'moderation',
    description: "kicks the mentioned user.",
    usage: "kick \@username",
    run: (client, message, args) => {
        console.log("ACTIVITY: " + message.author.username + " ran the command: " + message.content)
        var member = message.mentions.members.first();
        if (!member) {
            return message.reply("please mention a user to kick!")
        }
        if(!member.hasPermission('ADMINISTRATOR')){
            member.kick().then((member) => {
                const kick = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been successfully kicked!")
                message.channel.send(kick);
            })
        }
        else {
            return message.reply(member.displayName + " could not be kicked!")
            
            user.send(`You are kicked in **${message.guild.name}** For \`${reason}\``)
        }
    }
}
