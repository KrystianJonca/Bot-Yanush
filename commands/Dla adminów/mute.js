const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require("../../modules/reacting.js");
const fs = require('fs');

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie masz wymaganego pozwolenia!");

    let muteUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    let muteTime = args[1];
    let reason = args.join(" ").slice(isNaN(muteTime) ? 22 : 22 + muteTime.length);
    if (isNaN(muteTime)) muteTime = 0;        

    if (!muteUser) return message.reply("Nie podałeś oznaczenia urzytkownika lub jego ID!");
    if (muteUser.id === message.author.id) return message.reply("Nie możesz wyciszyć samego siebie!");
    if (muteUser.id === bot.user.id) return message.reply("Nie możesz wykonywać tej operacji na mnie");
    if (!reason) return message.reply("Musisz podać powód!");
    if (muteUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Ta osoba nie może zostać wyciszona!");

    try {    
        if (!role) {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permission: []
            });

            message.guild.channels.forEach(async (channel,id) => {
                await channel.overwritePermissions(role,{
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }
    }catch(e){
        console.error(error.stack);        
    }
    
    if (muteUser.roles.has(role.id)) return message.reply("Ten urzytkownik jest już wyciszony!");

    let embed = new Discord.RichEmbed()
        .setAuthor("Wyciszenie")
        .setDescription("Wyciszenie urzytkownika")
        .setColor("#ff0000")
        .setThumbnail(muteUser.user.displayAvatarURL)

        .addField("Wyciszono", `${muteUser} with ID ${muteUser.id}`)
        .addField("Wyciszono przez", `${message.author} with ID ${message.author.id}`)              
        .addField("Powód", reason) 
        .addField("Czas wyciszenia", `${(muteTime==0) ? "Na czas nieokreślony" : muteTime + "min"}`)                       
        .addField("Wyciszono o", message.createdAt)
        .addField("Kanał", message.channel);

    if (muteTime !== 0) {
        bot.mutes[muteUser.id] = {
            guild: message.guild.id,
            time: Date.now() + parseInt(muteTime) * 60000
        }
        fs.writeFile("./database/mutes.json",JSON.stringify(bot.mutes,null,4),err => {
            if(err) console.error(err);
        })
    }

    await muteUser.addRole(role);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    message.reply(`Wyciszono!`);
}
module.exports.config = {
    name: ["mute"],
    args:"@oznaczenie <czas wyciszenia (opcjonalnie)> <powód>",
    description: "Wyciszenie urzytkownika(wymagane pozwolenie)"  
}
