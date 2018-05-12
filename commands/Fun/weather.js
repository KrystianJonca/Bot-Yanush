const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    
    let cpuTemp = getRandomInt(30,80);
    let gpuTemp = getRandomInt(20,70);
    let fanSpeed = getRandomInt(1000,2000);
    

    let msg = "**CPU:** ";

    if (cpuTemp >= 30 && cpuTemp < 49) {
        msg += `Cold, CPU temperature is about ${cpuTemp} °C\n`;
    }else if(cpuTemp > 50 && cpuTemp < 64){
        msg += `Normal, CPU temperature is about ${cpuTemp} °C\n`;
    }else if (cpuTemp > 65 && cpuTemp <= 80) {
        msg += `Hot, CPU temperature is about ${cpuTemp} °C\n`;
    }

    msg += "**GPU:** ";

    if (gpuTemp >= 20 && gpuTemp <= 39) {
        msg += `Cold, GPU temperature is about ${gpuTemp} °C\n`;
    }else if(gpuTemp >= 40 && gpuTemp <= 54){
        msg += `Normal, GPU temperature is about ${gpuTemp} °C\n`;
    }else if (gpuTemp >= 55 && gpuTemp <= 70) {
        msg += `Hot, GPU temperature is about ${gpuTemp} °C\n`;        
    }

    msg += `**Fan speed(rpm):** ${fanSpeed}`;

    return React.sendReact(true,message,msg,"send");
}
module.exports.config = {
    name: ["temp","weather"],
    args:"",
    description: "Get weather in my current location ( ͡ᵔ ͜ʖ ͡ᵔ )"
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
