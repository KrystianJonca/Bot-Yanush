const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const fs = require('fs');

module.exports.run = async (bot,message,args,prefix,con,logChannel) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) 
        return React.sendReact(false,message,"You don't have require permission!","reply");    
    let warningUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);
    
    if (!warningUser) 
        return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (!warningUser.kickable) 
        return React.sendReact(false,message,"That person can't be warned! (Do they have a higher role? Do I have require permissions?)","reply");
    if (!reason) 
        return React.sendReact(false,message,"You must give a reason!","reply");

    if (!bot.warns[warningUser.id]) bot.warns[warningUser.id] = {
        warnings: 0
    };

    bot.warns[warningUser.id].warnings++;

    fs.writeFile("./database/warnings.json",JSON.stringify(bot.warns), (err) => {
        if(err) throw(err);
    });
    if(logChannel){
        let embed = new Discord.RichEmbed()
            .setAuthor("Warn")
            .setDescription("Warn a user")
            .setColor("#ff0000")
            .setThumbnail(warningUser.user.displayAvatarURL)

            .addField("Warned User", `${warningUser} with ID ${warningUser.id}`)
            .addField("Warned By", `${message.author} with ID ${message.author.id}`)    
            .addField("Number of Warning", bot.warns[warningUser.id].warnings )                                  
            .addField("Reason", reason)        
            .addField("Warned at", message.createdAt)
            .addField("Channel", message.channel);

        let logChannel = bot.channels.get(logChannel);
        logChannel.send(embed);
    }
    React.sendReact(true,message,`${warnUser.user.username} has been banned warned *${reason}*`,"send");

    if (bot.warns[warningUser.id].warnings === 3) {
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
    
        if (warningUser.roles.has(role.id)) return;

        bot.mutes[warningUser.id] = {
            guild: message.guild.id,
            time: Date.now() + parseInt(muteTime) * 60000
        }
        fs.writeFile("./database/mutes.json",JSON.stringify(bot.mutes,null,4),err => {
            if(err) console.error(err);
        })

        await warningUser.addRole(role).catch(error => {
            return React.sendReact(false,message,`Couldn't mute user because of: ${error}(He has got 3 warns)`,'reply')
        });
    
        if(logChannel){
            let embed = new Discord.RichEmbed()
                .setAuthor("Auto mute")
                .setDescription("Mute a user")
                .setColor("#ff0000")
                .setThumbnail(warningUser.user.displayAvatarURL)
        
                .addField("Muted User", `${warningUser} with ID ${warningUser.id}`)
                .addField("Mute time", `${muteTime} min`)                
                .addField("Reason", 'User have got 3 warnings from administrators');

            logChannel.send(embed);
        }
    }
    if (bot.warns[warningUser.id].warnings === 5) {
        await message.guild.member(warningUser).ban('User have got 5 warnings from administrators').catch(error => {
            return React.sendReact(false,message,`Couldn't ban user because of: ${error}(He has got 5 warns)`,'reply')
        });
        if(logChannel){
            let embed = new Discord.RichEmbed()
                .setAuthor("Ban")
                .setDescription("ban a user")
                .setColor("#ff0000")
                .setThumbnail(warningUser.user.displayAvatarURL)

                .addField("Banned User", `${warningUser} with ID ${warningUser.id}`)
                .addField("Reason", 'User have got 5 warnings from administrators');

            logChannel.send(embed);
        }
    }
    return;
}
module.exports.config = {
    name: ["warn"],
    args:"@user <reason>",
    description: "Warn a user(3 warns - mute on 15 min, 5 warns - ban)"
}