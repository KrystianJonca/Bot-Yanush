const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");
const fs = require('fs');

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have require permission!");

    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let muteTime = args[1];
    let reason = args.join(" ").slice(isNaN(muteTime) ? 22 : 22 + muteTime.length);
    if (isNaN(muteTime)) muteTime = 0;        

    if (!muteUser) return message.reply("You did not specify a user mention or ID!");
    if (muteUser.id === message.author.id) return message.reply("You cannot mute yourself!");
    if (muteUser.id === bot.user.id) return message.reply("I'm not a moron( ͡° ͜ʖ ͡°)");
    if (!reason) return message.reply("You must give a reason!");
    if (muteUser.hasPermission("MANAGE_MESSAGES")) return message.reply("That person can't be Muted!");

    try {    
        if (!role) {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permission: []
            });

            message.guild.channels.forEach(async (channel,id) => {
                await channel.overwritePermissions(role,{
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }
    }catch(e){
        console.error(error.stack);        
    }
    
    if (muteUser.roles.has(role.id)) return message.reply("This user is already muted!");

    let embed = new Discord.RichEmbed()
        .setAuthor("Mute")
        .setDescription("Mute a user")
        .setColor("#ff0000")
        .setThumbnail(muteUser.user.displayAvatarURL)

        .addField("Muted User", `${muteUser} with ID ${muteUser.id}`)
        .addField("Muted By", `${message.author} with ID ${message.author.id}`)              
        .addField("Reason", reason) 
        .addField("Mute time", `${(muteTime===0) ? "An indefinite period of time" : muteTime + "min"}`)                       
        .addField("Muted at", message.createdAt)
        .addField("Channel", message.channel);

    if (muteTime !== 0) {
        bot.mutes[muteUser.id] = {
            guild: message.guild.id,
            time: Date.now() + parseInt(muteTime) * 60000
        }
        fs.writeFile("./database/mutes.json",JSON.stringify(bot.mutes,null,4),err => {
            if(err) console.error(err);
        })
    }

    await muteUser.addRole(role);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    message.reply(`User Muted!`);
}
module.exports.config = {
    name: ["mute"],
    args:"@user <mute time in min (optional)> <reason>",
    description: "Mute a user(permission require)"  
}
