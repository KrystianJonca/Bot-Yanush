const getGuild = require('../getGuild');

module.exports = async (bot, member, db) => {
  const Guild = await getGuild(member.guild.id, db);

  if(!Guild.join || !Guild.dm || !Guild.role) return;

  if(Guild.join.enabled){
    let channel = bot.channels.get(Guild.join.channelID);
    let msg = Guild.join.message
      .replace('{{ user }}', member.user.username)
      .replace('{{ server }}', member.guild.name);

    channel.send(msg);
  }
  if(Guild.dm.enabled){
    let msg = Guild.dm.message
      .replace('{{ user }}', member.user.username)
      .replace('{{ server }}', member.guild.name);

    member.send(msg);
  }
  if(Guild.role.enabled){
    member.addRole(`${Guild.role.roleID}`).catch(console.error);
  }
};
