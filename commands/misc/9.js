const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your Suggestion",
  category: "main",
  run: async (client, message, args) => {
    
    if(!args.length) {
      return message.channel.send("Please Give the Suggestion")
    }
    
    if(message.channel.type == "dm") {
                                                    
    
    let embed = new MessageEmbed()
    .setTitle('Suggestion')
    .setThumbnail(message.author.avatarURL())
    .setColor("#00D166")
    .setDescription(args.join(" "))
    .setFooter(`Requested by ${message.author.tag} `)
    .setTimestamp()   
    
    
    channel.send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    })
    

    
    message.channel.send("Sended Your Suggestion to " + channel)
    
  }
}
