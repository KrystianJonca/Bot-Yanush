const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args,prefix,con) => {
    let roll = Math.floor(Math.random()*6)+1;

    React.sendReact(true,message,`You rolled a ${roll}`,"reply");

    return;
}
module.exports.config = {
    name: ["roll","dice"],
    args:"",
    description: "Roll a random number between 0-6!"
}