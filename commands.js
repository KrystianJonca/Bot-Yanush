const Discord = require('discord.js');
const fs = require("fs");
const React = require("./modules/reacting.js");

module.exports = class Commands {
    constructor(bot) {
        fs.readdir('./commands/',(err,folders) =>{
            if (err) throw err;

            folders.forEach((folder,index) =>{
                fs.readdir(`./commands/${folder}`,(err,files) => {
                    if (err) throw err;

                    let jsfiles = files.filter(f => f.split(".").pop() === "js");
                    if (jsfiles.length <= 0) {
                        console.log("No commands to load!");
                        return;
                    }
                    console.log(`Loading ${jsfiles.length} commands in ${folder} folder!`);

                    jsfiles.forEach((f,i) => {
                        let cmds = require(`./commands/${folder}/${f}`);
                        cmds.config.group = folder;
                        console.log(`${i+1}: ${f} loaded!`);
                        for (let i = 0; i < cmds.config.name.length; i++) {
                            bot.commands.set(cmds.config.name[i],cmds);
                        }
                    });
                });
            });
            return bot;
        });
    }
    static commandInfo(cmd,message,prefix){
        fs.readdir('./commands/',(err,folders) =>{
            if (err) throw err;

            let commandExist = false;

            folders.forEach((folder,index) =>{
                fs.readdir(`./commands/${folder}`,(err,files) => {
                    if (err) throw err;

                    let jsfiles = files.filter(f => f.split(".").pop() === "js");

                    jsfiles.forEach((f,i) => {
                        let cmds = require(`./commands/${folder}/${f}`);

                        if (cmds.config.name.indexOf(cmd.slice(prefix.length)) != -1) {
                            commandExist = true;

                            React.sendReact(true,message);

                            let embed = new Discord.RichEmbed()
                                .setAuthor("Command")
                                .setDescription(`\`${cmds.config.name.join("/")}\`This command must starts with \`${prefix}\``)
                                .setColor("#90CAF9")

                                .addField("Usage", `\`${prefix}${cmds.config.name.join("/")} ${cmds.config.args}\``)
                                .addField("Description", `${cmds.config.description}`)
                                .addField("Group", `${folder}`);


                            message.channel.send(embed);
                        }
                        if (folders.length-1 === index && jsfiles.length-1 === i) {
                            if (!commandExist) {
                                React.sendReact(false,message,`I can't give you information about this command beacause it does not exist! Type \`${prefix}help\` to get the avaiable command list!`,'reply').then(msg => {msg.delete(5000)});
                                return;
                            }
                        }
                    });
                });
            });
        });

    }

};
