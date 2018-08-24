module.exports = async (con,guild) => {
    // con.query(`DELETE FROM ai WHERE sid = '${guild.id}'`);
    // con.query(`DELETE FROM channels WHERE sid = '${guild.id}'`);
    // con.query(`DELETE FROM guilds WHERE sid = '${guild.id}'`);
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
}