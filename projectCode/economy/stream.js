module.exports = {
name: "stream",
$if: "v4",
code: `
$if[$getGlobalUserVar[con]==on]
$title[1;**Live stream**]
$color[1;$getVar[embed_color]]
$description[1;**$randomText[You went live on youtube;You went live on twitch] and streamed yourself playing $randomText[minecraft;roblox;deez nuts] and your fans donated $random[100;500]$getVar[symbol]**]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[100;500]]]
$globalCooldown[3m;your laptop is wayy to hot to stream now, so wait %time%]
$else
$title[1;**Live stream**]
$color[1;$getVar[embed_color]]
$description[1;**$randomText[You went live on youtube;You went live on twitch] and streamed yourself playing $randomText[minecraft;roblox;deez nuts] and your fans donated $random[1;50]$getVar[symbol]**]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[1;50]]]
$globalCooldown[3m;your laptop is wayy to hot to stream now, so wait %time%]
$endif
$onlyIf[$getGlobalUserVar[laptop]>0;You wont own a laptop]
$onlyIf[$getVar[lockdown]==off;{newEmbed: {title:**lockdown**} {color:RED} {thumbnail:https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png} {description:**hello $username im very sorry but my commands have been temporarily been shutdown so that means you are not gonna be able to use any of my commands
please contact my ower** \`$userTag[$botownerid]\` **If you know dev lock the command}}]`}
