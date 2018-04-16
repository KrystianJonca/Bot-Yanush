const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
    let messageToDelete = args[0];

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have require permission!");
    if(!messageToDelete) return message.send("You must enter the number of messages to delete!");
    try{
        message.channel.bulkDelete(messageToDelete).then(()=>{
            message.channel.send(`Cleared ${messageToDelete} messages`).then((msg => msg.delete(5000)))
        });
    }catch(err){
        console.error(err);
        message.channel.send("Sorry, somethink went wrong I can't delete messages")
    }
    return;
}
module.exports.config = {
    name: ["clear"],
    args:"(how much message to clear)",
    group:"Random",
    description: "Clear message!",
    enabled: true,
    avaiable_on_other_categories: false
}