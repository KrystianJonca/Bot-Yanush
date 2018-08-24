const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix,con,logChannel) => {  
    if (!message.member.hasPermission("ADMINISTRATOR")) 
        return React.sendReact(false,message,"You don't have require permission!","reply");
    
    let kickUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!kickUser) 
        return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (!kickUser.kickable) 
        return React.sendReact(false,message,"That person can't be kicked! (Do they have a higher role? Do I have require permissions?)","reply");
    if (!reason) 
        return React.sendReact(false,message,"You must give a reason!","reply");

    await message.guild.member(kickUser).kick(reason).catch(error => {
        return React.sendReact(false,message,`Couldn't kick user because of: ${error}`,'reply');
    });
    if(logChannel){
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
        let logChannel = bot.channels.get(logChannel);
        logChannel.send(embed);
    }
    React.sendReact(true,message,`${kickUser.user.username} has been banned because *${reason}*`,"send");
}
module.exports.config = {
    name: ["kick"],
    args:"@user <reason>",
    description: "Kick a user(permission require)"   
}