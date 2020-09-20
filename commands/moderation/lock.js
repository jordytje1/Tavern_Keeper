module.exports = {
    name: "lock",
    category: 'moderation',
    description: "lock channel.",
    usage: "lock ",
    run: (client, message, args, level) => {
      let user = message.guild.id
  try {
    message.channel.send('locking Channel...');
    
    message.channel.overwritePermissions([
        {
      id: user,
      deny: ['SEND_MESSAGES'],
    },
        ]);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
};
}
}
