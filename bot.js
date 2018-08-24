const Discord = require('discord.js');
const mongoose = require('mongoose');
const mysql = require('mysql');

const Database = require('./database.js');
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

mongoose.connect('mongodb://localhost/yanush');

const db = mongoose.connection;

db.on('error', error => {
  console.log(`Connection error: ${error}`);
});
db.once('open', () => {
  console.log('Connected to database!');
});

const guild = new Guild({
  serverID: '441574101392424963',
  ignoredChannels: ['447031390945673216']
});

guild.save();


bot.warns = require('./database/warnings.json');
bot.mutes = require('./database/mutes.json');
bot.queues = require('./database/queues.json');

bot.commands = new Discord.Collection();

let Db = new Database(con);
let cmds = new Commands(bot);

bot.on('ready', () => {
  ready(bot, con);
});

bot.on('message', async message => {
  msg(bot, message, con);
});
//automod section
bot.on('message', async message => {
  automod(bot, message, con);
});
bot.on('guildCreate', guild => {
  create(guild, con);
});
bot.on('guildDelete', guild => {
  remove(con, guild);
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
