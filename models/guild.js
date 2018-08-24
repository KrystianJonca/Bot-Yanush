const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema({
  serverID: String,
  // General
  prefix: { type:String, default: 'Y!' },
  logChannelID: { type:String, default: null },
  commandCooldown: { type: Number, default:5 },
  xpCooldown: { type: Number, default:60 },
  // Automod
  caps: { type:Boolean, default: false },
  invites: { type:Boolean, default: true },
  links: { type:Boolean, default: false },
  spam: { type:Boolean, default: false },
  ignoredChannels:[ String ],
  ignoredRoles:[ String ],
  // Plugins
  fun: { type:Boolean, default: true },
  info: { type:Boolean, default: true },
  moderation: { type:Boolean, default: true },
  useful: { type:Boolean, default: true },
  music: { type:Boolean, default: true },
  xp: { type:Boolean, default: true },
  // Twitch notifications
  channelID: { type:String, default: null },
  notifications:[
    {
      username: String,
      message: String
    }
  ],
  // XP System
  usersXP:[
    {
      userID: String,
      xp: Number,
      lvl: { type:Number, default: 1 }
    }
  ],
  // Custom commants
  commants:[
    {
      name: [ String ],
      message: String
    }
  ]
});

const guild = mongoose.model('guilds', guildSchema);

module.exports = guild;