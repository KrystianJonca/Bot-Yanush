const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema({
  serverID: String,
  // General
  prefix: { type:String, default: 'Y!' },
  logChannelID: { type:String, default: null },
  commandsCooldown: { type: Number, default:5 },
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
  // Custom Join/DM/Leave Messages or Role give
  join: {
    channelID: String,
    message: String,
    enabled: Boolean
  },
  dm: {
    message: String,
    enabled: Boolean
  },
  leave: {
    channelID: String,
    message: String,
    enabled: Boolean
  },
  role: {
    roleID: String,
    enabled: Boolean
  },
  // Twitch notifications
  notifications:[
    {
      channelID: String,
      username: String,
      message: String,
      enabled: Boolean
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
  // Custom commands
  commands:[
    {
      name: String,
      message: String,
      description: String,
      reply: Boolean,
      enabled: Boolean
    }
  ]
});

const guild = mongoose.model('guilds', guildSchema);

module.exports = guild;