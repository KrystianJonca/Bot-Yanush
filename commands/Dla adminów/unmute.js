const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");
const fs = require('fs');

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");    
    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let reason = args.join(" ").slice(22);

    if (!muteUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (muteUser.id === message.author.id) return React.sendReact(false,message,"Nie możesz odciszyć  samego siebie!","reply");
    if (muteUser.id === bot.user.id) return React.sendReact(false,message,"Ja nie moge być wyciszony","reply");
    if (!reason) return React.sendReact(false,message,"Musisz podać powód!","reply");
    if (muteUser.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"Ta osoba nie może zostać odciszona!","reply");
    
    let embed = new Discord.RichEmbed()
        .setAuthor("Odciszenie")
        .setDescription("Odciszenie urzytkownika")
        .setColor("#4CAF50")
        .setThumbnail(muteUser.user.displayAvatarURL)

        .addField("Odciszono", `${muteUser} z ID ${muteUser.id}`)
        .addField("Odciszono przez", `${message.author} z ID ${message.author.id}`)
        .addField("Powód", reason)        
        .addField("Odciszono o", message.createdAt)
        .addField("Kanał", message.channel);

    if (!role || !muteUser.roles.has(role.id)) return message.channel.send("Ta osoba nie jest wyciszona!!")

    muteUser.removeRole(role);

    delete bot.mutes[muteUser.id];

    let incidentsChannel = message.guild.channels.find('name',"incidents")

    fs.writeFile("./database/mutes.json",JSON.stringify(bot.mutes),err => {
        if(err) console.error(err);
        incidentsChannel.send(embed); 
    });
    
    React.sendReact(true,message,"Odciszono urzytkownika!","send");

    return;
}
module.exports.config = {
    name: ["unmute"],
    args:"@oznaczenie <powód>",
    description: "Odcisz urzytkownika(wymagane pozwolenie)"
}