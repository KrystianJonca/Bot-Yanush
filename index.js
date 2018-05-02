const Discord = require('discord.js');
const fs = require("fs");
const React = require("./modules/reacting.js");

const botSettings = require('./config/bot-settings.json');
const otherSettings = require('./config/other-settings.json');
const aiSettings = require('./config/ai-settings.json');
const activity = require('./config/activity.json');
const token = require('./config/token.json');

const bot = new Discord.Client();

const coolDownSec = otherSettings.commands_cooldown;
const coolDown = new Set();

bot.commands = new Discord.Collection();

fs.readdir('./commands/',(err,folders) =>{
    folders.forEach((folder,index) =>{
        fs.readdir(`./commands/${folder}`,(err,files) => {
            if (err) console.error(err);
            
            let jsfiles = files.filter(f => f.split(".").pop() === "js");
            if (jsfiles.length <= 0) {
                console.log("No commands to load!");
                return;
            }
            console.log(`Loading ${jsfiles.length} commands in ${folder} folder!`);

            jsfiles.forEach((f,i) => {
                let cmds = require(`./commands/${folder}/${f}`);
                console.log(`${i+1}: ${f} loaded!`);
                for (let i = 0; i < cmds.config.name.length; i++) {
                    bot.commands.set(cmds.config.name[i],cmds,cmds.config.args);
                }
                
            });
        });
    });
});

bot.on('ready',() =>{
    bot.user.setUsername(botSettings.bot_username);
    //bot.user.setAvatar(botSettings.avatar_location);

    randomActivity();
    console.log('Bot is ready to use!');
});
bot.on('message',async message =>{
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let sender = message.author;    
    let content = message.content;
    let contentArray = content.split(" ");
    let command = contentArray[0];
    let args = contentArray.slice(1);

    let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json","utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefix: botSettings.default_prefix
        };
    }
    
    let prefix = prefixes[message.guild.id].prefix;
    
    let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());
    
    if (!command.startsWith(prefix)) return;

    if (args[0] === "--info") {      
        commandInfo(command,message,prefix);
        return;
    }

    if (coolDown.has(sender.id)) {
        React.sendReact(false,message,`You have to wait ${coolDownSec} seconds between commands`,'reply');
        return;
    }
    if (cmd){
        cmd.run(bot,message,args,prefix);
        coolDown.add(sender.id);
    }else{
        message.delete();
        message.reply(`Your massage was deleted because this command does not exist! Type \`${prefix}help\` to get the avaiable command list!`);
        return;
    }
    
    let timer;    

    timer = setTimeout(() =>{
        clearTimeout(timer);
        coolDown.delete(sender.id);
    },coolDownSec*1000)
});
//AI section
bot.on('message',async message =>{
    if (aiSettings.auto_spam_mute) {
        //TODO
    }    
    if (aiSettings.auto_caps_lock_alert) {
    //     if (message.author.bot) return;
    //     if (message.member.hasPermission("KICK_MEMBERS")) return;        
    //     if (message.channel.type === "dm") return;

    //     if (message.content === message.content.toUpperCase()) {
    //         message.delete();
    //         message.reply("Turn off caps!");
    //         return;
    //     }
    // }
    }
});

function commandInfo(cmd,message,prefix){
    fs.readdir('./commands/',(err,folders) =>{
        if (err) console.error(err);

        let commandExist = false;
        
        folders.forEach((folder,index) =>{
            fs.readdir(`./commands/${folder}`,(err,files) => {
                if (err) console.error(err);
                
                let jsfiles = files.filter(f => f.split(".").pop() === "js");

                jsfiles.forEach((f,i) => {
                    let cmds = require(`./commands/${folder}/${f}`);
            
                    if (cmds.config.name.indexOf(cmd.slice(prefix.length)) != -1) {
                        commandExist = true;

                        React.sendReact(true,message);

                        let embed = new Discord.RichEmbed()
                            .setAuthor("Command")
                            .setDescription(`\`${cmds.config.name.join("/")}\`This command must starts with \`${prefix}\``)
                            .setColor("#90CAF9")

                            .addField("Usage", `\`${prefix}${cmds.config.name.join("/")} ${cmds.config.args}\``)
                            .addField("Description", `${cmds.config.description}`)                                                    
            
                        message.channel.send(embed);                
                    }
                    if (folders.length-1 === index && jsfiles.length-1 === i) {
                        if (!commandExist) {
                            React.sendReact(false,message,`I can't give you information about this command beacause it does not exist! Type \`${prefix}help\` to get the avaiable command list!`,'reply');
                            return;   
                        }
                    }
                });
            });
        });
    });
 
}
function randomActivity(){
    let timer;    

    clearTimeout(timer);

    let interval = activity.activity_change_interval;
    let activityArray = activity.activity;
    let activityNumber = Math.floor(Math.random()*activityArray.length);

    bot.user.setStatus('Online');
    bot.user.setActivity(activityArray[activityNumber]);

    timer = setTimeout(randomActivity, interval * 1000);
}

bot.login(token.token);
