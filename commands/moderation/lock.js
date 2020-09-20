const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

const cooldown = new Map()

module.exports = {
    name: "lockdown",
    description: "lockdown a channel (will only work if permissions are setup correctly)",
    category: "moderation",
    aliases: ["lock"],
    permissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
    run: async (message, args) => {
    
        if(message.member && message.member.hasPermission("KICK_MEMBERS")) {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                const embed = new MessageEmbed()
                    .setTitle("lockdown")
                    .setDescription("❌ requires permission: *MANAGE_CHANNELS* and *MANAGE_MESSAGES*")
                    .setFooter("bot.tekoh.wtf")
                    .setColor('#15E3F0')
                return message.channel.send(embed)
            }
            return 
        }

        if(message.member && message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("❌ i am lacking permission: 'MANAGE_CHANNELS' or 'MANAGE_ROLES'")
        }

        if (cooldown.has(message.members.id)) {
            const init = cooldown.get(message.member.id)
            const curr = new Date()
            const diff = Math.round((curr - init) / 1000)
            const time = 2 - diff

            const minutes = Math.floor(time / 60)
            const seconds = time - minutes * 60

            let remaining

            if (minutes != 0) {
                remaining = `${minutes}m${seconds}s`
            } else {
                remaining = `${seconds}s`
            }
            return message.channel.send(new MessageEmbed().setDescription("❌ still on cooldown for " + remaining).setColor(color));
        }

        let channel = message.channel

        if (message.mentions.channels.first()) {
            channel = message.mentions.channels.first()
        }

        cooldown.set(message.members.id, new Date());
        setTimeout(() => {
            cooldown.delete(message.members.id);
        }, 1500);

        let locked = false

        const role = message.guild.roles.cache.find(role => role.name == "@everyone")

        const a = channel.permissionOverwrites.get(role.id)

        if (!a) {
            locked = false
        } else if (!a.deny) {
            locked = false
        } else if (!a.deny.bitfield) {
            locked = false
        } else {
            const b = new Discord.Permissions(a.deny.bitfield).toArray()
            if (b.includes("SEND_MESSAGES")) {
                locked = true
            }
        }
        
        if (!locked) {
            await channel.updateOverwrite(role, {
                SEND_MESSAGES: false
            })

            const embed = new MessageEmbed()
                .setTitle("lockdown | " + message.member.user.username)
                .setColor('#15E3F0')
                .setDescription("✅ " + channel.toString() + " has been locked")
                .setFooter("bot.tekoh.wtf")

            return message.channel.send(embed).catch(() => {
                return message.member.send(embed).catch()
            })
        } else {
            await channel.updateOverwrite(role, {
                SEND_MESSAGES: null
            })
            const embed = new MessageEmbed()
                .setTitle("lockdown | " + message.member.user.username)
                .setColor('#15E3F0')
                .setDescription("✅ " + channel.toString() + " has been unlocked")
                .setFooter("bot.tekoh.wtf")

            return message.channel.send(embed).catch(() => {
                return message.member.send(embed).catch()
            })
        }

    }
}
