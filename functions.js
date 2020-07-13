/* eslint-disable prefer-const */
module.exports = {
  //love.js
	getMember: function(message, toFind = '') {
		toFind = toFind.toLowerCase();

		let target = message.guild.members.cache.get(toFind);

		if (!target && message.mentions.members) {target = message.mentions.members.first();}

		if (!target && toFind) {
			target = message.guild.members.find(member => {
				return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind);
			});
		}

		if (!target) {target = message.member;}

		return target;
	},

//rps.js
	promptMessage: async function(message, author, time, validReactions) {
		time *= 1000;

		for (const reaction of validReactions) await message.react(reaction);

		const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

		return message
			.awaitReactions(filter, { max: 1, time: time })
			.then(collected => collected.first() && collected.first().emoji.name);
	},

//botinfo.js
	formatBytes: function(a, b) {
		if (a == 0) return '0 Bytes';
		const c = 1024,
			d = b || 2,
			e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			f = Math.floor(Math.log(a) / Math.log(c));

		return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
	},
};