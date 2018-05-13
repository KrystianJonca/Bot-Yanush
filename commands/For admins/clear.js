const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const messageToDeleteLimit = 100;

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"You don't have require permission!","reply");    
    let messagesToDelete = args[0];

    if (!messageToDelete || isNaN(messagesToDelete)) return React.sendReact(false,message,"You must enter the number of messages to delete!","reply");
    if (messagesToDelete > 100) return React.sendReact(false,message,`Number of messages to delete must be less or equal to ${messageToDeleteLimit}!`,"reply");
    try{
        message.channel.bulkDelete(messagesToDelete).then(()=>{
            message.channel.send(`Cleared ${messagesToDelete} messages`).then((msg => msg.delete(5000)))
        });
    }catch(err){
        console.error(err);
    }
    return;
}
module.exports.config = {
    name: ["clear"],
    args:"<how much message to clear>",
    description: "Clear messages"
}