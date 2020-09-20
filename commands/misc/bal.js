module.exports = {
    name: "balance",
    aliases: ["bal", "bank", "money"],
    category: "economy",
    description: "Gets your current bot balance [Experimental]",
}

module.exports.run = async (client, msg) => {
    const { economy } = client;
    let { author } = msg;

    const otheruser = msg.mentions.users.first();
    if(otheruser){
        client.economySummon(otheruser);
        author = otheruser;
    }

    const embed = client.embed()
    .setTitle('Bank')
    .setAuthor(author.tag,author.avatarURL)
    .setThumbnail(author.avatarURL)
    .addField("Balance", economy[author.id].money + "₪", true)
    msg.channel.send(embed);
};
