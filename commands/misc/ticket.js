module.exports = {
    name: 'channel',
    description: 'Creates a new channel for the user.',
    aliases: ['channel'],
	  usage: 'channel',
 	  run: (client, message, args) => {
    execute(message) {
        const userName = message.author.username;
        const channelName = `Channel for ${userName}`;

        message.guild.channels.create(channelName,{
        type: 'text',
        persmissionOverwrites: [
                { 
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                    deny: ['SEND_MESSAGE'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        });
        message.channel.send(`Hi ${message.author} your new channel is ${channelName}`);
    },
};
