const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const botSettings = require('../config/bot-settings.json');
const getGuild = require('../getGuild');

const CLIENT_ID = 'h9py7otma771wm51qvbvd8xnaiiv87'; //process.env.CLIENT_ID

module.exports = async (bot, db) => {
  bot.user.setUsername(botSettings.bot_username);

  let interval = 1800000;
  let activityArray = [
    `with ${bot.users.size} users!`,
    `on ${bot.guilds.size} servers`,
    `on ${bot.channels.size} channels`,
    `for ${(bot.uptime / 3600000).toFixed(2)} h!`,
    `with ${bot.ping} ping!`
  ];

  let activityNumber = Math.floor(Math.random() * activityArray.length);

  bot.user.setStatus('Online');
  bot.user.setActivity(activityArray[activityNumber]);

  setInterval(() => {
    activityArray = [
      `with ${bot.users.size} users!`,
      `on ${bot.guilds.size} servers`,
      `on ${bot.channels.size} channels`,
      `for ${(bot.uptime / 3600000).toFixed(2)} h!`,
      `with ${bot.ping.toFixed(0)} ping!`
    ];

    activityNumber = Math.floor(Math.random() * activityArray.length);

    bot.user.setActivity(activityArray[activityNumber]);
  }, interval);

  console.log('Bot is ready to use!');

  bot.setInterval(async () => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      let member = guild.members.get(i);

      const Guild = await getGuild(guildId, db);

      let role = guild.roles.find(r => r.name === 'Muted');
      if (!role) continue;

      let logChannel = bot.channels.get(Guild.logChannelID);

      if (Date.now() > time) {
        member.removeRole(role);
        delete bot.mutes[i];

        fs.writeFile(
          '../database/mutes.json',
          JSON.stringify(bot.mutes),
          err => {
            if (err) throw err;
          }
        );
        if (logChannel) {
          let embed = new Discord.RichEmbed()
            .setAuthor('Mute time passed')
            .setDescription('Auto unmute')
            .setColor('#4CAF50')

            .addField('Unmuted User', `${member} with ID ${member.id}`);

          logChannel.send(embed);
        }
      }
    }
  }, 60000); // 1 min


  bot.setInterval(async () => {
    const Guilds = await getGuild(null, db);

    for (i in Guilds) {
      const notifications = Guilds[i].notifications;

      for (i in notifications) {
        if(!notifications[i].enabled) continue;
        let username = notifications[i].username;

        const streamRes = await fetch(
          `https://api.twitch.tv/kraken/streams/${username}`,
          {
            method: 'GET',
            headers: {
              'Client-ID': CLIENT_ID
            }
          }
        );
        const stream = await streamRes.json();

        if (!stream.stream) continue;
        if (new Date() - new Date(stream.stream.created_at) > 310000) continue;

        let channelId = notifications[i].channelID;
        let channel = bot.channels.get(channelId);

        let message = notifications[i].message;

        let msg = message
          .replace('{{ streamer }}', stream.stream.channel.display_name)
          .replace('{{ link }}', `https://www.twitch.tv/${username}`);

        let embed = new Discord.RichEmbed()
          .setAuthor(
            stream.stream.channel.display_name,
            stream.stream.channel.logo
          )
          .setTitle(stream.stream.channel.status)
          .setImage(stream.stream.preview.medium)
          .setTimestamp()
          .setURL(`https://www.twitch.tv/${username}`)
          .setColor('#EA80FC')

          .addField('Game', stream.stream.game)
          .addField('Viewers', stream.stream.viewers);

        channel.send(msg, embed);
      }
    }
  }, 300000); // 5 min300000
};
