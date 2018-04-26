const Discord = require('discord.js');
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args) => {
    let messageToDelete = args[0];

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (!messageToDelete) return React.sendReact(false,message,"You must enter the number of messages to delete!","reply");
    try{
        message.channel.bulkDelete(messageToDelete).then(()=>{
            message.channel.send(`Cleared ${messageToDelete} messages`).then((msg => msg.delete(5000)))
        });
    }catch(err){
        console.error(err);
    }
    return;
}
module.exports.config = {
    name: ["clear"],
    args:"<how much message to clear>",
    description: "Clear message!"
}