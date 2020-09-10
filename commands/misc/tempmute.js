module.exports = {
    name: "tempmute",
    description: "Mutes a player for an amount of time.",
    usage: 'tempmute <user> <time>'
    execute(message, args){
 
        const ms = require('ms');
 
        let person = message.mentions.users.first() || message.guild.members.get(args[1])
        if(!person) return message.channel.send("I couldn't find a user by that name.");
 
        let mainrole = message.guild.roles.cache.find(role => role.name === botconfig.memberrole);
        let muterole = message.guild.roles.cache.find(role => role.name === botconfig.mutedrole);
 
        if(!muterole) return message.reply("Couldn't find the mute role.")
        if(!mainrole) return message.reply("Couldn't find the default / member role.")
 
        let time = args[2];
 
        if(!time) {
            return message.reply("You need to specify a time in the second argument!")
        }
 
        person.cache.removeRole(mainrole.id);
        person.cache.addRole(mutedrole.id);
 
        message.channel.send(`<@${person.user.tag}> has now been muted for ${ms(ms(time))}`);
 
        setTimeout(function() {
            person.addRole(mainrole.id);
            person.removeRole(muterole.id);
            message.channel.send(`<@${person.user.tag}> has been unmuted.`)
        }, ms(time));
 
    }
}
