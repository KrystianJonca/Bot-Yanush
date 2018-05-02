const Discord = require('discord.js');
const fs = require("fs");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let prefixToSet = args[0];

    if (!message.member.hasPermission("MANAGE_SERVER")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (!prefixToSet) return React.sendReact(false,message,"You must give a prefix to set","reply");

    let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json","utf8"));
    
    prefixes[message.guild.id] = {
        prefix: prefixToSet
    };

    fs.writeFile("./database/prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.error(err);
    });

    let embed = new Discord.RichEmbed()
        .setTitle("Prefix set")
        .setDescription(`Set to ${prefixToSet}`)
        .setColor("#1E88E5");

    React.sendReact(true,message,embed,"send");
    return;

}
module.exports.config = {
    name: ["prefix"],
    args:"<prefix to set>",
    description: "Set your own prefix!"
}   
