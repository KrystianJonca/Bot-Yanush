const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args) => {
    let toSay = args.join(' ');

    if (!toSay) return React.sendReact(false,message,"You must give me a message to say!","reply");

    React.sendReact(true,message,toSay,"send");
    return;
}
module.exports.config = {
    name: ["say"],
    args:"<text to say>",
    description: "Give me message to say"
}   