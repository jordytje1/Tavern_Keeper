const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unmute",
    category: "Moderation",
    description: "Unmute a specified user.",
    aliases: ['unsilent'],
    usage: '>unmute <@user> <reason>',
    guildOnly: true,
    run: async (client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) 
        return message.reply(
            'You do not have the permission to use this commnad.'
            );

        if(!message.guild.me.hasPermission('KICK_MEMBERS')) 
        return message.reply(
            'I do not have the permission to use this commnad.'
            )

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
        if(!member) 
        return message.reply(
            'Please specify a user to unmute.'
             );

        if(member.id === message.author.id )
        return message.reply(
            "You are not allowed to unmute yourself"
            );

        let Reason =  args.slice(1).join(" ");
        if (!Reason) 
        return message.reply(
            'You are not allowed to unmute someone without a reason.'
            );
        
        
        let mutedRole = message.guild.roles.cache.get('720997710911635531');
        let verifiedRole = message.guild.roles.cache.get('722461320632467516');
        if(mutedRole) {
            member.roles.remove(mutedRole);
            member.roles.add(verifiedRole);
            const channel = client.channels.cache.get('720997712602071098');
            const tEmbed = new MessageEmbed()
            .setAuthor(`Member Unmuted` , `${member.user.displayAvatarURL()}`)
            .setColor(`GREEN`)
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setDescription(`**${member.user.tag} was unmuted by ${message.author.tag}.\nReason:** ${Reason}`)
            .setTimestamp()
            .setFooter(`User ID: ${member.user.id}`)
        channel.send(tEmbed);

            const Embed = new MessageEmbed()
            .setDescription(`**${member.user.tag} was unmuted. |** ${Reason}`)
            .setColor('GREEN')
        message.channel.send(Embed).then (message.delete());

        const sEmbed = new MessageEmbed()
            .setDescription(`**You were unmuted in ${message.guild.name}. |** ${Reason}`)
            .setColor(`GREEN`)
        member.send(sEmbed)
        }
    },
  };