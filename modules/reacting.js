const reactEmotes = require('../config/react-emotes.json');

module.exports.sendReact = (react, message, dbtent, type, time) => {
  message.react(
    react ? reactEmotes.command_execution : reactEmotes.command_not_execution
  );
  if (!type) return;
  let msgs =
    type === 'reply' ? message.reply(content) : message.channel.send(content);
  if (!time) return;
  msgs.then(msg => {
    msg.delete(time);
  });
  return;
};
