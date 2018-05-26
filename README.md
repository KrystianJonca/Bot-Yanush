# Bot Yanush
**Simple Discord Bot written in Discordjs**

![Bot avatar](https://raw.githubusercontent.com/KrystianJonca/Bot-Yanush/master/assets/avatar.png) 

**Invite:** http://bit.ly/Yinvite
## Configurate server
1. Create channels required for proper operation of the bot. Channels names:
 -incidents
 -reports
 -bot
 
2. Create category for forum system one of the channels in this category must be named
 -topics

**An example of the server structure:**<br />

- bot(category)<br />
  - bot(channel for using commands)<br />
  - incidents(private channel for admins)<br />
  - reports(private channel for admins)<br />

- forum(category)<br />
  - topics<br />
  - topics-1<br />
  - topics-2<br />
 

## Info
- **Bot name:** Bot Yanush
- **Default_prefix**: "Y!"(Customizable)

## Features
- Spam detector
- Writing with caps lock detector
- Sending invitations detector
- Modern command handler system 
- Automatically **help** command updating
- Reacting on messages when command is execution
- Large config capabilities
- Logs system
- Modern mutes system

## In progress
- Bot Yanush Dev Discord server

## TODO
- Bot website

## Commands
***Config commands:*** <br />
**1:** Y!ai (on/off) | **Description:**  Auto spam mute and auto writing with caps lock alert functions<br />
**2:** Y!prefix (prefix to set) | **Description:**  Set prefix for your own server <br />
***For admins commands:*** <br />
**1:** Y!ban @user (reason) | **Description:**  Ban a user(permission require) <br />
**2:** Y!clear (how much message to clear) | **Description:**  Clear messages <br />
**3:** Y!kick @user (reason) | **Description**:  Kick a user(permission require) <br />
**4:** Y!mute @user (time in min (optional)) (reason) | **Description:**  Mute a user(permission require) <br />
**5:** Y!unmute @user (reason) | **Description:**  Mute a user(permission require) <br />
**6:** Y!warn @user (reason) | **Description:**  Warn a user(3 warns - mute on 15 min, 5 warns - ban)<br />
**7:** Y!whois @user | **Description:**  Mention user info <br />
**8:** Y!cleanwarn @user (reason) | **Description:**  Clean user's warns <br />
***Forum commands:*** <br />
**1:** Y!topic (topic content) | **Description:**  Create new topic <br />
***Info commands:*** <br />
**1:** Y!botinfo | **Description:**  A few facts about me! <br />
**2:** Y!date,time | **Description:**  Get a current date <br />
**3:** Y!help,commands,info | **Description:**  Get a avaiable command list<br />
**5:** Y!serverinfo | **Description:**  A few facts about our server <br />
**6:** Y!userinfo | **Description:**  Get a few facts about you! <br />
***Fun commands:*** <br />
**1:** Y!avatar | **Description:**  See how beautiful your avatar is! <br />
**2:** Y!hug @user | **Description:**  Hug a user <br />
**3:** Y!love @user | **Description:**  Check how much you love the other person<br />
**4:** Y!ping | **Description:**  Get a current ping( ͡° ͜ʖ ͡°)<br />
**5:** Y!question,8ball (uestion content) | **Description:**   Ask me a question <br />
**6:** Y!roll,dice | **Description:**   Roll a random number between 0-6! <br />
**7:** Y!weather,temp | **Description:**   Get weather in my current location ( ͡ᵔ ͜ʖ ͡ᵔ ) <br />
**8:** Y!say (text to say) | **Description:**  Give me message to say <br />
***Other commands:*** <br />
**1:** Y!report @user (reason) | **Description** :  Report a user <br />
*This command list was automatically generated by my bot*



