const { MessageEmbed } = require("discord.js");

module.exports = async (message, oldMessage, newMessage) => {
  if(message.author.bot) return;
  try {
    let embed = new MessageEmbed()
      .setAuthor(`${oldMessage.author.tag}` , `${oldMessage.author.displayAvatarURL()}`)
      .setColor(`YELLOW`)
      .setDescription(
        `**Message edited in <#${oldMessage.channel.id}>**`
      )
      .addFields(
          {name: `Before`, value: oldMessage.content},
          {name: `After`, value: newMessage.content}
          )
        .setTimestamp()
        .setFooter(`User ID: ${oldMessage.author.id}`)
    let channel = oldMessage.guild.channels.cache.find(
      (ch) => ch.id === "720997712602071098"
    );
    if (!channel) return;
    channel.send(embed);
  } catch (e) {}
};