module.exports = {	
name: "deposit", 
aliases: 'dep',
category: "economy",
code: `$setGlobalUserVar[Bank;$sum[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$title[1;Deposited]
$thumbnail[1;https://images-ext-1.discordapp.net/external/hPvRyMG0B3gBsDd7Y0DRTouVv8rswwjuNmD9HTax78I/https/cdn.discordapp.com/emojis/817024643785424907.png]
$color[1;RANDOM]
$description[1;
$username, you deposited $$numberSeparator[$message] into your bank!]
$footer[1;you just dep $$message]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Wallet;$authorID];Cannot deposit more than what's in your wallet!]

$onlyIf[$getGlobalUserVar[Wallet;$authorID]>0;There's nothing to deposit!]`
}