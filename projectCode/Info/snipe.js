module.exports = [{
 name: 'snipe',
 code: `
 $color[1;$getVar[color]]
 $color[2;$getVar[color]]

 $author[1;$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]

 $description[1; **Message:** 
 $getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]

 $description[2;
 **Channel** - <#$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]> \`($getChannelVar[snipe_channel;$mentionedChannels[1;yes]])\`

 **Time** - <t:$getChannelVar[snipe_t;$mentionedChannels[1;yes]]:F> 
 [<t:$getChannelVar[snipe_t;$mentionedChannels[1;yes]]:R>]
 ]

 $onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;{newEmbed:{description:❌ Nothing to snipe in <#$mentionedChannels[1;yes]>}{color:RED}}]
$onlyIf[$getServerVar[lockSnipe]==off;{newEmbed: {title:**snipe command off**} {color:RED} {description:hello the server owner disabled snipe command }]
`
},{
 type: 'messageDelete',
 channel: '$channelID',
 code:`
 $setChannelVar[snipe_msg;$message]
 $setChannelVar[snipe_author;$authorID]

 $setChannelVar[snipe_channel;$channelID]

 $setChannelVar[snipe_t;$truncate[$divide[$dateStamp;1000]]]`
}] 