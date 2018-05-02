module.exports.run = async (bot,message,args) => {
    let hugUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let huggingUser = message.author;

    if (hugUser.id === bot.user.id) return message.channel.send("Sweet! :heart_eyes: :heart_eyes: ");
    if (!hugUser) return message.channel.send("You did not specify a user mention or ID!");

    message.channel.send(`${huggingUser} hug ${hugUser} :heart_eyes: :heart: :heart_eyes: :heart:`)
}
module.exports.config = {
    name: ["hug"],
    args:"@user",
    description: "Hug a user!"
}   
