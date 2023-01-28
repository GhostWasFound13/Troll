module.exports = ({
	name: 'set-chatbot',
    aliases: 'setchatbot',
 usage: 'Set-chatbot <#chnl>',
 description: 'Sets chatbot of the server',
 cooldown: '3s',
	code: `
$description[1;<a:tick:902870755329589299> Successfully enabled the chatbot to <#$findChannel[$message;no]>]
$color[1;GREEN]
$setServerVar[cbChannel;$findChannel[$message;no]]

$onlyIf[$findChannel[$message;no]!=undefined;{newEmbed:{description:<a:c_s:902787152318984192> Invalid Args in \`<channel>\`
Usage:
\`set-chatbot <channel name | mention>\`}{color:RED}}]

$onlyIf[$message!=;{newEmbed:{description:<a:c_s:902787152318984192> Invalid Args
Usage:
\`set-chatbot <channel mention | channel name | channel ID>\`}{color:RED}}]

$onlyIf[$findChannel[$message;no]!=$getServerVar[cbChannel];{newEmbed:{description:<a:c_s:902787152318984192> Chat bot is already active in <#$findChannel[$message;no]>}{color:RED}}]

$onlyPerms[manageserver;{newEmbed:{description: Missing
\`Manage_Server\` Perms}{color:RED}}]
$cooldown[$commandInfo[set-chatbot;cooldown];{newEmbed:{description: Wait for %time% to try again!}{color:#ff0000}}]
`
});
{}