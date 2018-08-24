const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "yanush"
});

module.exports.run = async (bot,message,args,prefix,con) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;

    con.query(`SELECT * FROM xp WHERE uid = '${target.id}' AND sid = '${message.guild.id}' ORDER BY xp DESC`,async (err,rows) => {
        if(err) throw err;

        if(!rows[0]) React.sendReact(false,message,"This user has no XP","send");

        let xp = rows[0].xp;
        let lvl = rows[0].lvl;

        let rank;
        let rankLength;

        con.query(`SELECT COUNT(1) as r FROM xp WHERE xp >= ${xp}`,(err,rows) => {
            if(err) throw err;
            
            rank = rows[0].r;
        });
        con.query(`SELECT * FROM xp WHERE sid = '${message.guild.id}'`,(err,rows) => {
            if(err) throw err;
            
            rankLength = rows.length;
        
            let embed = new Discord.RichEmbed()
                .setAuthor(`${target.username} XP and LVL`)
                .setThumbnail(target.displayAvatarURL)
                .setColor('#039BE5')

                .addField("Rank",`${rank}/${rankLength}`)
                .addField("XP",`${xp}/${lvl * 200}(to next lvl)`)
                .addField("LVL",`${lvl}`);
    
            React.sendReact(true,message,embed,"send");
            return;
        });
    });
}
module.exports.config = {
    name: ["xp"],
    args:"@user (optional)",
    description: "Get user XP and LVL!"

}