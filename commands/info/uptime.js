const {MessageEmbed} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "uptime",
    description: "Check the bot\'s uptime.",
    category: "info",
    aliases: [ 'ontime' ],
    usage: '>uptime',
    run: async(client, message, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    message.channel.send('⌛ Loading...').then((msg) => {
        const pEmbed = new MessageEmbed()
        .setTitle("I am online!")
        .setColor('BLUE')
        .setDescription(
            `🟢 I am online!\nOnline for:\n${duration}`
          )
        msg.edit(pEmbed);
      });
        

    
      }
    }