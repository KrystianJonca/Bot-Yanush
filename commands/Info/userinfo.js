const Discord = require('discord.js');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Info o tobie")
        .setColor("#22A7F0")
        .setThumbnail(message.author.displayAvatarURL)
        
        .addField("Nazwa urzytkownika", `${message.author.username} #${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Dołączyłeś o", message.author.createdAt);
        
    return React.sendReact(true,message,embed,"send");
    
}
module.exports.config = {
    name: ["userinfo"],
    args:"",
    description: "Informacje o tobie!"
}