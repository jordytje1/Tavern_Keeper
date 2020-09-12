module.exports = {
	name: 'lock',
	category: 'Fun',
	description: 'Generate clapified 👏 text 👏',
	aliases: [],
	usage: 'lock',
	run: async (client, message, args) => {
		if (args[0] === 'off') {
            message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true,
            
          if (arg[0] === 'on'){
            message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
            
			);
	},
};
