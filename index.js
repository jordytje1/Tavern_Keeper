require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const prefix = "!";
const unverify_role = 'Your Unverified RoleID Here';
const verify_role = '752905551318351904';
const log = '753313405833576498';
const bannedWords = [`kut`, `vagina/`, `homo /`, `kanker/`, `kk/`, `kkr/`, `tyfus/`, `tering/`, `penis`, `.gg`, `discord.gg`, `discord gg`, `discordgg`, `discord gg /`];
const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Map();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


let memberlog = "752211513401671763";



client.on("guildMemberAdd", member => {
  if (member.guild.id !== "752211511996317827") return;
  
  client.channels.cache.get(memberlog).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
  member.roles.add("752585847534125096"); // Member role.
})


client.on("guildMemberAdd", member => {
  if (member.guild.id !== "653322621710106635") return;
  
  client.channels.cache.get(log).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
  member.roles.add("653329683085000744"); // Member role.
})

client.on('message', (message) => {

if(message.content == 'ping') {
     message.delete()
}
});


client.on("guildMemberRemove", member => {
  if (member.guild.id !== "752211511996317827") return;
  
  client.channels.cache.get(memberlog).send(`So long... **${member.user.tag}** ... :(`);
});


client.on("guildMemberRemove", member => {
  if (member.guild.id !== "653322621710106635") return;
  
  client.channels.cache.get(log).send(`**${member.user.tag}** has left the server 😭`);
});

client.on('message', (message) => {

    if (message.content == "!verify"){
        message.member.roles.add(verify_role)
	    message.delete()
    }

});



client.on(`message`, async message => {
    try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
            if (message.author.id === message.guild.ownerID) return;
            await message.delete();
            await message.channel.send(`**please shut up your mouth and watch your language`);
        }
    } catch (e) {
        console.log(e);
    }
});
















client.on("message", async msg => {
  if (msg.author.bot) return;
  if (botAdmins.indexOf(msg.author.id) > -1) {
    if (msg.content.toLowerCase() === "l!lift") {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Lifting Lockdown!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown lift started by ${msg.author.username}!`);
      msg.channel.send(embed);
      msg.channel
        .createInvite()
        .then(invite =>
          msg.channel.send(
            new Discord.RichEmbed()
              .setAuthor(client.user.username, client.user.avatarURL)
              .setDescription(`New Invite Created!`)
              .addField("Invite", `https://discord.gg/${invite.code}`, true)
              .setTimestamp()
              .setColor("#FF0000")
              .setFooter(`Lockdown lift started by ${msg.author.username}!`)
          )
        )
        .catch(console.error);
      msg.guild.members.forEach(member => {
        if (botAdmins.indexOf(member.id) > -1) return;
        member.roles.forEach(role => {
          member
            .removeRoles(member.roles)
            .then(() => {
              member
                .addRole("518697412295131136")
                .catch(err =>
                  console.log(`[ERROR]: ${err} : ${member.user.username}`)
                );
            })
            .catch(err =>
              console.log(`[ERROR]: ${err} : ${member.user.username}`)
            );
        });
      });
      let lockdownRoleRemovedEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Lockdown Role removed from all members!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown lift started by ${msg.author.username}!`);
      msg.channel.send(lockdownRoleRemovedEmbed);
      let lockdownLifted = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Lockdown Lifted!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown lift started by ${msg.author.username}!`);
      msg.channel.send(lockdownLifted);
      msg.guild.setIcon("./tcop.png");
      msg.guild.setName("The Church of Pyrocynical");
      msg.guild.setVerificationLevel(2, "Lockdown Mode Lifted");
      return msg.guild
        .setSplash("./tcop.png")
        .then(console.log("Splash changed"))
        .catch(console.error);
    } else if (msg.content.toLowerCase() === "l!start") {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Starting Lockdown!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown started by ${msg.author.username}!`);
      msg.channel.send(embed);
      msg.guild.setIcon("./lock.jpg");
      msg.guild.setName("Lockdown Mode");
      msg.guild.setVerificationLevel(4, "Lockdown Mode");
      msg.guild
        .setSplash("./lock.jpg")
        .then("Splash Changed")
        .catch(console.error);
      msg.guild.fetchInvites().then(invite => {
        invite.deleteAll();
        let deletedInvitesEmbed = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription(`Revoked all Invites!`)
          .setTimestamp()
          .setColor("#FF0000")
          .setFooter(`Lockdown started by ${msg.author.username}!`);
        msg.channel.send(deletedInvitesEmbed);
      });
      msg.guild.members.forEach(member => {
        if (botAdmins.indexOf(member.id) > -1) return;
        member.roles.forEach(role => {
          member
            .removeRoles(member.roles)
            .then(() => {
              member.addRole("518949928962359306").catch(err => {
                console.log("[ERROR]");
              });
            })
            .catch(err => {
              console.log(`[ERROR]: ${err} : ${member.user.username}`);
            });
        });
      });
      let lockdownRoleAddedEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(
          `All non-admin members have been given the Lockdown Role!`
        )
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown started by ${msg.author.username}!`);
      msg.channel.send(lockdownRoleAddedEmbed);
    }
  }
});


























keepAlive();
client.login(process.env.BOT_TOKEN);
