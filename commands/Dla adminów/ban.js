const Discord = require('discord.js');
const otherSettings = require('../../config/other-settings.json');
const React = require('../../modules/reacting.js');

module.exports.run = async (bot,message,args,prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return React.sendReact(false,message,"Nie masz wymaganego pozwolenia!","reply");    
    let banUser = message.guild.member(message.mentions.users.first() || message.mentions.users.get(args[0]));
    let reason = args.join(" ").slice(22);

    if (!banUser) return React.sendReact(false,message,"Nie podałeś oznaczenia urzytkownika lub jego ID!","reply");
    if (banUser.id === message.author.id) return React.sendReact(false,message,"Nie możesz zbanować samego siebie!","reply");
    if (banUser.id === bot.user.id) return React.sendReact(false,message,"Nie możesz wykonywać tej operacji na mnie","send");
    if (!reason) return React.sendReact(false,message,"Musisz podać powód!","reply");
    if (banUser.hasPermission("ADMINISTRATOR")) return React.sendReact(false,message,"Ta osoba nie może być zbanowana!","reply");

    let embed = new Discord.RichEmbed()
        .setAuthor("Ban")
        .setDescription("Zbanowanie urzytkownika")
        .setColor("#ff0000")
        .setThumbnail(banUser.user.displayAvatarURL)

        .addField("Zbanowany urzytkownik", `${banUser} with ID ${banUser.id}`)
        .addField("Zbanowany przez", `${message.author} with ID ${message.author.id}`)
        .addField("Powód", reason)
        .addField("Zbanowany o", message.createdAt)
        .addField("Kanał", message.channel);

    let incidentsChannel = message.guild.channels.find('name',"incidents");
    incidentsChannel.send(embed);
    
    message.guild.member(banUser).ban(reason);
    React.sendReact(true,message,"Urzytkownik zbanowany!","send");
    
    return;
}
module.exports.config = {
    name: ["ban"],
    args:"@oznaczenie <powód>",
    description: "Zbanuj urzytkownika(wymagane pozwolenie)"

}