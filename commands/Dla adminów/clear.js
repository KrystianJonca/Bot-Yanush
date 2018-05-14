const Discord = require('discord.js');
const React = require("../../modules/reacting.js");
const messageToDeleteLimit = 100;

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");    
    let messagesToDelete = args[0];

    if (!messageToDelete || isNaN(messagesToDelete)) return React.sendReact(false,message,"Musisz wprowadzić liczbę wiadomości do usunięcia!","reply");
    if (messagesToDelete > 100) return React.sendReact(false,message,`Liczba wiadomości musi być mniejsza lub równa ${messageToDeleteLimit}!`,"reply");
    try{
        message.channel.bulkDelete(messagesToDelete).then(()=>{
            message.channel.send(`Wyczyszczono ${messagesToDelete} wiadomości`).then((msg => msg.delete(5000)))
        });
    }catch(err){
        console.error(err);
    }
    return;
}
module.exports.config = {
    name: ["clear"],
    args:"<liczba wiadomości do wyczyszczenia>",
    description: "Wyczyść wiadomości"
}