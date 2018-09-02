const Discord = require('discord.js');
const fs = require('fs');
const getGuild = require('../getGuild');

module.exports = async (bot, message, db) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const Guild = await getGuild(message.guild.id, db);

  if (message.member.hasPermission('MANAGE_MESSAGES')) return;
  if (message.channel.id == Guild.ignoredChannels.join(' || ')) return;

  for (i in Guild.ignoredRoles){
    if (message.member.roles.has(Guild.ignoredRoles[i])) return;
  }


  if (Guild.links) {
    // Auto link detector
    if (/(https?:\/\/[^\s]+)/g.test(message.content)) {
      message.delete().then(message => {
        message
          .reply('Sorry, you cannot send links on this server')
          .then(msg => {
            msg.delete(5000);
          });
      });
    }
  }
  if (Guild.invites) {
    //Auto invites deleting
    if (/(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content)) {
      message.delete().then(message => {
        message
          .reply('Sorry, you cannot send invites on this server')
          .then(msg => {
            msg.delete(5000);
          });
      });
    }
  }
  if (Guild.caps) {
    //Auto writing with caps lock detector
    if (message.content === message.content.toUpperCase()) {
      message.delete();
      message.reply('Turn off caps!').then(msg => msg.delete(5000));
      return;
    }
  }
  if (Guild.spam) {
    //Auto spam mute
    let spamMsg = JSON.parse(fs.readFileSync('./database/spam.json', 'utf8'));

    if (!spamMsg[message.author.id])
      spamMsg[message.author.id] = {
        msg: 0
      };

    spamMsg[message.author.id].msg++;

    fs.writeFileSync('./database/spam.json', JSON.stringify(spamMsg), err => {
      if (err) console.error(err);
    });

    if (spamMsg[message.author.id].msg === 10) {
      try {
        message.channel.bulkDelete(10).then(() => {
          message.channel
            .send(`Cleared 10 messages sended by ${message.author}`)
            .then(msg => msg.delete(5000));
        });
      } catch (err) {
        throw err;
      }

      setTimeout(() => {
        fs.writeFile('./database/spam.json', '{}', err => {
          if (err) throw err;
        });
      }, 10000);
    }
  }
};
