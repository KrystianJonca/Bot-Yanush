const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let reason = args.join(" ").slice(22);

    if (!muteUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (muteUser.id === message.author.id) return React.sendReact(false,message,"You cannot mute yourself!","reply");
    if (muteUser.id === bot.user.id) return React.sendReact(false,message,"I'm not a moron( ͡° ͜ʖ ͡°)","reply");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");
    if (!message.member.has("MANAGE_MESSAGES")) return React.sendReact(false,message,"You don't have require permission!","send");
    if (muteUser.has("MANAGE_MESSAGES")) return React.sendReact(false,message,"That person can't be Muted!","send");
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
    if (muteUser.roles.has(role.id)) return React.sendReact(false,message,"This user is already muted!","send");
    
    let embed = new Discord.RichEmbed()
        .setAuthor("Mute")
        .setDescription("Mute a user")
        .setColor("#ff0000")
        .setThumbnail(muteUser.user.displayAvatarURL)

        .addField("Muted User", `${muteUser} with ID ${muteUser.id}`)
        .addField("Muted By", `${message.author} with ID ${message.author.id}`)              
        .addField("Reason", reason)        
        .addField("Muted at", message.createdAt)
        .addField("Channel", message.channel);


    await muteUser.addRole(role);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    React.sendReact(true,message,`User Muted!`,"send");

    return;
}
module.exports.config = {
    name: ["mute"],
    args:"@user <reason>",
    description: "Mute a user(permission require)"  
}