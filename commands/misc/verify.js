/* eslint-disable no-unused-vars */
const prefix = process.env.prefix;

module.exports = {
	name: 'verify',
	category: 'misc',
	description: 'Give the user the Verified role.',
	aliases: [],
	usage: `${prefix}verify`,
	guildOnly: true,
	run: async (client, message, args) => {
		if(message.author.bot) return;
		if(message.channel.id === '722462922013409332') {await message.delete();}
		if(message.content.toLowerCase() === `${prefix}verify` && message.channel.id === '722462922013409332') {
			await message.delete().catch(err => console.log(err));
			const role = message.guild.roles.cache.get('722461320632467516');
			if(role) {
				try {
					await message.member.roles.add(role);
					console.log('Role added!');
				}
				catch(err) {
					console.log(err);
				}
			}
		}
	},
};
