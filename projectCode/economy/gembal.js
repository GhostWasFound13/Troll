module.exports = {
  name: "gemstats",
  code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Discord bots dont have a balance]
$thumbnail[1;https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png]
$color[1;RANDOM]
$description[1;mining stats]
$addField[1;gem;$$numberSeparator[$getGlobalUserVar[diamond;$mentioned[1;yes]]]
]
$footer[1; beta command tester]`
}