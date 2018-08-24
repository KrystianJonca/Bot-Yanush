const Discord = require('discord.js');
const fs = require("fs");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix,con) => {
    let aiSettings = JSON.parse(fs.readFileSync("./database/ai-settings.json","utf8"));

    let embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name)
        .setDescription("Server info")
        .setColor("#22A7F0")
        .setThumbnail(message.guild.iconURL)

        .addField("Server ID", message.guild.id)
        .addField("Server prefix", prefix)
        .addField("AI functions", !aiSettings[message.guild.id] ? "Turn off" : aiSettings[message.guild.id].ai ? "Turn on" : "Turn off")
        .addField("Created at", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total members", message.guild.memberCount);

    React.sendReact(true,message,embed,"send");
    return;
}
module.exports.config = {
    name: ["serverinfo"],
    args:"",
    description: "A few facts about our server",
}