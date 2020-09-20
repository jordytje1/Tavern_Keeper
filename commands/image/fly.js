/* eslint-disable no-unused-vars */
const cooldowns = new Discord.Collection();
module.exports = {
	name: 'fly',
	category: 'Image',
	description: 'Sends a fake image of a fly that looks suspiciously real.',
	aliases: [],
	cooldown: 5,
	usage: 'fly',
	run: (client, message, args) => {
		if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
	// ...
}

		message.channel.send({ files: ['./assets/image/fly.png'] }).then(message.delete());
	},
};
