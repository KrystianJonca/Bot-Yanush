const Database = require("../database.js");
const React = require("../modules/reacting.js");

module.exports = async (bot,message,con) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let sender = message.author;
    let content = message.content;
    let contentArray = content.split(" ");
    let command = contentArray[0];
    let args = contentArray.slice(1);

    let plugins = await Database.getPlugins(message,con);
    let cooldownSec = await Database.getCCD(message,con);
    let xpCooldownSec = await Database.getXPCD(message,con);
    
    const cooldown = new Set();
    const xpCooldown = new Set();

    if(plugins.xp){
        if (!xpCooldown.has(sender.id)) {
            Database.addXP(message,con);
        }
        xpCooldown.add(sender.id);
    }

    let prefix = await Database.getPrefix(message,con);
    let logChannel = await Database.getLogChannel(message.guild,con);

    let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());
    let plugin = eval(`plugins.${cmd.config.group.toLowerCase()}`);
    if (!command.startsWith(prefix)) return;

    if (args[0] === "--info") {
        Commands.commandInfo(command,message,prefix);
        return;
    }

    if (cooldown.has(sender.id)) {
        React.sendReact(false,message,`You have to wait ${cooldownSec} seconds between commands`,'reply',5000);
        return;
    }

    if (cmd && plugin){
        cmd.run(bot,message,args,prefix,con,logChannel);
        cooldown.add(sender.id);
    }else{
        message.delete();
        message.reply(`Your massage was deleted because this command does not exist! Type \`${prefix}help\` to get the avaiable command list!`).then(msg => {msg.delete(5000)});
        return;
    }

    let timer = [2];

    timer[0] = setTimeout(() =>{
        clearTimeout(timer);
        cooldown.delete(sender.id);
    },cooldownSec*1000)
    timer[1] = setTimeout(() =>{
        clearTimeout(timer);
        xpCooldown.delete(sender.id);
    },xpCooldownSec*1000)
}
