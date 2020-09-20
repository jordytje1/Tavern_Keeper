const prefix = process.env.BOT_PREFIX;
const Discord = require('discord.js');

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
    message.channel.send(`My current prefix for this guild is \`${prefix}\``);
  }

  if (!message.content.startsWith(prefix)) return;

  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    command.run(client, message, args);
  }
};
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    };

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.reply('there was an error trying to execute that command!');
    }
};
