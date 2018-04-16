const roles = require('../config/roles.json');
const characterLimit = 2000;

module.exports.run = async (bot,message,args) => {
    let msg = "Here is the avaiable roles list:\n";

    let roles = roles.roles;

    message.reply("I have just sent you a message with available commands!");

    for (let index = 0; index < roles.length; index++) {
        msg += `${index+1}. ${roles[index]} \n`;
        
    }
    if (roles.length >= characterLimit) {
        message.author.send(msg,{split:[maxLength = characterLimit, char = '\n']});
    }else{
        message.author.send(msg);
    }
    
    return;

}
module.exports.config = {
    name: ["roles"],
    args:"",
    group:"Roles",
    description: "Avaiable roles list",
    enabled: true,
    avaiable_on_other_categories: true    
}