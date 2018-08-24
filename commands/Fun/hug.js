const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args,prefix,con) => {
    let hugUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let huggingUser = message.author;

    if (!hugUser) return React.sendReact(false,message,"You did not specify a user mention or ID!","reply");
    if (hugUser.id === bot.user.id) return React.sendReact(true,message,"Sweet! :heart_eyes: :heart_eyes:","reply");

    React.sendReact(true,message,`${huggingUser} hug ${hugUser} :heart_eyes: :heart: :heart_eyes: :heart:`,"reply");
}
module.exports.config = {
    name: ["hug"],
    args:"@user",
    description: "Hug a user!"
}   
