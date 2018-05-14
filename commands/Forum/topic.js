const otherSettings = require('../../config/other-settings.json');
const Discord = require('discord.js');
const React = require("../../modules/reacting.js");

let timeToExplain = otherSettings.topic_time_to_explain * 60;
let canAddTopic = true;
let topicMsg = 0;
let topicTime = 0;

module.exports.run = async (bot,message,args,prefix) => {
    let topicChannel = message.guild.channels.find('name','topics');
    if(message.channel.parentID !== topicChannel.parentID) return React.sendReact(false,message,"Możesz otwierać nowe tematy tylko na określonej kategori!","reply");

    let topic = args.join(" ");
    let topicAuthor = message.author;
    
    if (!topic) return React.sendReact(false,message,"Musisz dać temat!","reply");

    switch (topic) {
        case "-end":
            endTopic();
            break;
        case "-explain":
            explain();
            break;
        case "-info":
            info();
            break;
        default:
            newTopic();
            break;
    }

    function newTopic(){
        if (!canAddTopic) return React.sendReact(false,message,"Nie możesz dodać tematu na tym kanale poniewarz inny już istnieje!","reply");
        
        canAddTopic = false;

        topicAuthor = message.author;

        let embed = new Discord.RichEmbed()
            .setTitle("Nowy temat")
            .setColor("#9CCC65")            
            
            .addField("Autor",topicAuthor)
            .addField("Temat",topic)
            .addField("Pozostały czas",`${(timeToExplain/60).toFixed(2)} min`)
            .addField(`Po więcej informacji urzyj ${prefix}topic -info`,'');    
                    

        React.sendReact(true,message,embed,"send");

        bot.on('message',async msg =>{
            if (msg.channel !== message.channel) return;
            if (topicAuthor.id === msg.author.id || bot.id === msg.author.id) return;
            topicMsg += 1;
            timeToExplain += 0.5;
        });
        
        let interval = setInterval(()=>{
            if (canAddTopic) return clearInterval(interval);
            if (timeToExplain <= 0) {
                timeToExplain = 0;
                canAddTopic = true;
                topicAuthor = null; 

                clearInterval(interval);

                let embed = new Discord.RichEmbed()
                    .setAuthor("Czas tematu minął")
                    .setDescription("Teraz każdy może dodać nowy temat!")
                    .setColor("#9CCC65")
                    
                    .addField("Wysłane wiadomości",topicMsg)
                    .addField("Czas tematu",`${(topicTime/60).toFixed(2)} min`);   

                topicTime = 0;
                topicMsg = 0;
        
                React.sendReact(true,message,embed,"send");
            }
            topicTime ++;
            timeToExplain --;      
        },1000);
        return;
    }
    function info (){
        let embed = new Discord.RichEmbed()
            .setTitle("Informacje tematu")
            .setColor("#9CCC65")            
            
            .addField(`Urzyj ${prefix}topic -explain`,'Aby dostać czas do końca tematu')
            .addField(`Urzyj ${prefix}topic -end `,'Aby zakończyć temat(tylko dla autorów i adminów)');    
                    

        React.sendReact(true,message,embed,"send");
    }
    function endTopic(){
        if (canAddTopic) return React.sendReact(false,message,"Nie możesz zakończyć nie zaczętego tematu!","reply");        
        if (topicAuthor !== message.author || !message.member.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"Tylko autor tematu i administratot może zakończyć temat!","reply");        

        topicAuthor = null; 
        timeToExplain = 0;
        canAddTopic = true;

        let embed = new Discord.RichEmbed()
            .setTitle("Temat zakończony")
            .setDescription("Teraz każdy może dodać nowy temat!!")
            .setColor("#9CCC65")
                
            .addField("Wysłąne wiadomości",topicMsg)
            .addField("Czas tematu",`${(topicTime/60).toFixed(2)} min`);        

        topicTime = 0;
        topicMsg = 0;
                
        React.sendReact(true,message,embed,"send");

        return;
    }
    function explain(){
        if (canAddTopic) return React.sendReact(false,message,"Nie możesz dostać czasu do zakończenia nie zaczętego tematu","reply");
        
        React.sendReact(true,message,`Czas do zakończenia: ${(timeToExplain/60).toFixed(2)} min`,"send");
    }
   
}
module.exports.config = {
    name: ["topic"],
    args:"<temat>",
    description: "Stwórz nowy temat",
}   
