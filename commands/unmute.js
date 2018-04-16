const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');

module.exports.run = async (bot,message,args) => {
    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let reason = args.join(" ").slice(22);

    if (muteUser.id === bot.user.id) return message.channel.send("I'm not a moron( ͡° ͜ʖ ͡°)");
    if (!reason) return message.channel.send("You must give a reason!");
    if (!muteUser) return message.channel.send("You did not specify a user mention or ID!");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have require permission!");
    if (muteUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be Unmuted!");
    try {
        let embed = new Discord.RichEmbed()
            .setAuthor("Unmute")
            .setDescription("Unmute a user")
            .setColor("#4CAF50")
            .setThumbnail(muteUser.user.displayAvatarURL)

            .addField("Unmuted User", `${muteUser} with ID ${muteUser.id}`)
            .addField("Unmuted By", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)        
            .addField("Time", message.createdAt)
            .addField("Channel", message.channel);

        if (!role || !muteUser.roles.has(role.id)) return message.channel.send("This user is not muted!")

        await muteUser.removeRole(role);

        bot.channels.get(otherSettings.incidents_channel_id).send(embed);
        message.channel.send("User Unmuted!");
    }catch (error) {
        console.error(error.stack);
        message.channel.send("Sorry, but something went wrong, I can't mute user");
    }
    return;
}
module.exports.config = {
    name: ["unmute"],
    args:"@user (Reason)",
    group:"For Admins",
    description: "Mute a user(permission require)",
    enabled: true,
    avaiable_on_other_categories: true    
}