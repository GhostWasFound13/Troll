module.exports = { disable
  name: "work", 
  category: "economy", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[4500;10000]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[5;10]];$authorID]
$thumbnail[1;https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png]
$color[1;RANDOM]
$title[1;Work]
$description[1;
$username, $randomText[it looks like you'd do anything for money 😳.;you were employed as a construction worker today!;you're a discord workaholic!;nice music dude! Here, you earned it!;you were employed as a hair stylist today;hacking can make you a good deal of money if you know what you're doing! From your last hack job, you made;your bitcoin miner scraped up some cash for you!;were you not satisfied with your past employers? Well I counted the tips from your pole dancing gig and you didn't do too bad 😳]
]
$footer[1; +$$random[4500;10000] | 🗡 +$random[5;10]xp]
$globalCooldown[60s;Try again in %time%]`
}