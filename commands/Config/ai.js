const Discord = require('discord.js');
const fs = require("fs");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let boolToSet = (args[0]=="on") ? true : false;
    
    if (!message.member.hasPermission("MANAGE_SERVER")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (!boolToSet || (args[0] !== "on" &&  args[0] !== "off")) return React.sendReact(false,message,"You must turn on/off auto spam mute and auto caps lock alert function","reply");

    let aiSettings = JSON.parse(fs.readFileSync("./database/ai-settings.json","utf8"));
    
    aiSettings[message.guild.id] = {
        ai: boolToSet
    };

    fs.writeFileSync("./database/ai-settings.json", JSON.stringify(aiSettings), (err) => {
        if (err) console.error(err);
    });

    let embed = new Discord.RichEmbed()
        .setTitle("AI functions - Auto spam mute and auto caps lock alert")
        .setDescription(`Turn ${boolToSet ? "on" : "off"}`)
        .setColor("#1E88E5");

    React.sendReact(true,message,embed,"send");
    return;

}
module.exports.config = {
    name: ["ai"],
    args:"<on/off>",
    description: "Auto spam mute and auto writing with caps lock alert functions(defualt in turn off)"
}   
