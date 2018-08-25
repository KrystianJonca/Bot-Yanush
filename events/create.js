const Guild = require('../models/guild');
const getGuild = require('../getGuild');

module.exports = async (guild, db) => {
  let Guild = await getGuild(guild.id, db);

  if(Guild) return;

  const server = new Guild({
    serverID: '441574101392424963',
  });

  server.save();

  console.log(`Joined a new guild: ${guild.name}(id: ${guild.id}). This guild has ${guild.memberCount} members!`);
};
