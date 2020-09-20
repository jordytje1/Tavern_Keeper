module.exports = {
    name: "unlock",
    category: 'moderation',
    description: "unlock channel.",
    usage: "unlock ",
    run: (client, message, args, level) => {
  try {
    message.channel.send('Unlocking Channel...')
   setTimeout(() => {
    // Edit msg 20 seconds later
    message.edit('Unlocking Channel..');
  }, 2000);
         setTimeout(() => {
    // Edit msg 20 seconds later
    message.edit('Unlocking Channel.');
  }, 2000);
    
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  };
    }
}
