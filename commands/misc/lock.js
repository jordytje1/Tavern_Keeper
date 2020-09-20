module.exports = {
    name: "lock",
    category: 'moderation',
    description: "lock channel.",
    usage: "lock ",
    run: (client, message, args, level) => {
  try {
    await message.channel.send('Unmuting Channel...');
    
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};
