const Discord = require('discord.js');
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("User's info")
        .setColor("#22A7F0")
        .setThumbnail(message.author.displayAvatarURL)
        
        .addField("Full Username", `${message.author.username} #${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Roles", message.member.roles.array)        
        .addField("Created at", message.author.createdAt);
        
    return React.sendReact(true,message,embed,"send");
    
}
module.exports.config = {
    name: ["userinfo"],
    args:"",
    description: "Get a few facts about you!"
}