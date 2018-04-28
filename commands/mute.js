const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let muteTime = args[1];
    let reason = args.join(" ").slice(22 + muteTime.length);

    if (!muteUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (muteUser.id === message.author.id) return React.sendReact(false,message,"You cannot mute yourself!","reply");
    if (muteUser.id === bot.user.id) return React.sendReact(false,message,"I'm not a moron( ͡° ͜ʖ ͡°)","reply");
    if (isNaN(muteTime)) return React.sendReact(false,message,"Mute time must be a number!","reply");
    if (!reason) return React.sendReact(false,message,"You must give a reason and mute time(in min) or type `0` to give a mute to appeal!","reply");
    if (!message.member.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"You don't have require permission!","send");
    if (muteUser.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"That person can't be Muteed!","send");
    try {    
        if (!role) {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permission: []
            });

            message.guild.channels.forEach((channel,id) => {
                channel.overwritePermissions(role,{
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }
    }catch(e){
        console.error(error.stack);        
    }
    let embed = new Discord.RichEmbed()
        .setAuthor("Mute")
        .setDescription("Mute a user")
        .setColor("#ff0000")
        .setThumbnail(muteUser.user.displayAvatarURL)

        .addField("Muted User", `${muteUser} with ID ${muteUser.id}`)
        .addField("Muted By", `${message.author} with ID ${message.author.id}`)
        .addField("Mute time", `${muteTime == 0 ? "An indefinite period of time" : muteTime+" min"}`)                
        .addField("Reason", reason)        
        .addField("Muted at", message.createdAt)
        .addField("Channel", message.channel);

    if (muteUser.roles.has(role.id)) return React.sendReact(false,message,"This user is already muted!","send");

    await muteUser.addRole(role);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    React.sendReact(true,message,`User Muted! On ${muteTime == 0 ? "an indefinite period of time" : muteTime+" min"}`,"send");

    if (muteTime == 0) return;
    else{
        setTimeout(()=>{
            let embed = new Discord.RichEmbed()
                .setAuthor("Mute time passed")
                .setDescription("Auto unmute")
                .setColor("#4CAF50")
            
                .addField("Unmuted User", `${muteUser} with ID ${muteUser.id}`)
                .addField("Mute at", message.createdAt);

            muteUser.removeRole(role);

            return incidentsChannel.send(embed);      
        },muteTime * 60000);
    };
    return;
}
module.exports.config = {
    name: ["mute"],
    args:"@user <time in sec> <reason>",
    description: "Mute a user(permission require)"  
}