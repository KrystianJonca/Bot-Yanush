const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args) => {
    let loveUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let lovingUser = message.author;
    let lovePercent = Math.floor(Math.random() * 100) + 1; 

    if (!loveUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (loveUser.id === bot.user.id) return React.sendReact(true,message,"100000000000% :heart: :heart: :heart: ","reply");
    if (loveUser.id === lovingUser.id) return React.sendReact(false,message,"ReferenceError: lovePercent is not defined :thinking: :thinking: ","send");

    React.sendReact(true,message,`${lovingUser} i ${loveUser} kochają się na ${lovePercent}% :heart:`,"send");
    return;
}
module.exports.config = {
    name: ["love"],
    args:"@oznaczenie",
    description: "Sprawdź na ile % kochasz drugą osobę"
}   
