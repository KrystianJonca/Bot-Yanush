const Discord = require('discord.js');
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args) => {
    let mentionUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));

    if (!mentionUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");

    let embed = new Discord.RichEmbed()
        .setAuthor(mentionUser.user.username)
        .setDescription("User's info")
        .setColor("#22A7F0")
        .setThumbnail(mentionUser.user.displayAvatarURL)
            
        .addField("Full Username", `${mentionUser.user.username} #${mentionUser.user.discriminator}`)
        .addField("ID", mentionUser.user.id)
        .addField("Created at", mentionUser.user.createdAt);
        
    return React.sendReact(true,message,embed,"reply");

}
module.exports.config = {
    name: ["whois"],
    args:"@user",
    description: "Mention user info" 
}   
