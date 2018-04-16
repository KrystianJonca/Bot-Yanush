const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');

module.exports.run = async (bot,message,args) => {
    let banUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (banUser.id === message.author.id) return message.channel.send("You cannot ban yourself!");
    if (banUser.id === bot.user.id) return message.channel.send("I'm not a moron( ͡° ͜ʖ ͡°)");
    if (!reason) return message.channel.send("You must give a reason!");
    if (!banUser) return message.channel.send("You did not specify a user mention or ID!");
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have require permission!");
    if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be baned!");

    try {
        let embed = new Discord.RichEmbed()
            .setAuthor("Ban")
            .setDescription("ban a user")
            .setColor("#ff0000")
            .setThumbnail(banUser.user.displayAvatarURL)

            .addField("Baned User", `${banUser} with ID ${banUser.id}`)
            .addField("Baned By", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)
            .addField("Time", message.createdAt)
            .addField("Channel", message.channel);

        bot.channels.get(otherSettings.incidents_channel_id).send(embed);
        message.guild.member(banUser).ban(reason);
        message.channel.send("User baned!");
    }catch (error) {
        console.error(error.stack);
        message.channel.send("Sorry, but something went wrong, I can't ban user");
    }
   
    return;
}
module.exports.config = {
    name: ["ban"],
    args:"@user (Reason)",
    group:"For Admins",
    description: "Ban a user(permission require)",
    enabled: true,
    avaiable_on_other_categories: true    
}