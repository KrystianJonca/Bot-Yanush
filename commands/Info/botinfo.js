const Discord = require('discord.js');
const React = require('../../modules/reacting.js');

module.exports.run = async (bot, message, args, prefix, Guild) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(bot.user.username)
    .setDescription('About me!')
    .setColor('#22A7F0')
    .setThumbnail(bot.user.displayAvatarURL)

    .addField('My username', `${bot.user.username} #${bot.user.discriminator}`)
    .addField('My ID', bot.user.id)
    .addField('I play with', `${bot.users.size} users!`)
    .addField('I am', `at ${bot.guilds.size} servers`)
    .addField('I worked', `for ${(bot.uptime / 3600000).toFixed(2)} h`)
    .addField('I came alive at', bot.user.createdAt);

  React.sendReact(true, message, embed, 'send');
  return;
};
module.exports.config = {
  name: ['botinfo'],
  args: '',
  description: 'A few facts about me!'
};
