const Discord = require('discord.js');
const fs = require("fs");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let aiSettings = JSON.parse(fs.readFileSync("./database/ai-settings.json","utf8"));

    let embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name)
        .setDescription("Info o serwerze")
        .setColor("#22A7F0")
        .setThumbnail(message.guild.iconURL)

        .addField("ID serwera", message.guild.id)
        .addField("Prefix serwera", prefix)
        .addField("Funkcje AI", !aiSettings[message.guild.id] ? "Wyłączone" : aiSettings[message.guild.id].ai ? "Włączone" : "Wyłączone")
        .addField("Stworzony o ", message.guild.createdAt)
        .addField("Dołączyłeś", message.member.joinedAt)
        .addField("Ilość urzytkowników", message.guild.memberCount);

    React.sendReact(true,message,embed,"send");
    return;
}
module.exports.config = {
    name: ["serverinfo"],
    args:"",
    description: "Informacje o serwerze",
}