const roles = require('../config/roles.json');

module.exports.run = async (bot,message,args) => {
    let roleMsg = args[0];

    let roles = roles.roles;

    if (otherSettings.roles_for_all.indexOf(roleMsg) == -1) return message.reply("Undefined role type `roles` to get avaiable roles list!");

    for (let index = 0; index < roles.length; index++) {
        if (roles[index] === roleMsg) {
            let role = message.guild.roles.find(r => r.name === roles[index]);
            if(!role){
                role = await message.guild.createRole({
                    name: roles[index]
                });
            }
            if (message.member.roles.has(role.id)){
                return message.reply(`You was removed from this role! If you want come back type again \`${message.content.toLowerCase()}\``);
            }

            await message.member.addRole(role);

            return message.reply(`Rolle added! If you want leave type again \`${message.content.toLowerCase()}\``);
        }
    }
    return;
}
module.exports.config = {
    name: ["role"],
    args:"(role)",
    group:"Roles",
    description: "Set your role!",
    enabled: true,
    avaiable_on_other_categories: true    
}