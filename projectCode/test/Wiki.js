module.exports = ({
name: "paste",
code: `
$djseval[ const h = require('nomsy-paste');
h('$message', 'txt').then(r => {
 msg.reply('link to paste! 
credits Neon' + r);
}).catch(console.error);
]
$onlyIf[$argsCount>2; Your args must be above two words!]
$cooldown[15s; The api is on a cooldown, try again in %time%] `}) 

aaaaaaa