// const Database = require('../database.js');
const React = require('../modules/reacting.js');
const getGuild = require('../getGuild');
const otherSettings = require("../config/other-settings.json");

module.exports = async (bot, message, db) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  let sender = message.author;
  let content = message.content;
  let contentArray = content.split(' ');
  let command = contentArray[0];
  let args = contentArray.slice(1);

  const Guild = await getGuild(message.guild.id,db);

  const cooldownSec = Guild.commantsCooldown;
  const xpCooldownSec = Guild.xpCooldown;

  const cooldown = new Set();
  const xpCooldown = new Set();

  if (Guild.xp) {
    if (!xpCooldown.has(sender.id)) {
      addXP(message, db);
    }
    xpCooldown.add(sender.id);
  }

  let prefix = Guild.prefix;
  let logChannel = Guild.logChannelID;

  let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());
  let plugin = eval(`Guild.${cmd.config.group.toLowerCase()}`);
  if (!command.startsWith(prefix)) return;

  if (args[0] === '--info') {
    Commands.commandInfo(command, message, prefix);
    return;
  }

  if (cooldown.has(sender.id)) {
    React.sendReact(
      false,
      message,
      `You have to wait ${cooldownSec} seconds between commands`,
      'reply',
      5000
    );
    return;
  }

  if (cmd && plugin) {
    cmd.run(bot, message, args, prefix, db, logChannel);
    cooldown.add(sender.id);
  } else {
    message.delete();
    message
      .reply(
        `Your massage was deleted because this command does not exist! Type \`${prefix}help\` to get the avaiable command list!`
      )
      .then(msg => {
        msg.delete(5000);
      });
    return;
  }

  let timer = [2];

  timer[0] = setTimeout(() => {
    clearTimeout(timer);
    cooldown.delete(sender.id);
  }, cooldownSec * 1000);
  timer[1] = setTimeout(() => {
    clearTimeout(timer);
    xpCooldown.delete(sender.id);
  }, xpCooldownSec * 1000);
};

function addXP(message,db){
  const Guild = await getGuild(message.guild.id,db);

  const userXpObject = Guild.usersXP.filter(element => element.userID == message.author.id);

  const lvl = userXpObject.lvl;
  const newXP = userXpObject.xp + generateXp();

  if(newXP >= lvl * 200)
    message.reply(`You just advanced to level ${lvl + 1}!`).then(msg => msg.delete(10000));

  db.findOneAndUpdate({
    serverID: message.guild.id,
    'usersXP.userID': message.author.id
  },{
    'usersXP.$.xp': newXP,
    'usersXP.$.lvl': newXP >= lvl*200 ? lvl+1 : lvl
  })
}
function generateXp() {
  let min = otherSettings.min_xp;
  let max = otherSettings.max_xp;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}