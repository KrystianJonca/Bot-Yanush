const mysql = require("mysql");
const otherSettings = require("./config/other-settings.json");

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "yanush"
// });

module.exports = class Database {
  constructor(con) {
    return new Promise((resolve, reject) => {
      this.con = con;
      this.con.connect(err => {
        if (err) reject(err);
        console.log("Connected to database!");
      });
    });
  }
  static getPlugins(message, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM plugins WHERE sid = '${message.guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO plugins (sid) VALUES ('${message.author.id}','${
              message.guild.id
            }',${generateXp()},1)`;
            con.query(sql);
          }
          let plugins = rows[0];

          resolve(plugins);
        }
      );
    });
  }
  static getPrefix(message, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM guilds WHERE sid = '${message.guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO guilds (sid) VALUES ('${message.author.id}','${
              message.guild.id
            }',${generateXp()},1)`;
            con.query(sql);
          }

          let prefix = rows[0].prefix;

          resolve(prefix);
        }
      );
    });
  }

  static getCCD(message, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM guilds WHERE sid = '${message.guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO guilds (sid) VALUES ('${message.author.id}','${
              message.guild.id
            }',${generateXp()},1)`;
            con.query(sql);
          }

          let ccd = rows[0].ccd;

          resolve(ccd);
        }
      );
    });
  }
  static getXPCD(message, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM guilds WHERE sid = '${message.guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO guilds (sid) VALUES ('${message.author.id}','${
              message.guild.id
            }',${generateXp()},1)`;
            con.query(sql);
          }
          let xpcd = rows[0].xpcd;

          resolve(xpcd);
        }
      );
    });
  }
  static getAI(message, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM ai WHERE sid = '${message.guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO ai (sid) VALUES ('${message.author.id}','${
              message.guild.id
            }',${generateXp()},1)`;
            con.query(sql);
          }

          let ai = rows[0];

          resolve(ai);
        }
      );
    });
  }
  static getLogChannel(guild, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM guilds WHERE sid = '${guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO guilds (sid) VALUES ('${guild.id}'`;

            con.query(sql);
          }
          let logChannel = rows[0].lchid;

          resolve(logChannel);
        }
      );
    });
  }
  static getIgnoredChannels(guild, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM ignoredChannels WHERE sid = '${guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO ignoredChannels (sid) VALUES ('${message.author.id}','${
              message.guild.id
            }',${generateXp()},1)`;
            con.query(sql);
          }
          let ignoredChannels = rows[0].ichid;

          resolve(ignoredChannels);
        }
      );
    });
  }
  static getIgnoredRoles(guild, db) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM ignoredRoles WHERE sid = '${guild.id}'`,
        async (err, rows) => {
          if (err) reject(err);

          if (rows.length < 1) {
            sql = `INSERT INTO ignoredRoles (sid) VALUES ('${message.author.id}','${
              message.guild.id
            }',${generateXp()},1)`;
            con.query(sql);
          }
          let ignoredRoles = rows[0].irid;

          resolve(ignoredRoles);
        }
      );
    });
  }
  static addXP(message, db) {
    con.query(
      `SELECT * FROM xp WHERE uid = '${message.author.id}' AND sid = '${
        message.guild.id
      }'`,
      (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length < 1) {
          sql = `INSERT INTO xp (uid,sid,xp,lvl) VALUES ('${
            message.author.id
          }','${message.guild.id}',${generateXp()},1)`;
        } else {
          let xp = rows[0].xp;
          let lvl = rows[0].lvl;
          let gXp = generateXp();

          if (xp + gXp >= lvl * 200) {
            message
              .reply(`You just advanced to level ${lvl + 1}!`)
              .then(msg => {
                msg.delete(10000);
              });
          }

          sql = `UPDATE xp SET xp = ${xp + gXp}, lvl = ${
            xp + gXp >= lvl * 200 ? lvl + 1 : lvl
          } WHERE uid = '${message.author.id}' AND sid = '${message.guild.id}'`;
        }
        return con.query(sql);
      }
    );
  }
  static removeXP(uID, sID, db) {
    con.query(
      `SELECT * FROM xp WHERE uid = '${uID}' AND sid = '${sID}'`,
      (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length < 1) {
          return;
        } else {
          sql = `UPDATE xp SET xp = 0, lvl = 0 WHERE uid = '${uID}' AND sid = '${sID}'`;
        }

        return con.query(sql);
      }
    );
  }
};

function generateXp() {
  let min = otherSettings.min_xp;
  let max = otherSettings.max_xp;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
