
module.exports = {
	name: 'lock',
	category: 'moderation',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'lock',
	run: async (client, message, args) => { 

    message.delete().catch(O_o=>{}); 
    if(!message.member.roles.some(r=>["Management", "Admin", "Helper"].includes(r.name))) return message.channel.send(`Invalid Permission!`)

    function closeDownChannel(message) {
        let channel = message.channel;
        let roles = message.guild.roles; 

        let testRole = roles.find('Customs Host');

        channel.overwritePermissions(
            testRole,
            { 'SEND_MESSAGES': false },
            'Competitive has Ended'
        )
        .then(console.log)
        .catch(console.log);
    }
}
