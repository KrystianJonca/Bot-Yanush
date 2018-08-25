const Discord = require('discord.js');
const mongoose = require('mongoose');
const mysql = require('mysql');

const Commands = require('./commands.js');

const bot = new Discord.Client();

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'yanush'
});

const ready = require('./events/ready.js');
const msg = require('./events/message.js');
const automod = require('./events/automod.js');
const create = require('./events/create.js');
const remove = require('./events/remove.js');

const Guild = require('./models/guild');

const url = 'mongodb://localhost:27017/yanush';
const opts = {
  useNewUrlParser: true
};
mongoose.connect(url,opts);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', error => {
  console.log(`Connection error: ${error}`);
});
db.once('open', () => {
  console.log('Connected to database!');
});

// const server = new Guild({
//   serverID:'441574101392424963',
//   notifications:[{
//     channelID:'441574101392424965',
//     username:'ewroon',
//     message:'Hi @everyone, {{ streamer }} is now live on {{ link }}. Go check it out!'
//   }]
// })
// server.save();
bot.warns = require('./database/warnings.json');
bot.mutes = require('./database/mutes.json');
bot.queues = require('./database/queues.json');

bot.commands = new Discord.Collection();
bot.customCommands = new Discord.Collection();


new Commands(bot,db);

bot.on('ready', async () => {
  ready(bot, db);
});

bot.on('message', async message => {
  //msg(bot, message, db);
});
//automod section
bot.on('message', async message => {
  automod(bot, message, db);
});
bot.on('guildCreate', guild => {
  create(guild, db);
});
bot.on('guildDelete', guild => {
  remove(guild, db);
});

bot.on('error', err => {
  console.error(err);
});
bot.on('debug', info => {
  console.log(info);
});
bot.on('disconnect', event => {
  console.log(event);
});
bot.on('reconnecting', () => {
  console.log('Reconnecting');
});

//bot.login(process.env.BOT_TOKEN);

bot.login('NDQ0OTIzMzUwOTM1MDExMzI4.Ddi_Vw.sizdzelOxKZhDFxrmhNMfySDxVo');
