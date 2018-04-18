const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args) => {
    let banUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!banUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (banUser.id === message.author.id) return React.sendReact(false,message,"You cannot ban yourself!","reply");
    if (banUser.id === bot.user.id) return React.sendReact(false,message,"I'm not a moron( ͡° ͜ʖ ͡°)","send");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");
    if (!message.member.hasPermission("BAN_MEMBERS")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (banUser.hasPermission("BAN_MEMBERS")) return React.sendReact(false,message,"That person can't be baned!","reply");

    let embed = new Discord.RichEmbed()
        .setAuthor("Ban")
        .setDescription("ban a user")
        .setColor("#ff0000")
        .setThumbnail(banUser.user.displayAvatarURL)

        .addField("Baned User", `${banUser} with ID ${banUser.id}`)
        .addField("Baned By", `${message.author} with ID ${message.author.id}`)
        .addField("Reason", reason)
        .addField("Time", message.createdAt)
        .addField("Channel", message.channel);

    bot.channels.get(otherSettings.incidents_channel_id).send(embed);
    message.guild.member(banUser).ban(reason);
    React.sendReact(true,message,"User banned!","send");
    
    return;
}
module.exports.config = {
    name: ["ban"],
    args:"@user (Reason)",
    group:"For Admins",
    description: "Ban a user(permission require)",
    enabled: true,
    avaiable_on_other_categories: true    
}