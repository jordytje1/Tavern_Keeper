const prefix = process.env.prefix;

module.exports = {
	name: 'dm',
	category: 'Utility',
	description: 'Send a DM to a specified user',
	aliases: ['message'],
	usage: `${prefix}dm < @user | userid > <message>`,
	run: async (bot, message, args) => {
		if (!message.member.permissions.has('BAN_MEMBERS')) {
			return message.channel.send(
				'You do not have permision to use this command.',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
		if (!user) {
			return message.channel.send(
				'Please specify a user.',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}
		if (!args.slice(1).join(' ')) {
			return message.channel.send(
				'You did not specify your message',
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete();});
		}

		user.user
			.send(args.slice(1).join(' '))
			.catch(() => message.channel.send('That user could not be DMed!'))
			.then(() => message.channel.send(`Message sent to ${user.user.tag}`));
	},
};