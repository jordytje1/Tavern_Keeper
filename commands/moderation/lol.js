        const { MessageEmbed, User } = require('discord.js')
        const DESTINATION = `752211513401671763`;
        const openedTickets = new Map();
        const ACCEPT = '✅';
        const REJECT = '❎';
         
module.exports = {
	name: 'lol',
	category: 'moderation',
	description: 'What do you prefer? Red pandas or Pandas.',
	aliases: ['lol'],
	usage: 'lol',
	guildOnly: true,
	run: async (client, message, args) => {
            console.log('Inside DM event');
            if (!openedTickets.has(message.author.id)) {
                message.channel.send('Hello! Thank you are using Moditor. Please Write your Reoprt and our staff will get back yo you.');
                openedTickets.set(message.author.id,  message.guild);
                const channel = client.channels.cache.get(DESTINATION);
                if (channel) {
                    const embed = new MessageEmbed()
                    .setColor(0xff000d)
                    .setTitle("New Mod Mail.")
                    .setAuthor(message.author.tag)
                    .setDescription(message.content);
                    const msg = await channel.send(embed);
                    await msg.react(ACCEPT);
                    await msg.react(REJECT);
         
                    try {
                      const reactionFilter = (reaction, User) => [ACCEPT, REJECT].includes(reaction.emoji.id) && !User.bot;
                      const reactions = await msg.awaitReactions(reactionFilter, { max: 1, time: 10000}
                      );
                      const choise = reactions.get(ACCEPT) || reactions.get(REJECT);
                      if (choise.emoji.id === ACCEPT) {
         
                      } else if (choise.emoji.id == REJECT) {
                        message.author.send('Your Message was rejected, because of some reason by our staff. Please try again later.');
                        setTimeout(() => {
                          openedTickets.delete(message.author.id);
                        }, 10000);
                      }
                    } catch (err) {
                      console.log(err);
                      message.author.send('Sorry. Our Staff is not available. Please Try again later.');
                      openedTickets.delete(message.author.id);
                    }
                }else {
                    message.channel.send('Something Went Wrong. Please contact a Developer directly.');
                    openedTickets.delete(message.author.id);
                }
            }
          }
        }

