const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');

module.exports.run = async (bot,message,args) => {
    let kickUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (kickUser.id === message.author.id) return message.channel.send("You cannot kick yourself!");
    if (kickUser.id === bot.user.id) return message.channel.send("I'm not a moron( ͡° ͜ʖ ͡°)");
    if (!reason) return message.channel.send("You must give a reason!");
    if (!kickUser) return message.channel.send("You did not specify a user mention or ID!");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have require permission!");
    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

    try {
        let embed = new Discord.RichEmbed()
            .setAuthor("Kick")
            .setDescription("Kick a user")
            .setColor("#ff0000")
            .setThumbnail(kickUser.user.displayAvatarURL)

            .addField("Kicked User", `${kickUser} with ID ${kickUser.id}`)
            .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)        
            .addField("Time", message.createdAt)
            .addField("Channel", message.channel);

        bot.channels.get(otherSettings.incidents_channel_id).send(embed);
        message.guild.member(kickUser).kick(reason);
        message.channel.send("User kicked!");  
    }catch (error) {
        console.error(error.stack);
        message.channel.send("Sorry, but something went wrong, I can't kick user");
    }
    return;
}
module.exports.config = {
    name: ["kick"],
    args:"@user (Reason)",
    group:"For Admins",
    description: "Kick a user(permission require)",
    enabled: true,
    avaiable_on_other_categories: true    
}