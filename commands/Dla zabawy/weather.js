const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    
    let cpuTemp = getRandomInt(30,80);
    let gpuTemp = getRandomInt(20,70);
    let fanSpeed = getRandomInt(1000,2000);
    

    let msg = "**CPU:** ";

    if (cpuTemp >= 30 && cpuTemp < 49) {
        msg += `Zimny, temperatura CPU wynosi ${cpuTemp} °C\n`;
    }else if(cpuTemp > 50 && cpuTemp < 64){
        msg += `Normalny, temperatura CPU wynosi ${cpuTemp} °C\n`;
    }else if (cpuTemp > 65 && cpuTemp <= 80) {
        msg += `Ciepły, temperatura CPU wynosi ${cpuTemp} °C\n`;
    }

    msg += "**GPU:** ";

    if (gpuTemp >= 20 && gpuTemp <= 39) {
        msg += `Zimny, temperatura GPU wynosi ${gpuTemp} °C\n`;
    }else if(gpuTemp >= 40 && gpuTemp <= 54){
        msg += `Normalny, temperatura GPU wynosi ${gpuTemp} °C\n`;
    }else if (gpuTemp >= 55 && gpuTemp <= 70) {
        msg += `Ciepły, temperatura GPU wynosi ${gpuTemp} °C\n`;        
    }

    msg += `**Prędość wiatraków(rpm):** ${fanSpeed}`;

    return React.sendReact(true,message,msg,"send");
}
module.exports.config = {
    name: ["temp","weather"],
    args:"",
    description: "Dostań obecną temperaturę ( ͡ᵔ ͜ʖ ͡ᵔ )"
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
