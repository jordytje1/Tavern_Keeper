const prefix = process.env.prefix;

module.exports = {
	name: 'dm',
	category: 'utility',
	description: 'Send a DM to a specified user',
	aliases: ['message'],
	usage: `${prefix}dm < @user | userid > <message>`,
	run: async (bot, message, args) => {
		if (!message.member.permissions.has('BAN_MEMBERS')) {return message.channel.send('You do not have enough permissions!');}
		const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
		if (!user) {
			return message.channel.send(
				'Please specify a user, or you gave an invalid id',
			);
		}
		if (!args.slice(1).join(' ')) {return message.channel.send('You did not specify your message');}
		user.user
			.send(args.slice(1).join(' '))
			.catch(() => message.channel.send('That user could not be DMed!'))
			.then(() => message.channel.send(`Message sent to ${user.user.tag}`));
	},
};