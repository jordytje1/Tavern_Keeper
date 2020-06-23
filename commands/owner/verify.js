/* eslint-disable no-unused-vars */
const prefix = process.env.prefix;

module.exports = {
	name: 'verify',
	category: 'Owner',
	description: 'Give the user the Verified role.',
	aliases: [],
	usage: `${prefix}verify`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(message.author.bot) return;
		if(message.channel.id !== '722462922013409332') {
			return;
		}

		await message.delete();
		await message.member.roles.add('722461320632467516');
		return;
	},
};
