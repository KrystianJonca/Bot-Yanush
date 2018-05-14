const Discord = require('discord.js');
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setDescription("Coś o mnie!")
        .setColor("#22A7F0")
        .setThumbnail(bot.user.displayAvatarURL)
    
        .addField("Mój nick", `${bot.user.username} #${bot.user.discriminator}`)
        .addField("Moje ID", bot.user.id)
        .addField("Obsługuje", `${bot.users.size} urzytkowników!`)   
        .addField("Działam na", `na ${bot.guilds.size} serwerach`)                            
        .addField("Działam już", (bot.uptime/3600000).toFixed(2))               
        .addField("Powstałem o ", bot.user.createdAt);
    
    
    React.sendReact(true,message,embed,'send');
    return;
}
module.exports.config = {
    name: ["botinfo"],
    args:"",
    description: "Coś o mnie!"

}