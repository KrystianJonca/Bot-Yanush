const Discord = require('discord.js');
const React = require('../../modules/reacting.js');

module.exports.run = async (bot, message, args, prefix, Guild) => {
  let target =
    message.mentions.users.first() ||
    message.guild.members.get(args[0]) ||
    message.author;

  const targetXPObject = Guild.usersXP.find(
    element => element.userID == target.id
  );
  if (!targetXPObject) React.sendReact(false, message, 'User has no XP', 'send');

  let xp = targetXPObject.xp;
  let lvl = targetXPObject.lvl;

  let rank = Guild.usersXP.findIndex(
    element => element.userID == target.id
  )+1;
  let rankLength = Guild.usersXP.length;

  let embed = new Discord.RichEmbed()
    .setAuthor(`${target.username} XP and LVL`)
    .setThumbnail(target.displayAvatarURL)
    .setColor('#039BE5')

    .addField('Rank', `${rank}/${rankLength}`)
    .addField('XP', `${xp}/${lvl * 200}(to next lvl)`)
    .addField('LVL', `${lvl}`);

  React.sendReact(true, message, embed, 'send');
  return;
};
module.exports.config = {
  name: ['xp'],
  args: '@user (optional)',
  description: 'Get user XP and LVL!'
};
