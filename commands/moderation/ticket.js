const Discord = require("discord.js");

module.exports = {
    name: "ticket",
    description: "Creates a temporary role and text channel and adds message author and user to the role",
    usage: "ticket <user>",
    roles: "TECH",
    example: "ticket Gameproguy",
    execute(client, message, config, command){

        //TODO
        /*
            Make temp role stay on user, then that allows them to search for their own solutions
            Modify deleteroom to NOT delete user role
        */

        //Name and ID of the mentioned user

        let user = message.mentions.users.first();
        let guildUser = message.guild.members.find();
        console.log(user + "\n\n\n" + guildUser);
        console.log("*************" + user.username+"**************");

            //Creates role with name of user, pink color, then adds user to role
            message.guild.createRole({
                name: user.username,
                color: 'LUMINOUS_VIVID_PINK'
            }).then(() =>{
                console.log("Created Role")
                let role = message.guild.roles.find(r => r.name === user.username)
                console.log(role);
                console.log("Role Created")
                console.log(role.id);
                user.addRole(role.id);
            }).catch(console.error);



            

        //console.log(message);

        message.channel.send("Create Room!");
        message.guild.createChannel(user.username,{
            type: "text",
            parent: "641755544549326848",
            permissionOverwrites: [
                {
                    //Users
                    id: "641330577517314048",
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    //Staff
                    id: "641330637000933397",
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        }).then(()=>{
            //console.log;
        })
        .catch(console.error);
    }
}
