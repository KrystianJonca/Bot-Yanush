const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require('../../modules/reacting.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, prefix, db, logChannel) => {
  if (!message.member.hasPermission('ADMINISTRATOR'))
    return React.sendReact(
      false,
      message,
      "You don't have require permission!",
      'reply'
    );

  let muteUser = message.guild.member(
    message.mentions.users.first() || message.mentions.users.get(args[0])
  );
  let role = message.guild.roles.find(r => r.name === 'Muted');
  let muteTime = args[1];
  let reason = args
    .join(' ')
    .slice(isNaN(muteTime) ? 22 : 22 + muteTime.length);
  if (isNaN(muteTime)) muteTime = 0;

  if (!muteUser)
    return React.sendReact(
      false,
      message,
      'You did not specify a user mention or ID!',
      'reply'
    );
  if (!muteUser.kickable)
    return React.sendReact(
      false,
      message,
      "That person can't be muted! (Do they have a higher role? Do I have require permissions?)",
      'reply'
    );
  if (!reason)
    return React.sendReact(false, message, 'You must give a reason!', 'reply');

  try {
    if (!role) {
      role = await message.guild.createRole({
        name: 'Muted',
        color: '#000000',
        permission: []
      });

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }
  } catch (e) {
    console.error(error.stack);
  }

  if (muteUser.roles.has(role.id))
    return React.sendReact(
      false,
      message,
      'This user is already muted!',
      'reply'
    );

  if (muteTime !== 0) {
    bot.mutes[muteUser.id] = {
      guild: message.guild.id,
      time: Date.now() + parseInt(muteTime) * 60000
    };
    fs.writeFile(
      './database/mutes.json',
      JSON.stringify(bot.mutes, null, 4),
      err => {
        if (err) throw err;
      }
    );
  }

  await muteUser.addRole(role).catch(error => {
    return React.sendReact(
      false,
      message,
      `Couldn't mute user because of: ${error}`,
      'reply'
    );
  });
  if (logChannel) {
    let embed = new Discord.RichEmbed()
      .setAuthor('Mute')
      .setDescription('Mute a user')
      .setColor('#ff0000')
      .setThumbnail(muteUser.user.displayAvatarURL)

      .addField('Muted User', `${muteUser} with ID ${muteUser.id}`)
      .addField('Muted By', `${message.author} with ID ${message.author.id}`)
      .addField('Reason', reason)
      .addField(
        'Mute time',
        `${muteTime == 0 ? 'An indefinite period of time' : muteTime + 'min'}`
      )
      .addField('Muted at', message.createdAt)
      .addField('Channel', message.channel);
    let logChannel = bot.channels.get(logChannel);
    logChannel.send(embed);
  }

  React.sendReact(
    true,
    message,
    `${muteUser.user.username} has been muted because *${reason}*`,
    'reply'
  );
};
module.exports.config = {
  name: ['mute'],
  args: '@user <mute time in min (optional)> <reason>',
  description: 'Mute a user(permission require)'
};
