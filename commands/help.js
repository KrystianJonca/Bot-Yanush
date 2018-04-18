const fs = require('fs');
const characterLimit = 2000;
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args) => {
    React.sendReact(true,message,"I have just sent you a message with available commands!","reply");

    let helpMsg = "Hello! I have a list of available commands for you that you asked for :slight_smile: :wink: \n";

    fs.readdir(`./commands/`,(err,files) => {
        if (err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length == 1) {
            helpMsg = "We're sorry but our server has no command yet :confused: ";
            message.author.send(helpMsg);
            return;
        }
        jsfiles.forEach((f,i) => {
            let cmds = require(`./${f}`);
            
            helpMsg += `**${i+1}:** \`!${cmds.config.name} ${cmds.config.args}\` | **Description:**  ${cmds.config.description}. | **Status:** ${cmds.config.enabled ? "Enable":"Disable"} | **Group:** ${cmds.config.group}\n`;                
            
        }); 
        if (helpMsg.length >= characterLimit) {
            message.author.send(helpMsg,{split:[maxLength = characterLimit, char = '\n']});
        }else{
            message.author.send(helpMsg);
        }
    });
    return;

}
module.exports.config = {
    name: ["help","commands","info"],
    args:"",
    group:"Info",
    description: "Get a avaiable command list!",
    enabled: true,
    avaiable_on_other_categories: false    
}   
