const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'belle',
	category: 'nsfw',
	description: 'What do you prefer? Red pandas or Pandas.',
	aliases: ['belle'],
	usage: 'belle',
	guildOnly: true,
	run: async (client, message, args) => {
		const subreddits = [
			'belle dephile',
			'belle dephile onlyfans',
		];

		const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

		const url = [
			`https://www.reddit.com/r/${sub}/hot.json`,
		];

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => Randomimage(post));

		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		function Randomimage(post) {
			const random = post[Math.floor(Math.random() * post.length) + 1];
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
				.setTitle(random.title)
				.setImage(random.url)
				.setFooter(`👍 ${random.ups} | 💬 ${random.num_comments}`);

			message.channel.send(embed);
		}
	},
};
