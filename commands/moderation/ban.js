const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    category: "Moderation",
    description: "Ban a specified user from the server.",
    aliases: [],
    usage: '>ban <@user> <reason>',
    guildOnly: true,
    run: async (client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) 
        return message.reply(
            'You do not have the permission to use this commnad.'
            );

        if(!message.guild.me.hasPermission('BAN_MEMBERS')) 
        return message.reply(
            'I do not have the permission to use this commnad.'
            )

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
        if (!member) 
        return message.reply(
            `Please specify a user to ban!`
            );

        if(member.id === message.author.id )
        return message.reply(
            "You cannot ban yourself"
            );

        if(member.id === message.guild.owner.id)
        return message.reply(
            "Are you trying to get yourself into trouble?"
            )

        let Reason =  message.content.split(" ").slice(2).join(" ");
        if (!Reason) 
        return message.reply(
            'You are not allowed to ban someone without a reason.'
            );
 
        if (!member.bannable) 
        return message.reply(
            `You cannot ban this user, they may have a role higher then me or the same role as me.`
            );
 
        member.ban();
            const channel = client.channels.cache.get('720997712602071098');
            const Embed = new MessageEmbed()
            .setAuthor(`Member Banned` , `${member.user.displayAvatarURL()}`)
            .setColor(`RED`)
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setDescription(`**${member.user.tag} was banned by ${message.author.tag}.\nReason:** ${Reason}`)
            .setTimestamp()
            .setFooter(`User ID: ${member.user.id}`)
        channel.send(Embed);
        
        const bEmbed = new MessageEmbed()
            .setDescription(`**${member.user.tag} was banned. |** ${Reason}`)
            .setColor(`GREEN`)
        message.channel.send(bEmbed).then (message.delete())
        
        const sEmbed = new MessageEmbed()
            .setDescription(`**You were banned from ${message.guild.name}. |** ${Reason}`)
            .setColor(`RED`)
        member.send(sEmbed)
    }
}