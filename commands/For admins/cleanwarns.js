const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const fs = require('fs');

module.exports.run = async (bot,message,args,prefix) => {
    let warns = JSON.parse(fs.readFileSync("./database/warnings.json", "utf8"));
    let cleanUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);
    
    if (!cleanUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (cleanUser.id === message.author.id) return React.sendReact(false,message,"You cannot clean warns yourself!","reply");
    if (cleanUser.id === bot.user.id) return React.sendReact(false,message,"I dont't have warns","send");
    if (!reason) return React.sendReact(false,message,"You must give a reason!","reply");
    if (!message.member.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (cleanUser.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"That person can't be warned!","reply");
    if (!warns[cleanUser.id]) return React.sendReact(false,message,"That user doesn't have warns!","reply")

    warns[cleanUser.id].warnings = 0;

    fs.writeFile("./database/warnings.json",JSON.stringify(warns), (err) => {if(err) console.error(err);});

    let embed = new Discord.RichEmbed()
        .setAuthor("Clean warns")
        .setDescription("Clean user's warns")
        .setColor("#4CAF50")
        .setThumbnail(cleanUser.user.displayAvatarURL)

        .addField("Cleaned User", `${cleanUser} with ID ${cleanUser.id}`)
        .addField("Cleaned By", `${message.author} with ID ${message.author.id}`)                                 
        .addField("Reason", reason)        
        .addField("Cleaned at", message.createdAt)
        .addField("Channel", message.channel);

    let incidentsChannel = message.guild.channels.find('name','incidents');
    incidentsChannel.send(embed);

    React.sendReact(true,message,`Warns cleared for ${cleanUser}`,"send");

    
    return;
}
module.exports.config = {
    name: ["cleanwarns"],
    args:"@user <reason>",
    description: "Clean user's warns"
}