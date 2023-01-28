module.exports = ({
 name: 'hack',
 usage: 'Hack <user id | name | mention>',
 description: 'Hack a user',
 cooldown: '3s',
  category: "fun",
 code: `
 **__Starting a dangerous Hack on $username[$findUser[$message;no]]__**

 $editIn[2s;[▗] Hacking $username[$findUser[$message;no]];[▖] Got the token of the user: **$randomString[15]**;[▘] Email of the user: **$replaceText[$username[$findUser[$message;no]]; ;_;-1]@gmail.com**;[▝] Password: **$randomString[8]**;[▗] Recent contacts: **$username[$randomUserID]**;[▖] Most used word: **$randomText[meme;lol;nah;lmao;dude;bruh;wut;nou;f;k;huh;bruh;breh]**;[▘] Most recent dm message: **$randomText[I think you are mad af;bye;Why u blocked me;I am mad]**;[▝] Hacking medical records;[▗] Hacked Email(bypassed 2FA too);[▘] 50% Hack Complete;[▖] Injecting Latest version of Corona into the account;[▘] Hacking microsoft account;[▝] Microsoft password: **$randomText[ZapIsZap@Zap.com;IAmNoob@gmail.com;ByeBye@ok.co.in;$replaceText[$username; ;_;-1]IsSmart@yahoo.com]**;[▗] Checking User Games Account;[▖] Plays $randomText[Fortnite(....);Subway Surfers;Temple Run;Clash of Clans;Roblox;Brawl Stars;Minecraft;Pubg];[▘] Hacking epic games account;[▝] Epic games account hacked and deleted;[▝] 99% Hack completed......;
[▗] Discord IP: **$numberSeparator[$random[100000000;900000000];.]**;__The *totally* dangerous, risky and scary hack on $username[$findUser[$message;no]] is 100% complete!__]

 $onlyIf[$findUser[$message;no]!=;{newEmbed:{description: Invalid Args
Usage:
\`hack <user id | name | mention>\`}{color:RED}}]

$cooldown[$commandInfo[hack;cooldown];{newEmbed:{description: Wait for %time% to try again}{color:#ff000}}]
`
});  