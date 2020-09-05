const Discord = require("discord.js");

module.exports = {
    name: "purge",
    category: 'moderation',
    description: "Deletes all messages in the current channel.",
    usage: "purge",
    run: (client, message, args) => {
        console.log("ACTIVITY: " + message.author.username + " ran the command: " + message.content)
        if (message.member.hasPermission('ADMINISTRATOR')) {
            async function clear() {
                message.delete();
                const fetched = await message.channel.messages.fetch({limit: 99});
                message.channel.bulkDelete(fetched);
            }
            clear();
        }
        else {
            const noperms = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("I'm sorry you don\'t have admin permissions to run that command 😔")
            message.channel.send(noperms);
        }
    }
}
