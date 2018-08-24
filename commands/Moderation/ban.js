const Discord = require('discord.js');
const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args,prefix,con,logChannel) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) 
        return React.sendReact(false,message,"You don't have require permission!","reply");   
     
    let banUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!banUser) 
        return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (!banUser.bannable) 
        return React.sendReact(false,message,"That person can't be baned! (Do they have a higher role? Do I have require permissions?)","reply");
    if (!reason) 
        return React.sendReact(false,message,"You must give a reason!","reply");

        
    await message.guild.member(banUser).ban(reason).catch(error => {
        return React.sendReact(false,message,`Couldn't ban user because: ${error}`,'reply')
    });
    if(logChannel){
        let embed = new Discord.RichEmbed()
            .setAuthor("Ban")
            .setDescription("Ban a user")
            .setColor("#ff0000")
            .setThumbnail(banUser.user.displayAvatarURL)

            .addField("Banned User", `${banUser} with ID ${banUser.id}`)
            .addField("Banned By", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)
            .addField("Banned at", message.createdAt)
            .addField("Channel", message.channel);

        let logChannel = bot.channels.get(logChannel);
        logChannel.send(embed);
    }
    
    React.sendReact(true,message,`${banUser.user.username} has been banned because *${reason}*`,"send");
}
module.exports.config = {
    name: ["ban"],
    args:"@user <reason>",
    description: "Ban a user(permission require)"

}