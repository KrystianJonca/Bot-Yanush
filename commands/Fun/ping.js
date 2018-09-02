const React = require('../../modules/reacting.js');

module.exports.run = async (bot, message, args, prefix, Guild) => {
  React.sendReact(true, message, 'Pong!', 'reply');
  return;
};
module.exports.config = {
  name: ['ping'],
  args: '',
  description: 'Get a current ping( ͡° ͜ʖ ͡°)!'
};
