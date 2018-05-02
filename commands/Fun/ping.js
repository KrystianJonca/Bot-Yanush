module.exports.run = async (bot,message,args) => {
    message.reply("Pong!");
    return;

}
module.exports.config = {
    name: ["ping"],
    args:"",
    description: "Get a current ping( ͡° ͜ʖ ͡°)!"

}   
