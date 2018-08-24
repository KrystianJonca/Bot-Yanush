const Discord = require('discord.js');
const fs = require("fs");
const otherSettings = require("../../config/other-settings.json");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix,con) => {
    let prefixToSet = args[0];
    let maxPrefixLength = otherSettings.max_prefix_length;

    if (!message.member.hasPermission("MANAGE_SERVER")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (!prefixToSet) return React.sendReact(false,message,"You must give a prefix to set","reply");
    if (prefixToSet.length >= maxPrefixLength) return React.sendReact(false,message,`Prefix length must be less or equal to ${maxPrefixLength}`,"reply");

    con.query(`SELECT * FROM gilds WHERE sid = '${message.guild.id}'`,async (err,rows) => {
        if(err) throw err; 
    
        let sql = `UPDATE gilds SET prefix = '${prefixToSet}' WHERE sid = '${message.guild.id}'`;

        con.query(sql)
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
    description: "Set prefix for your own server"
}   
