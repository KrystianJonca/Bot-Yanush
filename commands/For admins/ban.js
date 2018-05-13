const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return React.sendReact(false,message,"You don't have require permission!","reply");    
    let banUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!banUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (banUser.id === message.author.id) return React.sendReact(false,message,"You cannot ban yourself!","reply");
    if (banUser.id === bot.user.id) return React.sendReact(false,message,"I'm not a moron( ͡° ͜ʖ ͡°)","send");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");
    if (banUser.hasPermission("ADMINISTRATOR")) return React.sendReact(false,message,"That person can't be baned!","reply");

    let embed = new Discord.RichEmbed()
        .setAuthor("Ban")
        .setDescription("Ban a user")
        .setColor("#ff0000")
        .setThumbnail(banUser.user.displayAvatarURL)

        .addField("Banned User", `${banUser} with ID ${banUser.id}`)
        .addField("Banned By", `${message.author} with ID ${message.author.id}`)
        .addField("Reason", reason)
        .addField("Banned at", message.createdAt)
        .addField("Channel", message.channel);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    message.guild.member(banUser).ban(reason);
    React.sendReact(true,message,"User banned!","send");
    
    return;
}
module.exports.config = {
    name: ["ban"],
    args:"@user <reason>",
    description: "Ban a user(permission require)"

}