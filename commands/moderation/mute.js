const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "mute",
    category: "Moderation",
    description: "Mute a specified user.",
    aliases: ['silent'],
    usage: '>mute <@user> <reason>',
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
            'Please specify a user to mute'
             );
            
        if(member.id === message.author.id )
        return message.reply(
            "You cannot mute yourself"
            );

        if(member.user.bot)
        return message.reply(
            "You are not allowed to mute bots"
            )

        if(member.id === message.guild.owner.id)
        return message.reply(
            "Are you trying to get yourself into trouble?"
            )

        let Reason =  args.slice(1).join(" ");
        if (!Reason) 
        return message.reply(
            'You are not allowed to mute someone without a reason.'
            );
        
   

        let mutedRole = message.guild.roles.cache.get('720997710911635531');
        let verifiedRole = message.guild.roles.cache.get('722461320632467516');
        if(mutedRole) {
            member.roles.add(mutedRole);
            member.roles.remove(verifiedRole);
            const channel = client.channels.cache.get('720997712602071098');
            const Embed = new MessageEmbed()
            .setAuthor(`Member Muted` , `${member.user.displayAvatarURL()}`)
            .setColor(`RED`)
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .addFields(
                {name: 'Muted User', value: `${member.user} ID: ${member.id}`},
                {name: 'Muted By', value: `${message.author} ID: ${message.author.id}`},
                {name: 'Muted In', value: message.channel},
                {name: 'Reason', value: Reason},)
            .setTimestamp()
            .setFooter(`Muted at`)
        channel.send(Embed);

        const mEmbed = new MessageEmbed()
            .setDescription(`**${member.user.tag} was muted. |** ${Reason}`)
            .setColor(`GREEN`)
        message.channel.send(mEmbed).then (message.delete())
        }
    },
  };



