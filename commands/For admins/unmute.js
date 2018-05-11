const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let reason = args.join(" ").slice(22);

    if (!muteUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (muteUser.id === message.author.id) return React.sendReact(false,message,"You cannot unmute yourself!","reply");
    if (muteUser.id === bot.user.id) return React.sendReact(false,message,"I never been and I will never be muted!","reply");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (muteUser.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"That person can't be Unmuted!","reply");
    
    let embed = new Discord.RichEmbed()
        .setAuthor("Unmute")
        .setDescription("Unmute a user")
        .setColor("#4CAF50")
        .setThumbnail(muteUser.user.displayAvatarURL)

        .addField("Unmuted User", `${muteUser} with ID ${muteUser.id}`)
        .addField("Unmuted By", `${message.author} with ID ${message.author.id}`)
        .addField("Reason", reason)        
        .addField("Time", message.createdAt)
        .addField("Channel", message.channel);

    if (!role || !muteUser.roles.has(role.id)) return message.channel.send("This user is not muted!")

    await muteUser.removeRole(role);

    let incidentsChannel = message.guild.channels.find('name',"incidents")
    incidentsChannel.send(embed);
    
    React.sendReact(true,message,"User Unmuted!","send");

    return;
}
module.exports.config = {
    name: ["unmute"],
    args:"@user <reason>",
    description: "Mute a user(permission require)"
}