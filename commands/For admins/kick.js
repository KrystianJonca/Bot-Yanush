const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let kickUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!kickUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (kickUser.id === message.author.id) return React.sendReact(false,message,"You cannot kick yourself!","reply");
    if (kickUser.id === bot.user.id) return React.sendReact(false,message,"I'm not a moron( ͡° ͜ʖ ͡°)","send");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");
    if (!message.member.has("KICK_MEMBERS")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (kickUser.has("KICK_MEMBERS")) return React.sendReact(false,message,"That person can't be kicked!","reply");

    
    let embed = new Discord.RichEmbed()
        .setAuthor("Kick")
        .setDescription("Kick a user")
        .setColor("#ff0000")
        .setThumbnail(kickUser.user.displayAvatarURL)

        .addField("Kicked User", `${kickUser} with ID ${kickUser.id}`)
        .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
        .addField("Reason", reason)        
        .addField("Kicked at", message.createdAt)
        .addField("Channel", message.channel);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    message.guild.member(kickUser).kick(reason);
    React.sendReact(true,message,"User kicked!","send");

    return;
}
module.exports.config = {
    name: ["kick"],
    args:"@user <reason>",
    description: "Kick a user(permission require)"   
}