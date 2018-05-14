const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args) => {
    let hugUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let huggingUser = message.author;

    if (!hugUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (hugUser.id === bot.user.id) return React.sendReact(true,message,":) :heart:","reply");

    React.sendReact(true,message,`${huggingUser} przytulił ${hugUser} :heart:`,"reply");
}
module.exports.config = {
    name: ["hug"],
    args:"@oznaczenie",
    description: "Przytul urzytkownika!"
}   
