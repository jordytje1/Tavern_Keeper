
const ytdl = require('ytdl-core');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	name: 'play',
	category: 'Fun',
	description: 'Generate clapified 👏 text 👏',
	aliases: [],
	usage: 'play <song>',
	run: async (client, message, args) => {
        if (!message.member.voice.channel) {
            message.reply(client.lang.notInVoiceChannel);

            return;
        }

        let url = args[0],
            validate = await ytdl.validateURL(url);

        if (!validate) {
            let searcher = client.commands.get('search');

            searcher.run(message, args);

            return;
        }

        let unplayable = false;
        let info = await ytdl.getInfo(url).catch(e => {
            unplayable = true;
        });

        if (unplayable) {
            message.reply(client.lang.unplayableVideo);

            return;
        }

        let data = client.active.get(message.guild.id) || {};

        if (!data.connection) {
            data.connection = await message.member.voice.channel.join();
        }

        if (!data.queue) {
            data.queue = [];
        }

        data.guildID = message.guild.id;

        let { videoDetails: details } = info,
            title = details.title,
            duration = moment.duration(details.lengthSeconds, 'seconds').format(client.consts.FORMAT.MUSIC_DURATION),
            requester = message.author.tag;

        data.queue.push({
            title,
            duration,
            requester,
            url,
            announceChannel: message.channel.id,
            loop: false
        });

        !data.dispatcher
            ? this.play(client, data)
            : message.channel.send(client.lang.addedToQueue.format(title, requester));

        bot.active.set(message.guild.id, data);
    }

    async play(client, data) {
        let { announceChannel, title, requester, duration, url } = data.queue[0];

        client.channels.cache
            .get(announceChannel)
            .send(bot.lang.nowPlaying.format(title, requester, duration));

        data.dispatcher = await data.connection.play(ytdl(url, { filter: 'audioonly' }));
        data.dispatcher.guildID = data.guildID;

        data.dispatcher.on('finish', () => {
            this.finish(client, data);
        });
    }

    async finish(bot, data) {
        let fetched = client.active.get(data.guildID);

        if (!fetched.queue[0].loop) {
            fetched.queue.shift();
        }

        fetched.queue.length > 0 ? (
            client.active.set(data.guildID, fetched),
            this.play(client, fetched)
        ) : (
            client.active.delete(data.guildID)
        );
    }
}
