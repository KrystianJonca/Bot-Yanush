const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args) => {
    let toSay = args.join(' ');

    if (!toSay) return React.sendReact(false,message,"Musisz mi podać wiadomość do powiedzenia!","reply");

    React.sendReact(true,message,toSay,"send");
    return;
}
module.exports.config = {
    name: ["say"],
    args:"<tekst do powiedzenia>",
    description: "Każ mi wysłać twoją wiadomość"
}   