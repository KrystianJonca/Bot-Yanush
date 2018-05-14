const Discord = require('discord.js');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");    
    let mentionUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));

    if (!mentionUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (message.author.id === mentionUser.id) return React.sendReact(false,message,`Use ${prefix}userinfo`,"reply");
    if (mentionUser.id === bot.user.id) return React.sendReact(false,message,`Use ${prefix}botinfo`,"reply");
    
    let embed = new Discord.RichEmbed()
        .setAuthor(mentionUser.user.username)
        .setDescription("User's info")
        .setColor("#22A7F0")
        .setThumbnail(mentionUser.user.displayAvatarURL)
            
        .addField("Full Username", `${mentionUser.user.username} #${mentionUser.user.discriminator}`)
        .addField("ID", mentionUser.user.id)
        .addField("Created at", mentionUser.user.createdAt);
        
    return React.sendReact(true,message,embed,"send");
}
module.exports.config = {
    name: ["whois"],
    args:"@user",
    description: "Mention user info" 
}   
