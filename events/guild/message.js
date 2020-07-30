const prefix = process.env.BOT_PREFIX;
const { is_url, is_invite } = require('../../functions');

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return;

	if(message.content === `<@${client.user.id}>`) {
		return message.channel.send(`My current prefix for this guild is \`${prefix}\``);
	}

	if(message.content === `<@!${client.user.id}>`) {
		return message.channel.send(`My current prefix for this guild is \`${prefix}\``);
	}

	if(is_url(message.content) || is_invite(message.content) === true) {
		if(message.member.hasPermission('KICK_MEMBERS')) {
			return;
		}
		else {
			message.delete();
			message.channel.send(
				`${message.author}, you are not allowed to send links in this channel.`,
			);
		}
	}

	if (!message.content.startsWith(prefix)) return;

	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) {
		command.run(client, message, args);
	}
};