const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args) => {
    let reportUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!reportUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (reportUser.id === message.author.id) return React.sendReact(false,message,"You cannot report yourself!","reply");
    if (reportUser.id === bot.user.id) return React.sendReact(false,message,"I'm not a moron( ͡° ͜ʖ ͡°)","reply");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");

    let embed = new Discord.RichEmbed()
        .setAuthor("Report")
        .setDescription("Report a user")
        .setColor("#ff0000")
        .setThumbnail(reportUser.user.displayAvatarURL)

        .addField("Reported User", `${reportUser} with ID ${reportUser.id}`)
        .addField("Reported By", `${message.author} with ID ${message.author.id}`)
        .addField("Reason", reason)        
        .addField("Time", message.createdAt)
        .addField("Channel", message.channel);

    bot.channels.get(otherSettings.reports_channel_id).send(embed);
    React.sendReact(true,message,"Report sent successfully!","send");            

    return;
}
module.exports.config = {
    name: ["report"],
    args:"@user [Reason]",
    group:"Random",
    description: "Report a user(permission require)",
    enabled: true,
    avaiable_on_other_categories: true
}