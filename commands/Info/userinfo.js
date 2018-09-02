const Discord = require('discord.js');
const React = require('../../modules/reacting.js');

module.exports.run = async (bot, message, args, prefix, Guild) => {
  let target =
    message.mentions.users.first() ||
    message.guild.members.get(args[0]) ||
    message.author;

  let embed = new Discord.RichEmbed()
    .setAuthor(target.username)
    .setDescription("User's info")
    .setColor('#22A7F0')
    .setThumbnail(target.displayAvatarURL)

    .addField('Full Username', `${target.username} #${target.discriminator}`)
    .addField('ID', target.id)
    .addField('Created at', target.createdAt);

  return React.sendReact(true, message, embed, 'send');
};
module.exports.config = {
  name: ['userinfo'],
  args: '@user (optional)',
  description: 'User info!'
};
