module.exports.run = async (bot,message,args) => {
    let roll = Math.floor(Math.random()*6)+1;
    message.reply(`You rolled a ${roll}`);
    return;

}
module.exports.config = {
    name: ["roll","dice"],
    args:"",
    description: "Roll a random number between 0-6!"
}