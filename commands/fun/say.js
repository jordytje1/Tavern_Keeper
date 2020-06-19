const PREFIX = process.env.PREFIX

module.exports = {
    name: "say",
    category: "Fun",
    description: "Get the bot to say what ever you want.",
    aliases: [],
    usage: '>say <message>',
    guildOnly: true,
    run: async (client, message, args) => {
      let text = args.join(" ");
      if (!text)return message.channel.send('You did not specify a message to say!');
      message.delete();
      message.channel.send(text);
    },
  };