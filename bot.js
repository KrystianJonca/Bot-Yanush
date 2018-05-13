const Discord = require('discord.js');
const fs = require("fs");
const React = require("./modules/reacting.js");

const botSettings = require('./config/bot-settings.json');
const otherSettings = require('./config/other-settings.json');

const bot = new Discord.Client();

const coolDownSec = otherSettings.commands_cooldown;
const coolDown = new Set();

bot.mutes = require("./database/mutes.json");
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
    bot.user.setAvatar(botSettings.avatar_location);

    let interval = 1800000;
    let activityArray = [
        `z ${bot.users.size} urzytkownikami!`,
        `na ${bot.guilds.size} serwerach`,
        `na ${bot.channels.size} kanałach`, 
        `przez ${(bot.uptime/3600000).toFixed(2)} h!`, 
        `z ${bot.ping} ping!`
    ];

    let activityNumber = Math.floor(Math.random()*activityArray.length);
    
    bot.user.setStatus('Online');
    bot.user.setActivity(activityArray[activityNumber]);

    setInterval(() => {
        activityArray = [
            `z ${bot.users.size} urzytkownikami!`,
            `na ${bot.guilds.size} serwerach`,
            `na ${bot.channels.size} kanałach`, 
            `przez ${(bot.uptime/3600000).toFixed(2)} h!`, 
            `z ${bot.ping} ping!`
        ];

        activityNumber = Math.floor(Math.random()*activityArray.length);
    
        bot.user.setActivity(activityArray[activityNumber]);
    },interval);

    console.log('Bot is ready to use!');

    
    bot.setInterval(() => {
        for (let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);

            let role = guild.roles.find(r => r.name === "Muted");
            if(!role) continue;

            let incidentsChannel = guild.channels.find('name','incidents');

            if (Date.now() > time) {
                let embed = new Discord.RichEmbed()
                   .setAuthor("Czas muta minoł")
                   .setDescription("Auto unmute")
                   .setColor("#4CAF50")
            
                   .addField("Unmutowany urzytkownik", `${member} z ID ${member.id}`)
                   .addField("Zmutowany o",`${time} (unix time)`);
 
                member.removeRole(role);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json",JSON.stringify(bot.mutes),err => {
                    if(err) console.error(err);
                    incidentsChannel.send(embed); 
                    
                });
                
            }
        }
    },5000);
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

    let incidentsChannel = message.guild.channels.find('name','incidents');
    let topicChannel = message.guild.channels.find('name','topics');
    let reportsChannel = message.guild.channels.find('name','reports');
    let botChannel = message.guild.channels.find('name','bot');
    
    if (!(incidentsChannel || topicChannel || reportsChannel || botChannel)) return React.sendReact(false,message,"Nie można znaleść wymaganych kanałów","send");
    
    if ((command.slice(prefix.length).toLowerCase() != "mute" && command.slice(prefix.length).toLowerCase() != "ban" &&
    command.slice(prefix.length).toLowerCase() != "warn" && command.slice(prefix.length).toLowerCase() != "unmute" && 
    command.slice(prefix.length).toLowerCase() != "report"&& command.slice(prefix.length).toLowerCase() != "kick") && 
    command.slice(prefix.length).toLowerCase() != "clear" && command.slice(prefix.length).toLowerCase() != "topic" &&
    (message.channel.id != botChannel.id))
        return React.sendReact(false,message,'Prosze urzywać komend na określonym kanale','reply');

    if (args[0] === "--info") {      
        commandInfo(command,message,prefix);
        return;
    }

    if (coolDown.has(sender.id)) {
        React.sendReact(false,message,`Musisz poczekać ${coolDownSec} sekund przed nastempnym urzyciem komendy`,'reply');
        return;
    }
    
    if (cmd){
        cmd.run(bot,message,args,prefix);
        coolDown.add(sender.id);
    }else{
        message.delete();
        message.reply(`Twoja wiadomosc zostala usunieta poniewarz dana komenda nie istnieje! Wpisz \`${prefix}help\` aby dostac listę dostępnych komend!`);
        return;
    }
    
    let timer;    

    timer = setTimeout(() =>{
        clearTimeout(timer);
        coolDown.delete(sender.id);
    },coolDownSec*1000)
});
//AI section
bot.on('message',async message => {
    if (message.author.bot) return;
    if (message.member.hasPermission("MANAGE_MESSAGES")) return;        
    if (message.channel.type === "dm") return;

    let aiSettings = JSON.parse(fs.readFileSync("./database/ai-settings.json","utf8"));
    
    if (!aiSettings[message.guild.id]) {
        aiSettings[message.guild.id] = {
            ai: false
        };
    }
    
    if (aiSettings[message.guild.id].ai) {
        //Auto writing with caps lock detector
        if (message.content === message.content.toUpperCase()) {
            message.delete();
            message.reply("Wyłącz capsa!");
            return;
        }
        //Auto spam mute
        let spamMsg = JSON.parse(fs.readFileSync("./database/spam.json", "utf8"));

        if (!spamMsg[message.author.id]) spamMsg[message.author.id] = {
            msg: 0
        };

        spamMsg[message.author.id].msg++;

        fs.writeFileSync("./database/spam.json",JSON.stringify(spamMsg), (err) => {if(err) console.error(err);});
        
        if (spamMsg[message.author.id].msg === 10) {
            let role = message.guild.roles.find(r => r.name === "Muted");
            let muteTime = 10;
            try {    
                if (!role) {
                    role = await message.guild.createRole({
                        name: "Muted",
                        color: "#000000",
                        permission: []
                    });
        
                    message.guild.channels.forEach((channel,id) => {
                        channel.overwritePermissions(role,{
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                }
            }catch(e){
                console.error(error.stack);        
            }
            if (message.member.roles.has(role.id)) return;
            
            let embed = new Discord.RichEmbed()
                .setAuthor("Auto mute")
                .setDescription("Zmutowanie urzytkownika")
                .setColor("#ff0000")
                .setThumbnail(message.author.displayAvatarURL)

                .addField("Zmutowany urzytkownik", `${message.author} with ID ${message.author.id}`)                
                .addField("Powód", "Spamowanie wiadomosciami")        
                .addField("Czas muta", `${muteTime} min`)                        
                .addField("Zmutowany o", message.createdAt)
                .addField("Kanał", message.channel);

            bot.mutes[message.user.id] = {
                guild: message.guild.id,
                time: Date.now() + parseInt(muteTime) * 60000
            }
            fs.writeFile("./database/mutes.json",JSON.stringify(bot.mutes,null,4),err => {
                if(err) console.error(err);
            })

            await message.member.addRole(role);

            let incidentsChannel = message.guild.channels.find('name',"incidents");
            incidentsChannel.send(embed);
            
            try{
                message.channel.bulkDelete(10).then(()=>{
                    message.channel.send(`Wyczyszczonno 10 wiadomości wysłanych prez ${message.author}`).then((msg => msg.delete(5000)))
                });
            }catch(err){
                console.error(err);
            }

            message.author.send(`Przestań spamować! Zmutowałem Cie`);
        }

        setTimeout(() => {
            fs.writeFile("./database/spam.json", '{}', (err) => {
                if (err) console.error(err);
            });
        }, 10000);
    }
});
bot.on("guildCreate", guild => {
    console.log(`Dołączyłem do serwera: ${guild.name}(id: ${guild.id}). Ten serwer ma ${guild.memberCount} urzytkowników!`);
})

bot.on("guildDelete", guild => {
    console.log(`Zostałem usunięty z servera: ${guild.name} (id: ${guild.id})`);
})
bot.on("debug", info => {
    console.log(info);
});
bot.on("disconnect", event => {
    console.log(event);
});
bot.on("reconnecting",() => {
    console.log("Reconnecting");
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
                            .setDescription(`\`${cmds.config.name.join("/")}\`Ta komenda musi zaczynać się od \`${prefix}\``)
                            .setColor("#90CAF9")

                            .addField("Usage", `\`${prefix}${cmds.config.name.join("/")} ${cmds.config.args}\``)
                            .addField("Description", `${cmds.config.description}`)
                            .addField("Group", `${folder}`);                                              
                                                                                
            
                        message.channel.send(embed);                
                    }
                    if (folders.length-1 === index && jsfiles.length-1 === i) {
                        if (!commandExist) {
                            React.sendReact(false,message,`Nie mogę podac Ci informacji o tej komendzię poniewarz ona nie istnieje! Wpisz \`${prefix}help\` aby dostac listę dostępnych komend!`,'reply');
                            return;   
                        }
                    }
                });
            });
        });
    });
 
}

bot.login(process.env.BOT_TOKEN);

