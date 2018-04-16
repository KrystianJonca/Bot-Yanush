const answers = require("../config/answers.json");

module.exports.run = async (bot,message,args) => {
    let question = args.join(" ");

    if (!question) return message.reply("You did not ask me a question!");
    if (question[question.length -1] != "?") return message.reply("This is not a question!");    
    
    let answersArray = answers.answers;   

    let randomAnswer = Math.floor(Math.random() * answersArray.length);    

    return message.reply(answersArray[randomAnswer]);
}
module.exports.config = {
    name: ["question","8ball"],
    args:"(question content)",
    group:"Random",
    description: "Ask me a question",
    enabled: true,
    avaiable_on_other_categories: false
}   
