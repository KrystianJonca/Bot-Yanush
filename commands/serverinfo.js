const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json","utf8"));

    let embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name)
        .setDescription("Server info")
        .setColor("#22A7F0")
        .setThumbnail(message.guild.iconURL)

        .addField("Server ID", message.guild.id)
        .addField("Server prefix", prefixes[message.guild.id])
        .addField("Created at", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total members", message.guild.memberCount);

    message.channel.send(embed);
    return;
}
module.exports.config = {
    name: ["serverinfo"],
    args:"",
    group:"Info",
    description: "A few facts about our server",
    enabled: true,
    avaiable_on_other_categories: false    

}