module.exports = ({
	name: '$alwaysExecute',
	code: `  
$reply[$messageID;yes]
$jsonRequest[https://api.popcat.xyz/chatbot?msg=$replaceText[$noMentionMessage; ;+;-1]&owner=Tommy&botname=Viper;response;{newEmbed:{description:<a:c_s:902787152318984192> Something went wrong!}{color:#ff0000}}]
$botTyping
$cooldown[2s;{newEmbed:{description:<a:c_s:902787152318984192> Don't send messages to fast, you can break me by doing it}{color:RED}}]

$onlyIf[$checkContains[$message;@everyone;@here]==false;{newEmbed:{description:<a:c_s:902787152318984192> I don't disturb people!}{color:#ff0000}}]

$onlyForChannels[$getServerVar[cbChannel];]

$onlyIf[$getServerVar[cbChannel]!=;]
$suppressErrors
`
});




