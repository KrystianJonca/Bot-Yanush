const Guild = require('./models/guild');

module.exports = async (guildID, db) => {
  if(guildID){
    return new Promise((resolve,reject) => {
        Guild.findOne({ serverID: guildID },(err,data) => {
          if(err) reject(err);
          resolve(data);
        });
    });
  }else{
    return new Promise((resolve,reject) => {
      Guild.find({},(err,data) => {
        if(err) reject(err);
        resolve(data);
      });
    });
  }
}