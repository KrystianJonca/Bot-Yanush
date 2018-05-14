const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args) => {
    let roll = Math.floor(Math.random()*6)+1;

    React.sendReact(true,message,`Wylosowałeś ${roll}`,"reply");

    return;
}
module.exports.config = {
    name: ["roll","dice"],
    args:"",
    description: "Wylosój randomową liczbę od 0 do 6!"
}