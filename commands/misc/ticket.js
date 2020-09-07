const { MessageEmbed } = require("discord.js");
const discord = require('discord.js');



module.exports = {
	name: "ticket",
	category: "info",
	description: "Returns latency and API ping",
  aliases: [],
  usage: 'ticket',
	run: async (client, message, args) => {
		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
			return message.channel.send("I dont have perms to create channels give me!");
		}
		if (!args[0]) { return message.channel.send("You need to type a reason to open the ticket \n``t.ticket reason``").then(m => m.delete({ timeout: 15000 }));}
		const everyone = message.guild.roles.cache.find(r => r.name == "@everyone");
		const ticketstaff = message.guild.roles.cache.find(r => r.name == "Support");
		if(!ticketstaff) {
			message.guild.roles.create ({
				data:{
					name: "TicketSup",
					color: "GRAY",

				},
			});
			message.channel.send("A role named ``TicketSup`` has been crated, add it to your moderators/staff");
		}
		const memberid = message.author.tag.replace(/[^a-zA-z0-9]/g, "").trim().toLowerCase();

		if(message.guild.channels.cache.find(c => c.name.replace(/-/g, " ") == memberid)) {
			return message.channel.send("You already have a ticket");
		}
		const tch = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
		if(!tch) {
			return await message.guild.channels.create("tickets", {
				type: "category",
			});
		}
		return message.guild.channels.create(memberid, {
			type: "text",
			permissionOverwrites: [
				{
					id: everyone.id,
					deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
				},
				{
					id: ticketstaff.id,
					allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
				},
				{
					id: message.author.id,
					allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
				},
				{
					id: message.me.id,
					allow: ["ADMINISTRATOR"],
				},
			],
			parent: tch.id,
		}).then(c => {message.channel.send("Ticket created!"),
		message.guild.channels.cache.find(m => m.name.replace(/-/g, " ") == memberid).send(
			new MessageEmbed()
				.setTitle("¡TICKET!")
				.setDescription("Wait until a staff member helps you")
				.setAuthor(message.member.displayName, message.author.displayAvatarURL)
				.setTimestamp(new Date())
				.setFooter("Tickets"),
		);
		});
	},
};
