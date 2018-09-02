const getGuild = require('../getGuild');

module.exports = async (bot, member, db) => {
  const Guild = await getGuild(member.guild.id, db);

  if(!Guild.leave) return;

  if(Guild.leave.enabled){
    let channel = bot.channels.get(Guild.leave.channelID);
    let msg = Guild.leave.message
      .replace('{{ user }}', member.user.username)
      .replace('{{ server }}', member.guild.name);

    channel.send(msg);
  }
};
