module.exports = {
    name: "unlock",
    category: 'moderation',
    description: "unlock channel.",
    usage: "unlock ",
    run: (client, message, args, level) => {
  try {
    message.channel.send('Unlocking Channel...')
   .then((msg)=> {
  setTimeout(function(){
    msg.edit('Unlocking Channel..');
    .then((msg)=> {
  setTimeout(function(){
    msg.edit('Unlocking Channel.');
    
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  };
    }
}
