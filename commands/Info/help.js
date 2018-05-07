const fs = require('fs');
const characterLimit = 2000;
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    React.sendReact(true,message,"I have just sent you a message with available commands!","reply");

    let helpMsg = "Hello! I have a list of available commands for you that you asked for :slight_smile: :wink: \n";

    fs.readdir('./commands/',(err,folders) => {
        if (err) console.error(err);
                                                 
        folders.forEach(async (folder,index) => {           
            fs.readdir(`./commands/${folder}`,(err,files) => {
                if (err) console.error(err);
                
                helpMsg += `***${folder} commands:*** \n`;
                
                let jsfiles = files.filter(f => f.split(".").pop() === "js");
                if (jsfiles.length <= 0) {
                    helpMsg = "We're sorry but our server has no command yet :confused: ";
                    message.author.send(helpMsg);
                    return;
                }
                jsfiles.forEach((f,i) => {
                    let cmds = require(`../${folder}/${f}`);
            
                    helpMsg += `**${i+1}:** \`${prefix}${cmds.config.name} ${cmds.config.args}\` | **Description:**  ${cmds.config.description} \n`;
                   
                    if (folders.length-1 === index && jsfiles.length-1 === i) {
                        if (helpMsg.length >= characterLimit) {
                            message.author.send(helpMsg,{split:[maxLength = characterLimit, char = '\n']});
                        }else{
                            message.author.send(helpMsg);
                        }
                    }
                });
            });

        });
    });
    return;

}
module.exports.config = {
    name: ["help","commands","info"],
    args:"",
    description: "Get a avaiable command list!" 
}   
