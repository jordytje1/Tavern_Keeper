const Discord = require('discord.js');
module.exports = {
    name: "warn",
    category: 'moderation',
    description: "warns the mentioned user.",
    usage: "warn <user>",
    run: (client, message, args, level) => {
  try {
    const user = message.mentions.users.first()

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        if (!client.warns.get(message.guild.id)) client.warns.set(message.guild.id, {});
        if (!client.warns.get(message.guild.id)[member.id]) client.warns.get(message.guild.id)[member.id] = 0;

        client.warns.get(message.guild.id)[member.id] += 1;
        message.reply(`Successfully warned ${user.tag}`);

        const modLogChannel = "logs";
        if (modLogChannel && message.guild.channels.find(c => c.name === "logs")) {
          let embed = new Discord.RichEmbed()
          .setTitle('User Warn')
          .setColor('#eeeeee')
          .setDescription(`Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`);

          message.guild.channels.find(c => c.name === "logs").send(embed);
        }

        if (client.warns.get(message.guild.id)[member.id] == 3) {
          member.ban(args.slice(1).join(' ')).then(() => {
            message.reply(`Successfully banned ${user.tag}`);

            client.warns.get(message.guild.id)[member.id] = 0;
          }).catch(err => {
            message.reply('I was unable to ban the member for exeding the max amount of warns');
          });
        }
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to warn!');
    }
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
};
    }
}
