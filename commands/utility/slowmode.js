const prefix = process.env.prefix;

module.exports = {
	name: 'slowmode',
	aliases: ['slow'],
	category: 'Utility',
	description: 'Set the slowmode for a specific channel.',
	usage: `${prefix}slowmode <seconds>`,
	run: async (bot, message, args) => {
		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if (!args[0]) {
			return message.channel.send(
				'Please specify the amount in second.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		if (isNaN(args[0])) return message.channel.send('That is not a number!').then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		message.channel.setRateLimitPerUser(args[0]);
		message.channel.send(
			`I have set the slowmode to **${args[0]}** secomds.`,
		);
	},
};