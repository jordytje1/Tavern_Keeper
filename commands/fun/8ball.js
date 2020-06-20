module.exports = {
	name: '8ball',
	category: 'fun',
	description: 'There is a big chance I insult you!',
	aliases: ['ask'],
	usage: '>8ball <question>',
	guildOnly: true,
	run: async (client, message, args) => {
		const question = args.join(' ');
		if (!question) {return message.channel.send('You did not specify your question!');}
		else {
			const responses = [
				'Yes',
				'No',
				'Maybe',
				'Definetly',
				'Probably',
				'Oh Hell No!',
				'Not in a million years',
				'An error occured, Please try again',
			];
			const response =
        responses[Math.floor(Math.random() * responses.length - 1)];
			message.channel.send(`${message.author}, ${response}`);
		}
	},
};