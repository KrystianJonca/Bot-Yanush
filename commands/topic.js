const forumSettings = require('../config/forum-settings.json');
const Discord = require('discord.js');

let topicAuthor;
let canAddTopic = true;
let timeToExplain = forumSettings.topic_time_to_explain * 60;
let topicMsg = 0;
let topicTime = 0;

module.exports.run = async (bot,message,args) => {
    if(message.channel.perentID !== forumSettings.forum_category_id) return message.reply("You can only add topic on specific category");

    let topic = args.join(" ");
    
    if (!topic) return message.reply("You must give a topic!");

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
        if (!canAddTopic) return message.reply("You can't add a new topic because other topic is already exist!");
        
        canAddTopic = false;

        topicAuthor = message.author;

        let embed = new Discord.RichEmbed()
            .setTitle("New topic")
            .setColor("#9CCC65")            
            
            .addField("Author",topicAuthor)
            .addField("Topic",topic)
            .addField("Time to explain",`${(timeToExplain/60).toFixed(2)} min`);        

        message.channel.send(embed);

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
        
                message.channel.send(embed);
        
            }
            topicTime ++;
            timeToExplain --;      
        },1000);
        return;
    }
    function endTopic(){
        if (topicAuthor !== message.author || !message.member.hasPermission("KICK_MEMBERS")) return message.reply("Only topic author and admins can end a topic!");        
        if (canAddTopic) return message.reply("You can't end not started topic!");

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
                
        message.channel.send(embed);

        return;
    }
    function explain(){
        if (canAddTopic) return message.reply("You can't get a topic time to explain because currently there is no topic created");
        
        message.channel.send(`Time to explain: ${(timeToExplain/60).toFixed(2)} min`);

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
