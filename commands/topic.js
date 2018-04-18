const forumSettings = require('../config/forum-settings.json');
const Discord = require('discord.js');
const React = require("../modules/reacting.js");

let topicAuthor;
let canAddTopic = true;
let timeToExplain = forumSettings.topic_time_to_explain * 60;
let topicMsg = 0;
let topicTime = 0;

module.exports.run = async (bot,message,args) => {
    if(message.channel.perentID !== forumSettings.forum_category_id) return React.sendReact(false,message,"You can only add topic on specific category!","reply");

    let topic = args.join(" ");
    
    if (!topic) return React.sendReact(false,message,"You must give a topic!","reply");

    switch (topic) {
        case "-end":
            endTopic();
            break;
        case "-explain":
            endTopic();
            break;
        default:
            newTopic();
            break;
    }

    function newTopic(){
        if (!canAddTopic) return React.sendReact(false,message,"You can't add a new topic because other topic is already exist!","reply");
        
        canAddTopic = false;

        topicAuthor = message.author;

        let embed = new Discord.RichEmbed()
            .setTitle("New topic")
            .setColor("#9CCC65")            
            
            .addField("Author",topicAuthor)
            .addField("Topic",topic)
            .addField("Time to explain",`${(timeToExplain/60).toFixed(2)} min`);        

        React.sendReact(true,message,embed,"send");

        bot.on('message',async msg =>{
            if (msg.channel !== message.channel) return;
            if (topicAuthor === msg.author.id) return;
            topicMsg += 1;
            timeToExplain += timeToExplain/4;
        });
        
        let interval = setInterval(()=>{
            if (canAddTopic) return clearInterval(interval);
            if (timeToExplain <= 0) {
                timeToExplain = 0;
                canAddTopic = true;
                topicAuthor = null; 

                clearInterval(interval);

                let embed = new Discord.RichEmbed()
                    .setAuthor("Topic time explain")
                    .setDescription("Now everyone can add a new topic!")
                    .setColor("#9CCC65")
                    
                    .addField("Message sended",topicMsg)
                    .addField("Topic time",`${(topicTime/60).toFixed(2)} min`);   

                topicTime = 0;
                topicMsg = 0;
        
                React.sendReact(true,message,embed,"send");
            }
            topicTime ++;
            timeToExplain --;      
        },1000);
        return;
    }
    function endTopic(){
        if (topicAuthor !== message.author || !message.member.hasPermission("KICK_MEMBERS")) return React.sendReact(false,message,"Only topic author and admins can end a topic!","reply");        
        if (canAddTopic) return React.sendReact(false,message,"You can't end not started topic!","reply");

        topicAuthor = null; 
        timeToExplain = 0;
        canAddTopic = true;

        let embed = new Discord.RichEmbed()
            .setTitle("Topic ended")
            .setDescription("Now everyone can add a new topic!")
            .setColor("#9CCC65")
                
            .addField("Message sended ",topicMsg)
            .addField("Topic time",`${(topicTime/60).toFixed(2)} min`);        

        topicTime = 0;
        topicMsg = 0;
                
        React.sendReact(true,message,embed,"send");

        return;
    }
    function explain(){
        if (canAddTopic) return React.sendReact(false,message,"You can't get a topic time to explain because currently there is no topic created","reply");
        
        React.sendReact(true,message,`Time to explain: ${(timeToExplain/60).toFixed(2)} min`,"send");
    }
   
}
module.exports.config = {
    name: ["topic"],
    args:"",
    group:"Forum",
    description: "",
    enabled: true,
    avaiable_on_other_categories: false
}   
