const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const messageToDeleteLimit = 100;

module.exports.run = async (bot,message,args,prefix) => {
    let messageToDelete = args[0];

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"You don't have require permission!","reply");
    if (!messageToDelete) return React.sendReact(false,message,"You must enter the number of messages to delete!","reply");
    if (messageToDelete > 100) return React.sendReact(false,message,`Number of messages to delete must be less or equal to ${messageToDeleteLimit}!`,"reply");
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
    description: "Clear messages"
}