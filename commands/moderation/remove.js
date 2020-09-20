const Discord = require('discord.js');

module.exports = {
	name: 'remove',
	category: 'moderation',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'remove',
	run: async (client, message, args) => {
    let memberssss = message.mentions.members.first()
    if(!message.content.startsWith('!add'))return;  

    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Need The **Support Team** Role To Add Users To Tickets`)

    if(!message.member.roles.cache.find(r => r.name == '『💛』『support』')) return message.channel.send(notallowed)
let user = message.mentions.members.first()

  let channelsend = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setTitle(`Added User`)
  .setDescription(`${message.author} Has removed ${message.mentions.members.first()} from This Ticket`)

  let categorysend = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setDescription(`This Server Hasn't Been Setup | Contact The Server Owner`)
   
  message.channel.overwritePermissions([
  {
     id: memberssss,
     deny: ['VIEW_CHANNEL', 'ADD_REACTIONS'],
  },
]);
  message.channel.send(channelsend)

    
    }  
  }
