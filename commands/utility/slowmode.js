module.exports = {
    name: "slowmode",
    aliases: ["slow"],
    category: "Utility",
    description: "Set the slowmode for a specific channel.",
    usage: ">slowmode <seconds> ",
    run: async (bot, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) 
        return message.reply(
            'You do not have the permission to use this commnad.'
            );

        if (!args[0])
        return message.reply(
          `Please specify the amount in second.`
        );
        if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
        message.channel.setRateLimitPerUser(args[0]);
        message.channel.send(
            `I have set the slowmode to **${args[0]}** secomds.`
        );
    },
  };