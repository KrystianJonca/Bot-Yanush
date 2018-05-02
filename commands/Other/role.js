const roles = require("../../config/roles.json");
const React = require("../../modules/reacting.js");

module.exports.run = async (bot,message,args,prefix) => {
    let roleToAdd = args[0];

    let rolesArray = roles.roles;

    if (!roleToAdd) return React.sendReact(false,message,"You did not give me a role to add!","reply");
    if (rolesArray.indexOf(roleToAdd) == -1) return React.sendReact(false,message,`Undefined role! Type ${prefix}roles to get avaiable roles list`,"reply");

    for (let index = 0; index < rolesArray.length; index++) {
        if (rolesArray[index] === roleToAdd) {
            let role = message.guild.roles.find(r => r.name === rolesArray[index]);
            if(!role){
                role = await message.guild.createRole({
                    name: rolesArray[index]
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