module.exports = {
name: "bal", 
category: "economy",
code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Discord bots dont have a balance]
$thumbnail[1;https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png]
$color[1;RANDOM]
$title[1;$username[$mentioned[1;yes]]'s Wallet]
$description[1;
$addField[1;<:Swords:916931221374783529> Experience;
$numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]xp
]
$addField[1;<a:Economy1:916928554275602463> Wallet;
$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]
]
$addField[1;<:Money1:916928233990152232> Bank;
$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]
]


$footer[1;$randomText[you are a rich ;if you want to get more dogge coin say a!mining;if you want sell diamond say a!selldiamond;dont be sus;rob command will be add;lol;doge bot has been shutdown crappy]
$log[$userTag bal's has $numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]]`
}