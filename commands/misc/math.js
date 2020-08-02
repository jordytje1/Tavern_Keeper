const math = require('mathjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'math',
	category: 'Misc',
	description: 'Helps you solve a math calculation.',
	aliases: ['calculate'],
	usage: 'math <value> <operator> <value>',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'Please input a calculation',
			);
		}
		let resp;
		try {
			resp = math.evaluate(args.join(' '));
		}
		catch (e) {
			return message.channel.send(
				'Please input a valid calculation',
			);
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Math Calculation')
			.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
			.addField('Output', `\`\`\`js\n${resp}\`\`\``);

		message.channel.send(embed);

	},

};

