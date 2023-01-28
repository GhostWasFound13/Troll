module.exports = {
name: "beg",
category: "economy",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;25]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[0;5]];$authorID]
$title[1;beg]
$thumbnail[1;https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png]
$color[1;RANDOM]
$description[1;$username, $randomText[Begging is for the weak so here;Here, take this and go;Here, don't let this be a habit;I take you for a well put together human being, why are you begging?;Why can't you just get a job?]
]
$footer[1;+$$random[0;25] | 🗡 +$random[0;5]xp]
$globalCooldown[30s;Quit being a begger and try again in %time%]
$log[$userTag begging $random[0;25]`
}