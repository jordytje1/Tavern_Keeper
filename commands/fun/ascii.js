/* eslint-disable max-statements-per-line */
const figlet = require('figlet');
const prefix = process.env.prefix;

module.exports = {
	name: 'ascii',
	category: 'Fun',
	description: 'Get a nice ascii art.',
	aliases: ['art'],
	usage: `${prefix}rascii <message>`,
	run: async (client, message, args) => {
		if(!args[0]) {return message.channel.send('Please provide text to draw').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});}
		figlet(args.join(' '), function(err, data) {
			if(err) return message.channel.send('Something went wrong!');
			return message.channel.send(`\`\`\`${data}\`\`\``);
		});
	},
};