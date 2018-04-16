const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setDescription("About me!")
        .setColor("#22A7F0")
        .setThumbnail(bot.user.displayAvatarURL)
    
        .addField("My username", `${bot.user.username} #${bot.user.discriminator}`)
        .addField("My ID", bot.user.id)
        .addField("I came alive at", bot.user.createdAt);
        
    message.channel.send(embed);
    return;
}
module.exports.config = {
    name: ["botinfo"],
    args:"",
    group:"Info",
    description: "A few facts about me!",
    enabled: true,
    avaiable_on_other_categories: false
}