const {MessageEmbed} = require('discord.js');
const prefix = process.env.prefix

module.exports = {
  name: 'help',
  category: "Info",
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '>help | >help [command]',
  guildOnly: true,
  run: async (client, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(!helpArgs[0]) {
    var hEmbed = new MessageEmbed()
    .setTitle(`${client.user.username}'s Commands`)
    .setDescription(`This server's prefix is \`${prefix}\`.\nFor more info on a specific command, type \`${prefix}help <command name>\`.'`)
    .setColor('BLUE')
    .setTimestamp()
    .setFooter(`${client.user.username}'s Help'`, `${client.user.avatarURL()}`)
    .addFields(
      {name:'Fun', value:'`8ball` `dog` `giveaway` `meme` `roll` `say`'},
      {name:'Info', value:'`avatar` `help` `ping` `stats` `uptime`'},
      {name:'Moderation', value:'`ban` `clear` `kick` `mute` `report` `tempmute` `unmute`'},
      {name:'Utility', value:'`slowmode`'},
      )
    message.channel.send(hEmbed);
    }
    if(helpArgs[0]) {
      let command = helpArgs[0];

    if(client.commands.has(command)) {
      command = client.commands.get(command);
      var hEmbed = new MessageEmbed()
      .setTitle('Command Info')
      .setColor('BLUE')
      .setTimestamp()
      .setFooter('Syntax: <> = required, [] = optional', `${client.user.avatarURL()}`)
      .addFields(
        { name: 'Name:', value: `${command.name}`},
        { name: 'Catergory:', value: `${command.category}`},
        { name: 'Description:', value: `${command.description}`},
        { name: 'Usage:', value: `${command.usage}`},
        { name: 'Aliases:', value: `${command.aliases.join(', ')}` || 'None'},
        )
      message.channel.send(hEmbed);
        }
      }
    }
};