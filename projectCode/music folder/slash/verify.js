module.exports = [
  {
name: 'server_settings_general',  
type: 'interaction', 
prototype: 'selectMenu', 

code: `

$interactionReply[$getVar[tick] $if[$getServerVar[verify]==false;Disabled Verification;Enabled Verification
__**Channel**__
<#$findChannel[🚧┋verification]>];;{actionRow:{button:Info:1:info5:false:<:icons_info:962344746506940526>}};;;yes]

$if[$getServerVar[verify]==false;{execute:enable_verify};{execute:disable_verify}]

$onlyIf[$interactionData[values[0]]==verification;]

`
  
},
   
                 {
  name: 'info5',
  type: 'interaction', 
  prototype: 'button', 

  code: `
$interactionUpdate[;{newEmbed:{color:#7289da} {title:Description} {timestamp:ms} {description:Enable an effiecient yet simple verification system that asks users to answer math questions}};;;;yes]

   
   






`,
  
},
 {
  name: 'verify',
  type: 'interaction', 
  prototype: 'button', 
  code: `
$sendMessage[{newEmbed:{title:You got 2 minutes to reply} {color:WHITE} {delete:5s}}]
$awaitMessages[$channelID;$authorID;2m;everything;verify_awaited;User did not reply in time;{}]
$interactionReply[;{newEmbed:{title:To verify answer the math question} {description:Please type an answer bellow for the follwing question} {color:WHITE} {field:How much is:$random[1;99] **$randomText[+;-;*;/]** $random[0;99]} {timestamp:ms} {footer:User verify:$authorAvatar}};;;;yes]
$setUserVar[math;$math[$random[1;99]$randomText[+;-;*;/]$random[0;99]]]

$onlyIf[$hasRoles[$guildId;$authorID;$findRole[Coder]]==false;{"embeds" : "{newEmbed:{title:$getVar[wrong] Error Occured} {description:🤔 Seems like you are already verified} {color:RED}}",
"ephemeral" : true,
"options": { "interaction": true }
}
] 
   






`,
  
}, 
   {
  name: 'verify_help',
  type: 'interaction', 
  prototype: 'button', 
  code: `

$interactionReply[;{newEmbed:{title:To verify answer the math question} {description:It s pretty simple you need to answer a question that the bot provides use a calculator or your brain 🧠
**AND**
**MAKE SURE NOT TO INCLUDE SPACES**} {color:WHITE} {field:What if?:If the bot fails just ping a moderator and you will be mannualy verified} {timestamp:ms} {footer:User verify:$authorAvatar}};;;;yes]


   
   






`,
  
}, 


] 
\\ first part of code it s mainly executed from here

\\ second part (awaiteds) 

 {
name: "verify_awaited",
type: 'awaited',
$if: "v4",
code: `
$giveRole[$guildID;$authorID;$findRole[Coder]]
$takeRole[$guildID;$authorId;$findRole[Unverified]]
$sendMessage[{newEmbed:{title:$getVar[tick] Verified} {color:GREEN} {delete:5s}}]
$deleteMessage[$messageID;$channelID]

$onlyIf[$getUserVar[math]==$message;{newEmbed:{title:$getVar[wrong] You failed to verify} {color:RED} {delete:5s} {description:To retry click the button again}}]


`
}, 

   {
name: "enable_verify",
$if: "v4",
type: 'awaited',
code: `
$if[$getVar[verify_id]==]
$setVar[verify_id;$get[verify_id]]
$let[verify_id;$channelSendMessage[$findChannel[🚧┋verification];{"embeds" : "{newEmbed:{title:Verify here} {description:Welcome to **$serverName** in order to start the verifying process please click the button bellow} {timestamp:ms} {author:Verification:$serverIcon} {field:What if?:If verification fails please use \`create thread (optional issue)\` and ping an active moderator} {color:GREEN}}","components" : "{actionRow:{button:Verify:3:verify:false:<:icons_colorserververified:952576314412523520>} {button:Help:1:verify_help:false:📑}}"};yes]]
$else
$setVar[verify_id;$get[verify_id]]
$let[verify_id;$channelSendMessage[$findChannel[🚧┋verification];{"embeds" : "{newEmbed:{title:Verify here} {description:Welcome to **$serverName** in order to start the verifying process please click the button bellow} {timestamp:ms} {author:Verification:$serverIcon} {field:What if?:If verification fails please use \`create thread (optional issue)\` and ping an active moderator} {color:GREEN}}","components" : "{actionRow:{button:Verify:3:verify:false:<:icons_colorserververified:952576314412523520>} {button:Help:1:verify_help:false:📑}}"};yes]]
$deleteMessage[$getVar[verify_id];$findChannel[🚧┋verification]]
$endif
$setServerVar[verify;true]
`
},
                  {
name: "disable_verify",
type: 'awaited',
code: `
$setVar[verify_id;]
$deleteMessage[$getVar[verify_id];$findChannel[🚧┋verification]]
$setServerVar[verify;false]
`
},

              