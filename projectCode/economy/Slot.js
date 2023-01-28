module.exports = {
name: "slot",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$replaceText[$replaceText[$checkCondition[won==$randomText[won;lost]];true;$message[1]];false;-$message[1]]]]

$thumbnail[1;https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png{}]
$color[1;$replaceText[$replaceText[$checkCondition[$randomText[won;lost]==won];true;07ff00;1];false;E64338;1]]
$title[1;$username's Slot Game] 
$description[1;>>> **$randomText[🍋;🍊;🍏;🍒;🍇] | $randomText[🍊;🍒;🍇;🍏;🍋] | $randomText[🍒;🍋;🍊;🍇;🍏]
$replaceText[$replaceText[$checkCondition[$randomText[won;lost]==won];true;$randomText[🍊 | 🍊 | 🍊 ;🍇 | 🍇 | 🍇;🍒 | 🍒 | 🍒;🍏 | 🍏 | 🍏;🍋 | 🍋 | 🍋];1];false;$randomText[🍒 | 🍊 | 🍊;🍇 | 🍏 | 🍒;🍇 | 🍒 | 🍊;🍏 | 🍊 | 🍒;🍏 | 🍇 | 🍊;🍋 | 🍊 | 🍒;🍒 | 🍋 | 🍊;🍏| 🍋 | 🍇;🍇 | 🍋 | 🍒;🍏 | 🍊 | 🍋];1] ⬅
$randomText[🍇;🍊;🍋;🍏;🍒] | $randomText[🍒;🍏;🍇;🍋;🍊] | $randomText[🍒;🍇;🍋;🍏;🍊]**]
$footer[1;You $randomText[won;lost] $message[1] ]





$onlyIf[$message[>]>=10;Minimum bet amount is 10.]

$onlyIf[$message[>]<=100000;Maximum bet amount is 100000.]

$onlyIf[$getGlobalUserVar[Wallet]>=$message[>];You don't have enough coins in your Wallet.]
`}