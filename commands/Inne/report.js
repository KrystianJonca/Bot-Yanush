const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let reportUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!reportUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (reportUser.id === message.author.id) return React.sendReact(false,message,"Nie możesz zreportować samego siebie!","reply");
    if (reportUser.id === bot.user.id) return React.sendReact(false,message,"Nie możesz wykonywać tej operacji na mnie","reply");
    if (!reason) return React.sendReact(false,message,"Musisz podać powód!","reply");

    let embed = new Discord.RichEmbed()
        .setAuthor("Report")
        .setDescription("Zreportowano urzytkownika")
        .setColor("#ff0000")
        .setThumbnail(reportUser.user.displayAvatarURL)

        .addField("Zreportowano", `${reportUser} z ID ${reportUser.id}`)
        .addField("Zreportowano przez", `${message.author} z ID ${message.author.id}`)
        .addField("Powód", reason)        
        .addField("Zreportowano o", message.createdAt)
        .addField("Kanał", message.channel);

    let reportsChannel = message.guild.channels.find('name',"reports");
    reportsChannel.send(embed);

    React.sendReact(true,message,"Report wysłany!","send");            

    return;
}
module.exports.config = {
    name: ["report"],
    args:"@oznaczenie <powód>",
    description: "Zreportuj urzytkownika"
}