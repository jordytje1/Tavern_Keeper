const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js")
const { BOT_MOD } = process.env;


module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
    	name: 'testannounce',
	group: 'first',
	memberName: 'meow',
   usage: "testannounce <message>",
	description: 'Replies with a meow, kitty cat.',
	throttling: {
		usages: 2,
		duration: 10,
	},
});
  run: async (client, message, args) => {
         if(message.author.id !== BOT_MOD) {
			     return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			);
		}
    
    if(!args.length) {
      return message.channel.send("Please Give your announcement")
    }
    
    let channel = message.guild.channels.cache.find((x) => (x.name === "announcements" || x.name === "》♤《announcements"))
    
    
    if(!channel) {
      return message.channel.send("there is no channel with name - announcements")
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
    

    
    message.channel.send("Sended Your announce to " + channel)
    
  }
}
