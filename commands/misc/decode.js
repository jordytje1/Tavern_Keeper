const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'decode',
	category: 'Misc',
	description: 'Converts encoded binary & base64 text back to normal.',
	aliases: [],
	usage: 'decode <text>',
	run: async (client, message, args) => {
		const embed = new MessageEmbed();
		const text = args.slice().join(' ');
		let url;
		if (!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			);

		}

		let response, data;
		try {
			response = await fetch(url).then(res => res.json());
			data = response.text;
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}


		embed.setColor('BLUE');
		embed.addField('Input', `\`\`\`\n${text}\`\`\``);

		message.channel.send(embed);
	},
};
