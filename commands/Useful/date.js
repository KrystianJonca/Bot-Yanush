const dateTime = require('node-datetime');
const React = require('../../modules/reacting.js');

module.exports.run = async (bot, message, args, prefix, db) => {
  let dt = dateTime.create();
  let time = dt.format('d-m-Y H:M:S');

  React.sendReact(true, message, time, 'reply');
  return;
};
module.exports.config = {
  name: ['date', 'time'],
  args: '',
  description: 'Get a current date!'
};
