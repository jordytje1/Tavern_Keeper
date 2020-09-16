const channels = require('../../json/channel.json')
const fs = require('fs')

module.exports = {
	name: 'setchannel',
	category: 'misc',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'setchannel',
	run: async (client, message, args) => {

    //Checking if server isn't in our json file
    if (!channels[message.guild.id]) {
        channels[message.guild.id] = {
            channel: message.mentions.channels.first().id,
            guild: message.guild.id
        }

        //Since the server hasn't set the welcome channel we need them to tag the channel in order to set it.
        if (!args[0]) return message.reply("Please tag a welcome channel!")

        //If user didn't tag channel but he write something we will return
        if (args[0] && !message.mentions.channels.first()) return message.reply("Please tag a channel!")

        //saving
        fs.writeFile('././json/channel.json', JSON.stringify(channels, null, 4), (err) => {
            if (err) throw err;

        })

        //Since we are saving the channel's id we need to get the channel from the id
        const wChan = bot.channels.cache.get(channels[message.guild.id].channel)
        
        //Now we send message and return
        return message.reply(`Your welcome channel is ${wChan}`)
    //It is
    } else {
        //Now if user doesn't specify an argument we will show him current channel
        if (!args[0]) return message.reply(`Current welcome channel ${ channels[message.guild.id].channel}`)
        
        //Now if user specify an argument but doesn't tag channel we will return;
        if (args[0] && !message.mentions.channels.first()) return message.reply("Please tag a channel!")

        //We are again setting 
        channels[message.guild.id] = {
            channel: message.mentions.channels.first().id,
            guild: message.guild.id
        }

        //Saving
        fs.writeFile('././json/channel.json', JSON.stringify(channels, null, 4), (err) => {
            if (err) throw err;

        })
        
        //Since we are saving the channel's id we need to get the channel from the id
        const wChan = bot.channels.cache.get(channels[message.guild.id].channel)
        
        //Now we send message and return
        return message.reply(`New welcome channel ${wChan}`)
    }


}
