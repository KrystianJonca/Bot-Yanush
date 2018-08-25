const Discord = require('discord.js');
const React = require('../../modules/reacting.js');
const speedTest = require('speedtest-net');

module.exports.run = async (bot, message, args, prefix, db) => {
  let msg = await message.channel.send('Testing... Please wait');

  const test = speedTest({ maxTime: 5000 });

  test.on('data', async data => {
    const download = (data.speeds.download * 0.125).toFixed(2);
    const upload = (data.speeds.upload * 0.125).toFixed(2);
    const ping = data.server.ping;

    let embed = new Discord.RichEmbed()
      .setAuthor('Internet speed report')
      .setColor('#CDDC39')

      .addField('Download', `${download} MB/s`)
      .addField('Upload', `${upload} MB/s`)
      .addField('Ping', `${ping} ms`);

    await React.sendReact(true, message, embed, 'send');

    msg.delete();
  });

  test.on('error', async () => {
    await React.sendReact(
      false,
      message,
      'Sorry, somethink went wrong!',
      'reply'
    );

    msg.delete();
  });

  return;
};
module.exports.config = {
  name: ['speedtest'],
  args: '',
  description: 'Get your Internet speed!'
};
