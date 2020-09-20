module.exports = {
    name: "lock",
    category: 'moderation',
    description: "lock channel.",
    usage: "lock ",
    run: (client, message, args, level) => {
  try {
    message.channel.send('locking Channel...');
    
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
};
}
}
