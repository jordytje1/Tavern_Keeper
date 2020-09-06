require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


client.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'channel.name');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField('Welcome', `${member}`)
      .addField(':family_mwgb: | Actually there is ', `${member.guild.memberCount} people`)
      .addField("Name", `<@` + `${member.id}` + `>`, true)
      .addField('Server', `${member.guild.name}`, true )
      .setFooter(`**${member.guild.name}**`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

client.on('guildMemberAdd', member => {

  console.log(`${member}`, "has arrived" + `${member.guild.name}`)

});

keepAlive();
client.login(process.env.BOT_TOKEN);
