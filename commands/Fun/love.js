const React = require('../../modules/reacting.js');

module.exports.run = async (bot, message, args, prefix, db) => {
  let loveUser = message.guild.member(
    message.mentions.users.first() || message.mentions.users.get(args[0])
  );
  let lovingUser = message.author;
  let lovePercent = Math.floor(Math.random() * 100) + 1;

  if (!loveUser)
    return React.sendReact(
      false,
      message,
      'You did not specify a user mention or ID!',
      'reply'
    );
  if (loveUser.id === bot.user.id)
    return React.sendReact(
      true,
      message,
      '100000000000% :heart: :heart: :heart: :kissing_heart: ',
      'reply'
    );
  if (loveUser.id === lovingUser.id)
    return React.sendReact(
      false,
      message,
      'ReferenceError: lovePercent is not defined :thinking: :thinking: ',
      'send'
    );

  React.sendReact(
    true,
    message,
    `${lovingUser} and ${loveUser} love each other at ${lovePercent}% :heart:`,
    'send'
  );
  return;
};
module.exports.config = {
  name: ['love'],
  args: '@user',
  description: 'Check how much you love the other person'
};
