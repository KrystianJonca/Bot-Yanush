const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const fs = require('fs');

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");    
    let warns = JSON.parse(fs.readFileSync("./database/warnings.json", "utf8"));
    let cleanUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);
    
    if (!cleanUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (cleanUser.id === message.author.id) return React.sendReact(false,message,"Nie możesz wyczyścić ostrzeżeń samemu sobie!","reply");
    if (cleanUser.id === bot.user.id) return React.sendReact(false,message,"Ja nie mam żadnych ostrzeżeń","send");
    if (!reason) return React.sendReact(false,message,"Musisz podać powód!","reply");
    if (cleanUser.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"Tej osoby nie możena wyczyścić ostrzeżeń!","reply");
    if (!warns[cleanUser.id]) return React.sendReact(false,message,"Ten urzytkownik nie ma ostrzeżeń!","reply")

    warns[cleanUser.id].warnings = 0;

    fs.writeFile("./database/warnings.json",JSON.stringify(warns), (err) => {if(err) console.error(err);});

    let embed = new Discord.RichEmbed()
        .setAuthor("Czyszczenie ostrzeżeń")
        .setDescription("Czyszczenie ostrzeżeń urzytkownikowi")
        .setColor("#4CAF50")
        .setThumbnail(cleanUser.user.displayAvatarURL)

        .addField("Ostrzeżenia wyczyszczono", `${cleanUser} z ID ${cleanUser.id}`)
        .addField("Wyczyszczono przez", `${message.author} z ID ${message.author.id}`)                                 
        .addField("Powód", reason)        
        .addField("Wyczyszczono o", message.createdAt)
        .addField("Kanał", message.channel);

    let incidentsChannel = message.guild.channels.find('name','incidents');
    incidentsChannel.send(embed);

    React.sendReact(true,message,`Wyczyszczono ostrzeżenia ${cleanUser}`,"send");

    
    return;
}
module.exports.config = {
    name: ["cleanwarns"],
    args:"@oznaczenie <powód>",
    description: "Czyszczenie ostrzeżeń urzytkownikowi"
}