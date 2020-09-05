const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "announce",
  usage: "announce <message>",
  description: "Send your announcement",
  category: "main",
  run: async (client, message, args) => {
    
    if(!args.length) {
      return message.channel.send("Please Give your announcement")
    }
    
    let channel = message.guild.channels.cache.find((x) => (x.name === "announcements" || x.name === "announcements"))
    
    
    if(!channel) {
      return message.channel.send("there is no channel with name - announcements")
    }
                                                    
    
    let embed = new MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor("#F8C300")
    .setDescription(args.join("ANNOUNCEMENT"))
    .setFooter(`Requested by ${message.author.tag} `)
    .setTimestamp()   
    
    channel.send(embed).then(m => {
      m.react("")
      m.react("")
    })
    

    
    message.channel.send("Sended Your announce to " + channel)
    
  }
}
