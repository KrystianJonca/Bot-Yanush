const Discord = require('discord.js');
const otherSettings = require('../config/other-settings.json');

module.exports.run = async (bot,message,args) => {
    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let muteTime = args[1];
    let reason = args.join(" ").slice(22);   

    console.log(muteTime);
    console.log(reason.slice(2));

    if (muteUser.id === message.author.id) return message.channel.send("You cannot mute yourself!");
    if (muteUser.id === bot.user.id) return message.channel.send("I'm not a moron( ͡° ͜ʖ ͡°)");
    if (isNaN(muteTime)) return message.channel.send("Mute time must be a number!");
    if (!reason) return message.channel.send("You must give a reason and mute time(in min) or type `0` to give a mute to appeal!");
    if (!muteUser) return message.channel.send("You did not specify a user mention or ID!");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have require permission!");
    if (muteUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be Muteed!");
    try {    
        if (!role) {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permission: []
            });

            message.guild.channels.forEach((channel,id) => {
                channel.overwritePermissions(role,{
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }
        let embed = new Discord.RichEmbed()
                .setAuthor("Mute")
                .setDescription("Mute a user")
                .setColor("#ff0000")
                .setThumbnail(muteUser.user.displayAvatarURL)

                .addField("Muted User", `${muteUser} with ID ${muteUser.id}`)
                .addField("Muted By", `${message.author} with ID ${message.author.id}`)
                .addField("Mute time", `${muteTime == 0 ? "An indefinite period of time" : muteTime+" sec"}`)                
                .addField("Reason", reason.slice(2))        
                .addField("Time", message.createdAt)
                .addField("Channel", message.channel);

        if (muteUser.roles.has(role.id)) return message.channel.send("This user is already muted!")

        await muteUser.addRole(role);

        bot.channels.get(otherSettings.incidents_channel_id).send(embed);
        message.channel.send(`User Muted! On ${muteTime == 0 ? "an indefinite period of time" : muteTime+" min"}`);
    }catch (error) {
        console.error(error.stack);
        message.channel.send("Sorry, but something went wrong, I can't mute user");
    }
    if (muteTime == 0) return;
    else{
        setTimeout(()=>{
            let embed = new Discord.RichEmbed()
                .setAuthor("Mute time passed")
                .setDescription("Auto unmute")
                .setColor("#4CAF50")
            
                .addField("Unmuted User", `${muteUser} with ID ${muteUser.id}`)       
                .addField("Mute at", message.createdAt);

            muteUser.removeRole(role);

            return bot.channels.get(otherSettings.incidents_channel_id).send(embed);        
        },muteTime * 60000);
    };
    return;
}
module.exports.config = {
    name: ["mute"],
    args:"@user (time in sec) (Reason)",
    group:"For Admins",
    description: "Mute a user(permission require)",
    enabled: true,
    avaiable_on_other_categories: true    
}