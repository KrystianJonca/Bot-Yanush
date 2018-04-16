const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
    let mentionUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));

    if (mentionUser.id === bot.user.id) return message.channel.send("Use `!botinfo`");

    if (!mentionUser) return message.channel.send("You did not specify a user mention or ID!");

    let embed = new Discord.RichEmbed()
        .setAuthor(mentionUser.user.username)
        .setDescription("User's info")
        .setColor("#22A7F0")
        .setThumbnail(mentionUser.user.displayAvatarURL)
            
        .addField("Full Username", `${mentionUser.user.username} #${mentionUser.user.discriminator}`)
        .addField("ID", mentionUser.user.id)
        .addField("Created at", mentionUser.user.createdAt);
        
    return message.channel.send(embed);

}
module.exports.config = {
    name: ["whois"],
    args:"@user",
    group:"Info",
    description: "Mention user info",
    enabled: true,
    avaiable_on_other_categories: false    
}   
