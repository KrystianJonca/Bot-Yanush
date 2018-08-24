const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");
const fs = require('fs');

module.exports.run = async (bot,message,args,prefix,con,logChannel) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return React.sendReact(false,message,"You don't have require permission!","reply");    
    
    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let reason = args.join(" ").slice(22);

    if (!muteUser) 
        return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (!muteUser.kickable) 
        return React.sendReact(false,message,"That person can't be unmuted! (Do they have a higher role? Do I have require permissions?)","reply");
    if (!reason) 
        return React.sendReact(false,message,"You must give a reason!","reply");


    if (!role || !muteUser.roles.has(role.id)) 
        return message.channel.send("This user is not muted!")

    muteUser.removeRole(role).catch(error => {
        return message.reply(`Couldn't unmute user because of: ${error}`)
    });

    delete bot.mutes[muteUser.id];


    fs.writeFile("./database/mutes.json",JSON.stringify(bot.mutes),err => {
        if(err) console.error(err);
    });
    if(logChannel){
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

        let logChannel = bot.channels.get(logChannel)
        logChannel.send(embed); 
    }
    
    React.sendReact(true,message,`${muteUser.user.username} has been banned unmuted *${reason}*`,"send");
}
module.exports.config = {
    name: ["unmute"],
    args:"@user <reason>",
    description: "Mute a user(permission require)"
}