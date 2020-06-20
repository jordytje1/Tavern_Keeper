const {MessageEmbed} = require('discord.js');
const { stripIndents } = require("common-tags")
 
module.exports = {
  name: 'help',
  category: "Info",
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '>help | >help [command]',
  run: async (client, message, args) => {
    if (!args[0]) {
      const embed = new MessageEmbed().setColor("BLUE");

  const commands = (category) => {
    return client.commands
      .filter((cmd) => cmd.category === category)
      .map((cmd) => `- \`${cmd.name}\``)
      .join(" ");
  };

  const info = client.categories
    .map(
      (cat) =>
        stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(
          cat
        )}`
    )
    .reduce((string, category) => string + "\n" + category);

  return message.channel.send(embed.setDescription(info));
    } else {
      let cmd = args[0];
      
      if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
        let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        let embed = new MessageEmbed()
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
        
        return message.channel.send(embed);
      } else {
        return message.channel.send({embed: {color: "RED", description: "Unknown command."}});
      }
    }
  }
}