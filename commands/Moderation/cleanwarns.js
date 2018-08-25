const Discord = require('discord.js');
const React = require('../../modules/reacting.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, prefix, db, logChannel) => {
  if (!message.member.hasPermission('KICK_MEMBERS'))
    return React.sendReact(
      false,
      message,
      "You don't have require permission!",
      'reply'
    );
  let cleanUser = message.guild.member(
    message.mentions.users.first() || message.mentions.users.get(args[0])
  );
  let reason = args.join(' ').slice(22);

  if (!cleanUser)
    return React.sendReact(
      false,
      message,
      'You did not specify a user mention or ID!',
      'reply'
    );
  if (!cleanUser.kickable)
    return React.sendReact(
      false,
      message,
      "That person can't be cleared! (Do they have a higher role? Do I have require permissions?)",
      'reply'
    );
  if (!reason)
    return React.sendReact(false, message, 'You must give a reason!', 'reply');

  bot.warns[cleanUser.id].warnings = 0;

  fs.writeFile('./database/warnings.json', JSON.stringify(bot.warns), err => {
    if (err) throw err;
  });
  if (logChannel) {
    let embed = new Discord.RichEmbed()
      .setAuthor('Clean warns')
      .setDescription("Clean user's warns")
      .setColor('#4CAF50')
      .setThumbnail(cleanUser.user.displayAvatarURL)

      .addField('Cleaned User', `${cleanUser} with ID ${cleanUser.id}`)
      .addField('Cleaned By', `${message.author} with ID ${message.author.id}`)
      .addField('Reason', reason)
      .addField('Cleaned at', message.createdAt)
      .addField('Channel', message.channel);

    let logChannel = bot.channels.get(logChannel);
    logChannel.send(embed);
  }

  React.sendReact(
    true,
    message,
    `Warns cleared for ${cleanUser.user.username}`,
    'send'
  );
};
module.exports.config = {
  name: ['cleanwarns'],
  args: '@user <reason>',
  description: "Clean user's warns"
};
