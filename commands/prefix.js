const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    let prefix = args[0];

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have require permission!");
    if (!prefix) return message.reply("You must give a prefix to set");

    let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json","utf8"));
    
    prefixes[message.guild.id] = {
        prefix: prefix
    };

    fs.writeFile("./database/prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.error(err);
    });

    let embed = new Discord.RichEmbed()
        .setTitle("Prefix set")
        .setDescription(`Set to ${prefix}`)
        .setColor("#1E88E5");

    message.channel.send(embed);
    return;

}
module.exports.config = {
    name: ["prefix"],
    args:"(your prefix)",
    group:"Random",
    description: "Set your own prefix!",
    enabled: true,
    avaiable_on_other_categories: false
    
}   
