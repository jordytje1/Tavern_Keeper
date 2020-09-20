const Discord = require('discord.js');

module.exports = {
	name: 'add',
	category: 'moderation',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'add',
	run: async (client, message, args) => {
    let membersss = message.member.id.first()
    if(!message.content.startsWith('!add'))return;  

    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Need The **Support Team** Role To Add Users To Tickets`)

    if(!message.member.roles.cache.find(r => r.name == '『💛』『support』')) return message.channel.send(notallowed)
let user = message.mentions.members.first()

  let channelsend = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setTitle(`Added User`)
  .setDescription(`${message.author} Has Added ${message.mentions.members.first()} To This Ticket`)

  let categorysend = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setDescription(`This Server Hasn't Been Setup | Contact The Server Owner`)
   
  message.channel.overwritePermissions([
  {
     id: membersss,
     deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
  },
]);
  message.channel.send(channelsend)

    
    }  
  }
