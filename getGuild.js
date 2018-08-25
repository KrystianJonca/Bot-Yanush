module.exports = async (guildID, db) => {
  return new Promise((resolve,reject) => {
    if(guildID){
      db.collection('guilds').findOne({ serverID: guildID },(err,data) => {
        if(err) reject(err);
        resolve(data);
      });
    }else{
      db.collection('guilds').find({},(err,data) => {
        if(err) reject(err);
        resolve(data);
      });
    }
  });
}