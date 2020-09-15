const discord = require('discord.js')



module.exports = {
	name: 'channel',
	category: 'moderation',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'channel',
	run: async (client, message, args) => {

  

 let logchannel = message.guild.channels.cache.find(ch => ch.name === "logs")

 if(!logchannel) return message.channel.send("Couldn't find log channel called 'logchannel'")

  

 let perms = message.member.hasPermission("ADMINISTRATOR")

 if(!perms) return message.channel.send("You do not have permission to do this!")

  

  //   if(!args[0]) return message.channel.send("Please include a name for the channel!")

  

  let createembed = new discord.MessageEmbed()

  .setColor('#15E3F0')

  .setTitle('Channel Created | ')

  .addField('Created By: ', `**${message.author.username}**`)

  .setTimestamp()

  .setFooter("Author: 𝕯𝖗𝖆𝖌𝖔𝖓𝖇𝖔𝖞#6241")

let role = message.guild.roles.cache.find(r => r.name === "『💛』『support』");
  message.guild.channels.create('${message.author.username}-ticket').args.slice(0).join(" "), {type: 'text',

			     permissionOverwrites: [{
			          allow: "VIEW_CHANNEL",
			          id: role
		        },
		        {
				  deny: "VIEW_CHANNEL",
				  id: message.guild.id
			},
		        {
				allow: "VIEW_CHANNEL",
			        id: message.author.id
			}
		   ]
	})
  message.channel.send("Channel successfully created!");

  logchannel.send(createembed)
   },
};

