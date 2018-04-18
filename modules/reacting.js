const reactEmotes = require('../config/react-emotes.json');

module.exports.sendReact = (react,message,content,type) => {
        message.react(react ? reactEmotes.command_execution : reactEmotes.command_not_execution);
        if (!type) return;
        ((type === "reply") ? message.reply(content) : message.channel.send(content));

}