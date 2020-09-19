const discord = require("discord.js");

module.exports = {
	name: 'test1',
	category: 'misc',
	description: 'What do you prefer? Red pandas or Pandas.',
	aliases: ['test1'],
	usage: 'test1',
	guildOnly: true,
	run: async (client, message, args) => {

    const userDiscriminator = message.author.discriminator;
    const userName = message.author.username;

    let IntroEmbedDM = new discord.MessageEmbed();
    IntroEmbedDM.setAuthor(`Welcome to the Elite Wagers Bug Report System, ${userName}`, 'https://i.imgur.com/3Ju3SIs.png')
    IntroEmbedDM.setDescription("**Is the bug you want to report a bug on the Elite Wagers website or on the Elite Wagers discord server?**")
    IntroEmbedDM.setFooter("Question 1/4")
    IntroEmbedDM.setColor("388b33")

    message.author.send(IntroEmbedDM);

    const filter = m => m.author.id === message.author.id;

    await message.channel.awaitMessages(filter, {
	max: 1,
	time: 10000,
	errors: ['time']
}).then(async(collected) => {
	if (collected.first().content.toLowerCase() == 'cancel') {
		message.author.send("The command has been cancelled") 
	} 
	message.author.send(collected.first().content)
}).catch(() => {
	message.author.send("You took too long to answer!")
})


}
