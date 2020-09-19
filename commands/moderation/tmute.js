var Discord = require('discord.js');
var ms = require('ms');

module.exports = {
	name: 'tmute',
	category: 'moderation',
	description: 'What do you prefer? Red pandas or Pandas.',
	aliases: ['tmute'],
	usage: 'tmute',
	guildOnly: true,
	run: async (client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('Você não pode usar esse comando, você não tem permição\n HUMF ');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('você tem que dizer quem eu devo usar meu silenciamento');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('ele não esta no servidor');
    if(member.hasPermission('ADMINISTRATOR')) return msg.reply('You cannot mute that person!');

    var rawTime = args[1];
    var time = ms(rawTime);
    if(!time) return msg.reply('por quanto tempo ele/ela deve ficar mutado');

    var reason = args.splice(2).join(' ');
    if(!reason) return msg.reply('precisa de uma razão, sem  razão, sem meus poderes de silenciamento');

    var channel = msg.guild.channels.cache.find(c => c.name === '📝puniçoes📝');

    var log = new Discord.MessageEmbed()
    .setTitle('Usuario silenciado')
    .addField('usuario:', user, true)
    .addField('por:', msg.author, true)
    .addField('Tempo:', rawTime)
    .addField('Razão:', reason)
     message.channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('Você foi mutado!')
    .addField('Tempo:', rawTime, true)
    .addField('Motivo:', reason, true);

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    var role = msg.guild.roles.cache.find(r => r.name === 'Silenciamento divino');

    member.roles.add(role);

    setTimeout(async() => {
        member.roles.remove(role);
    }, time);

    msg.channel.send(`**${user}** Foi mutado por **${msg.author}** por **${rawTime}** !`);
	}
}
