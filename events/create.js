module.exports = async (guild,con) => {
    con.query(`SELECT * FROM ai WHERE sid = '${guild.id}'`,(err,rows) => {
        if(err) throw err;

        let sql;

        if(rows.length < 1){
            sql = `INSERT INTO ai (sid) VALUES ('${guild.id}')`;
        }else return;
        con.query(sql);
    })
    con.query(`SELECT * FROM guilds WHERE sid = '${guild.id}'`,(err,rows) => {
        if(err) throw err;

        let sql;

        if(rows.length < 1){
            sql = `INSERT INTO guilds (sid) VALUES ('${guild.id}')`;
        }else return;
        con.query(sql);
    })
    console.log(`Joined a new guild: ${guild.name}(id: ${guild.id}). This guild has ${guild.memberCount} members!`);
}

function getDefaultChannelID (guild) {
    if(guild.channels.has(guild.id)) return guild.channels.get(guild.id).id;

    if(guild.channels.exists("name", "general")) return guild.channels.find("name", "general").id;

    return guild.channels
        .filter(c => c.type === "text" && c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
        .sort((a, b) => a.position - b.position || Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
        .first().id;
}
