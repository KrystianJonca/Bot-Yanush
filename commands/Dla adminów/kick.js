const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");    
    let kickUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!kickUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (kickUser.id === message.author.id) return React.sendReact(false,message,"Nie możesz wyrzucić samego siebie!","reply");
    if (kickUser.id === bot.user.id) return React.sendReact(false,message,"Nie możesz wykonywać tej operacji na mnie","send");
    if (!reason) return React.sendReact(false,message,"Musisz podać powód!","reply");
    if (kickUser.hasPermission("ADMINISTRATOR")) return React.sendReact(false,message,"Ta osona nie może zostać wyrzucona!","reply");

    
    let embed = new Discord.RichEmbed()
        .setAuthor("Wyrzucenie")
        .setDescription("Wyrzucenie urzytkownika")
        .setColor("#ff0000")
        .setThumbnail(kickUser.user.displayAvatarURL)

        .addField("Wyrzucono", `${kickUser} with ID ${kickUser.id}`)
        .addField("Wyrzucono przez", `${message.author} with ID ${message.author.id}`)
        .addField("Powód", reason)        
        .addField("Wyrzucono o", message.createdAt)
        .addField("Kanał", message.channel);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    message.guild.member(kickUser).kick(reason);
    React.sendReact(true,message,"Wyrzucono urzytkownika!","send");

    return;
}
module.exports.config = {
    name: ["kick"],
    args:"@oznaczenie <powód>",
    description: "Wyrzuć urzytkownika(wymagane pozwolenie)"   
}