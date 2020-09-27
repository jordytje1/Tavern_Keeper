const ytdl = require("ytdl-core");
 
module.exports = {
	name: 'play',
	category: 'music',
	description: 'plays music',
	aliases: ['play'],
	usage: 'play <name>',
	run: async (client, message, args) => {
 
    if (!message.member.voiceChannel) return message.channel.send("Connect with a voice channel first.");
 
    if (message.guild.me.voiceChannel) return message.channel.send("Sorry the bot is already connected with a voice channel.");
 
    if (!args[0]) return message.channel.send("Sorry give me an URL");
 
    var validate = await ytdl.validateURL(args[0]);
 
    if (!validate) return message.channel.send("Sorry, give me a valid URL.");
 
    var info = await ytdl.getInfo(args[0]);
 
    const streamOptions = { seek: 0, volume: 100 };
 
    let voiceConnection = message.member.voiceChannel.join()
        .then(voiceConnection => {
            const stream = ytdl(args[0], { filter: 'audioonly' });
            const streamDispatcher = voiceConnection.playStream(stream, streamOptions);
        })
        .catch(console.error);
 
    message.channel.send(`Now playing ${info.title}`);
 }
}
 
