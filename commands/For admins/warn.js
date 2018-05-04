const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const fs = require('fs');

let warns = JSON.parse(fs.readFileSync("./database/warnings.json", "utf8"));

module.exports.run = async (bot,message,args,prefix) => {
    let warningUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);
    
    if (!warningUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (warningUser.id === message.author.id) return React.sendReact(false,message,"You cannot warning yourself!","reply");
    if (warningUser.id === bot.user.id) return React.sendReact(false,message,"I'm not a moron( ͡° ͜ʖ ͡°)","send");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");
    if (!message.member.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (warningUser.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"That person can't be warned!","reply");

    if (!warns[warningUser.id]) warns[warningUser.id] = {
        warnings: 0
    };

    warns[warningUser.id].warnings++;

    fs.writeFile("./database/warnings.json",JSON.stringify(warns), (err) => {if(err) console.error(err);});

    let embed = new Discord.RichEmbed()
        .setAuthor("Warn")
        .setDescription("Warn a user")
        .setColor("#ff0000")
        .setThumbnail(warningUser.user.displayAvatarURL)

        .addField("Warned User", `${warningUser} with ID ${warningUser.id}`)
        .addField("Warned By", `${message.author} with ID ${message.author.id}`)    
        .addField("Number of Warning", warns[warningUser.id].warnings )                                  
        .addField("Reason", reason)        
        .addField("Warned at", message.createdAt)
        .addField("Channel", message.channel);

    let incidentsChannel = message.guild.channels.find('name','incidents');
    incidentsChannel.send(embed);

    React.sendReact(true,message,"User warned!","send");

    if (warns[warningUser.id].warnings === 3) {
        let role = message.guild.roles.find(r => r.name === "Muted");
        let muteTime = 15;
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
            .setAuthor("Auto mute")
            .setDescription("Mute a user")
            .setColor("#ff0000")
            .setThumbnail(warningUser.user.displayAvatarURL)
    
            .addField("Muted User", `${warningUser} with ID ${warningUser.id}`)
            .addField("Mute time", muteTime)                
            .addField("Reason", 'User have got 3 warnings from administrators');
    
        if (warningUser.roles.has(role.id)) return;
    
        await warningUser.addRole(role);
    
        incidentsChannel.send(embed);

        if (muteTime == 0) return;
        else{
            setTimeout(()=>{
                let embed = new Discord.RichEmbed()
                    .setAuthor("Mute time passed")
                    .setDescription("Auto unmute")
                    .setColor("#4CAF50")
                
                    .addField("Unmuted User", `${warningUser} with ID ${warningUser.id}`)
    
                    warningUser.removeRole(role);
    
                return incidentsChannel.send(embed);      
            },muteTime * 60000);
        };
    }else if (warns[warningUser.id].warnings === 5) {
        let embed = new Discord.RichEmbed()
            .setAuthor("Ban")
            .setDescription("ban a user")
            .setColor("#ff0000")
            .setThumbnail(banUser.user.displayAvatarURL)

            .addField("Banned User", `${banUser} with ID ${banUser.id}`)
            .addField("Reason", 'User have got 5 warnings from administrators');

        incidentsChannel.send(embed);
        
        message.guild.member(banUser).ban('User have got 5 warnings from administrators');
    }
    return;
}
module.exports.config = {
    name: ["warn"],
    args:"@user <reason>",
    description: "Warn a user(3 warns - mute on 15 min, 5 warns - ban)"
}