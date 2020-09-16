const Discord = require('discord.js');

module.exports = {
	name: 'lock',
	category: 'moderation',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'lock',
	run: async (client, message, args) => {
    if(!message.content.startsWith('!add'))return;  

  let channelsend = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setTitle(`Added User`)
  .setDescription(`${message.author} Has locked this channel`)

  message.channel.overwritePermissions([
  {
     id: message.guild.roles.everyone,
     deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
   },
]);
  message.channel.send(channelsend)

    
    }  
  }
