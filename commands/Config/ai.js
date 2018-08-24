const Discord = require('discord.js');
const fs = require("fs");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix,con) => {
    let boolToSet = (args[0]=="on") ? 1 : 0;
    
    if (!message.member.hasPermission("MANAGE_SERVER")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (args[0] !== "on" &&  args[0] !== "off") return React.sendReact(false,message,"You must turn on/off auto spam mute and auto caps lock alert function","reply");

    con.query(`SELECT * FROM gilds WHERE sid = '${message.guild.id}'`,async (err,rows) => {
        if(err) throw err; 
    
        let sql = `UPDATE gilds SET ai = '${boolToSet}' WHERE sid = '${message.guild.id}'`;

        con.query(sql)
    });

    let embed = new Discord.RichEmbed()
        .setTitle("AI functions")
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
