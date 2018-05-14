const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args,prefix) => {
    let msg = await message.channel.send("Ładowanie awataru...");

    await message.channel.send({files: [
        {
            attachment: message.author.displayAvatarURL,
            name: "avatar.png"
        }
    ]})

    React.sendReact(true,message);
    
    msg.delete();
    return;

}
module.exports.config = {
    name: ["avatar"],
    args:"",
    description: "Zobacz swój awatar!"
}