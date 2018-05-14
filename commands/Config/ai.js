const Discord = require('discord.js');
const fs = require("fs");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let boolToSet = (args[0]=="on") ? true : false;
    
    if (!message.member.hasPermission("MANAGE_SERVER")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");
    if (args[0] !== "on" &&  args[0] !== "off") return React.sendReact(false,message,"Musisz włączyć(on) lub wyłączyć(off) funkcje AI","reply");

    let aiSettings = JSON.parse(fs.readFileSync("./database/ai-settings.json","utf8"));
    
    aiSettings[message.guild.id] = {
        ai: boolToSet
    };

    fs.writeFileSync("./database/ai-settings.json", JSON.stringify(aiSettings), (err) => {
        if (err) console.error(err);
    });

    let embed = new Discord.RichEmbed()
        .setTitle("Funkcjie AI - Auto spam mute i auto caps lock alert")
        .setDescription(`${boolToSet ? "Włączono" : "Wyłączono"}`)
        .setColor("#1E88E5");

    React.sendReact(true,message,embed,"send");
    return;

}
module.exports.config = {
    name: ["ai"],
    args:"<on/off>",
    description: "Auto spam mute i auto pisanie z caps lock alert functions(domyślnie wyłączone)"
}   
