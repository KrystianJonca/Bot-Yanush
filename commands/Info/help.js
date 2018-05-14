const fs = require('fs');
const characterLimit = 2000;
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    React.sendReact(true,message,"Włąśnie wysłałem ci listę dostępnych komend!","reply");

    let helpMsg = "Witam! Mam dla ciebie listę dostępnych komend o którą prosiłeś :slight_smile: :wink: \n";

    fs.readdir('./commands/',(err,folders) => {
        if (err) console.error(err);
                                                 
        folders.forEach(async (folder,index) => {           
            fs.readdir(`./commands/${folder}`,(err,files) => {
                if (err) console.error(err);
                
                helpMsg += `***Komendy ${folder}:*** \n`;
                
                let jsfiles = files.filter(f => f.split(".").pop() === "js");
                if (jsfiles.length <= 0) {
                    helpMsg = "Przepraszamy ale obecnie nie mamy żadnych komend :confused: ";
                    message.author.send(helpMsg);
                    return;
                }
                jsfiles.forEach((f,i) => {
                    let cmds = require(`../${folder}/${f}`);
            
                    helpMsg += `**${i+1}:** \`${prefix}${cmds.config.name} ${cmds.config.args}\` | **Opis:**  ${cmds.config.description} \n`;
                   
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
    description: "Lista dostępnych komend!" 
}   
