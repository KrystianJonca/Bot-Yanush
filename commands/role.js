const roles = require('../config/roles.json');
const React = require("../modules/reacting.js");

module.exports.run = async (bot,message,args) => {
    let roleMsg = args[0];

    let roles = roles.roles;

    if (roles.indexOf(roleMsg) == -1) return React.sendReact(false,message,"Undefined role type `roles` to get avaiable roles list!","reply");

    for (let index = 0; index < roles.length; index++) {
        if (roles[index] === roleMsg) {
            let role = message.guild.roles.find(r => r.name === roles[index]);
            if(!role){
                role = await message.guild.createRole({
                    name: roles[index]
                });
            }
            if (message.member.roles.has(role.id)){
                return React.sendReact(true,message,`You was removed from this role! If you want come back type again \`${message.content.toLowerCase()}\``,"reply");
            }
            await message.member.addRole(role);

            return React.sendReact(true,message,`Rolle added! If you want leave type again \`${message.content.toLowerCase()}\``,"reply");
        }
    }
    return;
}
module.exports.config = {
    name: ["role"],
    args:"<role>",
    description: "Set your role!", 
}