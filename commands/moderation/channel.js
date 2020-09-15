const discord = require('discord.js')



module.exports = {
	name: 'channel',
	category: 'moderation',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'channel',
	run: async (client, message, args) => {

const test = member.guild.channels.cache.find(channel => channel.name === "`${message.author.username}`");
    
if(!test) return;
         const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .setAuthor(''
        .setTitle('Welcome!')
        .setDescription(`${message.author.username} just joined the discord! Make sure to read #rules!`)
        .setThumbnail(message.user.avatarURL)
        .setFooter('Note: The maximum amount of answers is 9.')
        .setTimestamp();

    message.send(welcomeEmbed);
	
		
		
		
		
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
  message.guild.channels.create(`${message.author.username}`,(args.slice(0).join(" "), {type: 'text',

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
								
	}))
  message.channel.send("Channel successfully created!");

  logchannel.send(createembed)
   },
};

