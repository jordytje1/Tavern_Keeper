const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "report",
  usage: "report <message>",
  description: "Send your report",
  category: "main",
  guildonly: "false",
  run: async (client, message, args) => {
    
    if(!args.length) {
      return message.channel.send("Please Give the report")
    }
    
    const channel = client.channels.cache.get('752211513401671763');
    
    
    if(!channel) {
      return message.channel.send("there is no channel with name - suggestions")
    }
                                                    
    
    let embed = new MessageEmbed()
    .setTitle('Report')
    .setThumbnail(message.author.avatarURL())
    .setColor("#ff2509")
    .setDescription(args.join(" "))
    .setFooter(`Requested by **${message.author.tag}** in **${message.guild.name}** `)
    .setTimestamp()   
    
    
    channel.send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    })
    

    
    message.channel.send("Sended Your report to " + channel)
    
  }
}
