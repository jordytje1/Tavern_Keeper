const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "say",
  usage: "say <message>",
  description: "Send your announcement",
  category: "main",
  run: async (client, message, args) => {
    
    if(!args.length) {
      return message.channel.send("Please Give your message")
    }
    
    let channel = message.guild.channels.cache.find((x) => (x.name === "" || x.name === ""))
    
    
    if(!channel) {
      return message.channel.send("there is no channel with name - XXX")
    }
                                                    
    
    let embed = new MessageEmbed()
    .setTitle('Announcement')
    .setThumbnail(message.author.avatarURL())
    .setColor("#F8C300")
    .setDescription(args.join(" "))
    .setFooter(`Requested by ${message.author.tag} `)
    .setTimestamp()   
    
    channel.send(embed).then(m => {
      m.react("")
      m.react("")
    })
    

    
    message.channel.send("Sended Your message to " + channel)
    
  }
}
