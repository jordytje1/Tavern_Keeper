const { MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: "tempmute",
    category: "Moderation",
    description: "Temporarily mute a specific user.",
    aliases: ['tmute'],
    usage: '>tempmute <@user> <time> <reason>',
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
                )

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
 
            let verifiedRole = message.guild.roles.cache.get("722461320632467516");
            let mutedRole = message.guild.roles.cache.get("720997710911635531");
           
            if(!mutedRole) return message.reply("Mute role not found")
 
 
            let time = args[1];
            if(!time){
                return message.reply("Please specify a time!");
            }

            let Reason =  args.slice(2).join(" ");
            if (!Reason) 
            return message.reply(
                'You are not allowed to mute someone without a reason.'
                );
            if(mutedRole) {
                member.roles.remove(verifiedRole)
                member.roles.add(mutedRole);
                const channel = client.channels.cache.get('720997712602071098');
                const tEmbed = new MessageEmbed()
                .setAuthor(`Member Tempmuted` , `${member.user.displayAvatarURL()}`)
                .setColor(`RED`)
                .setThumbnail(`${member.user.displayAvatarURL()}`)
                .setDescription(`**${member.user.tag} was tempmuted by ${message.author.tag} for ${ms(ms(time))}.\nReason:** ${Reason}`)
                .setTimestamp()
                .setFooter(`User ID: ${member.user.id}`)
            channel.send(tEmbed);

                const Embed = new MessageEmbed()
                .setDescription(`**${member.user.tag} was muted for ${ms(ms(time))} |** ${Reason}`)
                .setColor('GREEN')
                message.channel.send(Embed).then (message.delete())
                
                const sEmbed = new MessageEmbed()
                .setDescription(`**You were tempmuted for ${ms(ms(time))} in ${message.guild.name}. |** ${Reason}`)
                .setColor(`RED`)
                member.send(sEmbed)
                }
 
            setTimeout(function(){
                member.roles.add(verifiedRole)
                member.roles.remove(mutedRole);
                const channel = client.channels.cache.get('720997712602071098');
                const tEmbed = new MessageEmbed()
                .setAuthor(`Member Unmuted` , `${member.user.displayAvatarURL()}`)
                .setColor(`GREEN`)
                .setThumbnail(`${member.user.displayAvatarURL()}`)
                .setDescription(`**${member.user.tag} was unmuted by ${message.author.tag}.\nReason:** Temporary mute completed`)
                .setTimestamp()
                .setFooter(`User ID: ${member.user.id}`)
            channel.send(tEmbed);

                const Embed = new MessageEmbed()
                .setDescription(`**${member.user.tag} was unmuted. |** Temporary mute completed`)
                .setColor('GREEN')
                message.channel.send(Embed);

                const sEmbed = new MessageEmbed()
                .setDescription(`**You were unmuted in ${message.guild.name}. |** Temporary mute completed`)
                .setColor(`GREEN`)
                member.send(sEmbed)
            }, ms(time));
    },
  };