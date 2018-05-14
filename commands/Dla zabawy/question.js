const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let question = args.join(" ");

    if (!question) return React.sendReact(false,message,"Nie zadałęś mi pytania!","reply");
    if (question[question.length -1] != "?") return React.sendReact(false,message,"To nie jest pytanie!","reply");    
    
    let answersArray = [
        "Tak",
        "Nie",
        "Nie wiem",
        "Zapytaj mnie później"
    ];   

    let randomAnswer = Math.floor(Math.random() * answersArray.length);    

    return React.sendReact(true,message,answersArray[randomAnswer],"reply");
}
module.exports.config = {
    name: ["8ball","question"],
    args:"<zapytanie>",
    description: "Zadaj mi pytanie"
}   
