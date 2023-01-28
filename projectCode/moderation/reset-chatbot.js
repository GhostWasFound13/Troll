module.exports = ({
  name: 'reset-chatbot',
  aliases: 'resetchatbot',
 usage: 'Reset-chatbot <#chnl>',
 description: 'Resets the chatbot in the server',
 cooldown: '3s',
  code: `
 $description[1;Successfully disabled chatbot in this server]
 $color[1;#ff0000]
 
 $setServerVar[cbChannel;]
 $onlyIf[$getServerVar[cbChannel]!=;{newEmbed:{description:<a:c_s:902787152318984192> This server has no chat bot channel!}{color:RED}}]
 
$onlyPerms[manageserver;{newEmbed:{description:<a:c_s:902787152318984192> Missing 
\`Manage_Server\` Perms!}{color:RED}}]
$cooldown[$commandInfo[reset-chatbot;cooldown];{newEmbed:{description:<a:c_s:902787152318984192> Wait for %time% to try again!}{color:#ff0000}}]`
 });