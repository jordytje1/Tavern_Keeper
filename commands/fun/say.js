const prefix = process.env.prefix;

module.exports = {
	name: 'say',
	category: 'fun',
	description: 'Get the bot to say what ever you want.',
	aliases: [],
	usage: `${prefix}say <message>`,
	guildOnly: true,
	run: async (client, message, args) => {
		const text = args.join(' ');
		if (!text)return message.channel.send('You did not specify a message to say!').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete();});
		message.delete();
		message.channel.send(text);
	},
};