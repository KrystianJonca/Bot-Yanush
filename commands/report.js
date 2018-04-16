const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');

module.exports.run = async (bot,message,args) => {
    let reportUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (reportUser.id === message.author.id) return message.channel.send("You cannot report yourself!");
    if (reportUser.id === bot.user.id) return message.channel.send("I'm not a moron( ͡° ͜ʖ ͡°)");
    if (!reason) return message.channel.send("You must give a reason!");
    if (!reportUser) return message.channel.send("You did not specify a user mention or ID!");

    try{
        let embed = new Discord.RichEmbed()
            .setAuthor("Report")
            .setDescription("Report a user")
            .setColor("#ff0000")
            .setThumbnail(reportUser.user.displayAvatarURL)

            .addField("Reported User", `${reportUser} with ID ${reportUser.id}`)
            .addField("Reported By", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)        
            .addField("Time", message.createdAt)
            .addField("Channel", message.channel);

        bot.channels.get(otherSettings.reports_channel_id).send(embed);
        message.channel.send("Report sent successfully!");            
    }catch(error){
        console.error(error.stack);
        message.channel.send("Sorry, but something went wrong, I can't send report");
    }
    return;
}
module.exports.config = {
    name: ["report"],
    args:"@user [Reason]",
    group:"Random",
    description: "Report a user(permission require)",
    enabled: true,
    avaiable_on_other_categories: true
}