const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const fs = require('fs');

let warns = JSON.parse(fs.readFileSync("./database/warnings.json", "utf8"));

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");    
    let warningUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);
    
    if (!warningUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (warningUser.id === message.author.id) return React.sendReact(false,message,"Nie możesz ostrzec samego siebie!","reply");
    if (warningUser.id === bot.user.id) return React.sendReact(false,message,"Nie możesz wykonywać tej operacji na mnie","send");
    if (!reason) return React.sendReact(false,message,"Musisz podać powód!","reply");
    if (warningUser.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"Ta osobanie może zostać ostrzeżona!","reply");

    if (!warns[warningUser.id]) warns[warningUser.id] = {
        warnings: 0
    };

    warns[warningUser.id].warnings++;

    fs.writeFile("./database/warnings.json",JSON.stringify(warns), (err) => {if(err) console.error(err);});

    let embed = new Discord.RichEmbed()
        .setAuthor("Ostrzeżono")
        .setDescription("Ostrzeżono urzytkownika")
        .setColor("#ff0000")
        .setThumbnail(warningUser.user.displayAvatarURL)

        .addField("Ostrzeżono", `${warningUser} z ID ${warningUser.id}`)
        .addField("Ostrzeżono przez", `${message.author} z ID ${message.author.id}`)    
        .addField("Liczba ostrzeżeń", warns[warningUser.id].warnings )                                  
        .addField("Powód", reason)        
        .addField("Ostrzeżono o", message.createdAt)
        .addField("Kanał", message.channel);

    let incidentsChannel = message.guild.channels.find('name','incidents');
    incidentsChannel.send(embed);

    React.sendReact(true,message,"Ostrzeżono urzytkownika!","send");

    if (warns[warningUser.id].warnings === 3) {
        let role = message.guild.roles.find(r => r.name === "Muted");
        let muteTime = 15;
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
        }catch(e){
            console.error(error.stack);        
        }

        let embed = new Discord.RichEmbed()
            .setAuthor("Automatyczne wyciszenie")
            .setDescription("Wyciszenie urzytkownika")
            .setColor("#ff0000")
            .setThumbnail(warningUser.user.displayAvatarURL)
    
            .addField("Wyciszono", `${warningUser} with ID ${warningUser.id}`)
            .addField("Czas wyciszenia", `${muteTime} min`)                
            .addField("Powód", 'Urzytkownik dostął 3 ostrzeżenia od Administratorów');
    
        if (warningUser.roles.has(role.id)) return;

        bot.mutes[warningUser.id] = {
            guild: message.guild.id,
            time: Date.now() + parseInt(muteTime) * 60000
        }
        fs.writeFile("./database/mutes.json",JSON.stringify(bot.mutes,null,4),err => {
            if(err) console.error(err);
        })

        await warningUser.addRole(role);
    
        incidentsChannel.send(embed);
    }
    if (warns[warningUser.id].warnings === 5) {
        let embed = new Discord.RichEmbed()
            .setAuthor("Zbanowano")
            .setDescription("Zbanowano urzytkownika")
            .setColor("#ff0000")
            .setThumbnail(warningUser.user.displayAvatarURL)

            .addField("Zbanowano", `${warningUser} z ID ${warningUser.id}`)
            .addField("Powód", 'Urzytkownik dostał 5 ostrzeżeń od Administratorów');

        incidentsChannel.send(embed);
        
        message.guild.member(warningUser).ban('Urzytkownik dostał 5 ostrzeżeń od Administratorów');
    }
    return;
}
module.exports.config = {
    name: ["warn"],
    args:"@oznaczenia <powód>",
    description: "Ostrzec urzytkownika(3 ostrzeżenia - wuciszenia na 15 min, 5 ostrzeżeń - ban)"
}