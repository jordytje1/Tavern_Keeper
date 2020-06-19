const { MessageEmbed } = require("discord.js");

module.exports = async (member) => {
    const channel = member.guild.channels.cache.find(ch => ch.id === '720997710911635533');
    if (!channel) return;
    channel.send(
        `Hey ${member} welcome to ${member.guild.name}! Be sure to read <#720997711708684308> and <#720997711708684308> and assign yourself some roles in <#720997711708684308>! We are a friendly community so don't be discouraged to chat us!`
    );

    const logchannel = member.guild.channels.cache.get('720997712602071098');
    const embed = new MessageEmbed()
    .setAuthor(`Member Joined` , `${member.user.displayAvatarURL()}`)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor(`GREEN`)
    .setDescription(`${member.user.tag}`)
    .setTimestamp()
    .setFooter(`User ID: ${member.user.id}`)
    logchannel.send(embed);
  }