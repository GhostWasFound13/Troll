module.exports = { L
name: "work",
$if: "v4",
code: `
$if[$getGlobalUserVar[job]==waiter]
$color[1;$getVar[color]]
$author[1;Waiter job]
$description[1;**You worked as a waiter in a restaurant and you got paid [$random[100;50000]]($getBotInvite)$getVar[symbol]**]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[100;50000]]
$globalCooldown[5m;I see you love your job but please come back in \`%time%\`]
$else
$if[$getGlobalUserVar[job]==developer]
$color[1;$getVar[color]]
$author[1;Developer job]
$description[1;**You worked as a developer and decided to make $randomText[discord v2;a discord bot;an application]  and you got paid [$random[100;10000]]($getBotInvite)$getVar[symbol]**]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[cash];$random[100;10000]]]
$globalCooldown[5m;I see you love your job but please come back in \`%time%\`]
$else
$if[$getGlobalUserVar[job]==actor]
$color[1;$getVar[color]]
$author[1;Actor job]
$description[1;**You worked as an actor and you played the main role and got paid [$random[100;25000]]($getBotInvite)$getVar[symbol]**]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[Wallet];$random[100;25000]]]
$globalCooldown[5m;I see you love your job but please come back in \`%time%\`]
$else
**Go get a job in the job list by doing $getServerVar[prefix]job**
$endif
$endif
$endif
$onlyIf[$getVar[lockdown]==off;{newEmbed: {title:**lockdown**} {color:RED} {thumbnail:https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png} {description:**hello $username im very sorry but my commands have been temporarily been shutdown so that means you are not gonna be able to use any of my commands
please contact my ower** \`$userTag[$botownerid]\` **If you have know the devloper still update the commandc*}}]`}a