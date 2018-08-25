const React = require('../../modules/reacting.js');

module.exports.run = async (bot, message, args, prefix, db) => {
  let question = args.join(' ');

  if (!question)
    return React.sendReact(
      false,
      message,
      'You did not ask me a question!',
      'reply'
    );
  if (question[question.length - 1] != '?')
    return React.sendReact(false, message, 'This is not a question!', 'reply');

  let answersArray = ['Yes', 'No', "I don't know", 'Ask me later'];

  let randomAnswer = Math.floor(Math.random() * answersArray.length);

  return React.sendReact(true, message, answersArray[randomAnswer], 'reply');
};
module.exports.config = {
  name: ['question', '8ball'],
  args: '<question content>',
  description: 'Ask me a question'
};
