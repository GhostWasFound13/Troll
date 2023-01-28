module.exports = {
  
  name: "mining",
  code: `$setGlobalUserVar[diamond;$sum[$getGlobalUserVar[diamond];$random[2;100]

$title[1;**$username** Get:]
$color[1;$random[10000;999999]]
$description[1;$random[0;5] Diamond💎!, \`if you want to sell the diamond say A!selldiamond? ]
$globalCooldown[2s;**⏰ Wait for %time% to mining again!**]
$thumbnail[1;https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png]
$footer[1;say a!gemstats]
`
}