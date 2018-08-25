module.exports = async (guild, db) => {
  db.collection('guilds').deleteOne({ serverID: guildID },(err) => {
    if(err) throw err;
  });
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
}