module.exports = {
  name: "sell",
  code: `
  $setGlobalUserVar[$get[$toLowerCase[$message[1]]];$sub[$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID];$replaceText[$message[2];all;$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]]];$authorID]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$multi[$get[$toLowerCase[$message[1]]prize];$replaceText[$message[2];all;$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]]]];$authorID]
$author[1;item sold]
$color[1;ORANGE]
$description[1;**$username** sold $numberSeparator[$replaceText[$message[2];all;$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]];,] $replaceText[**$get[$toLowerCase[$message[1]]](s);_; ]** for **$numberSeparator[$multi[$get[$toLowerCase[$message[1]]prize];$replaceText[$message[2];all;$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]]];,]** $getGlobalUserVar[symbol]]
$onlyIf[$replaceText[$message[2];all;$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]]>=1;Specify a correct amount / item ]
$onlyIf[$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]>=$replaceText[$message[2];all;$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]];You dont have enough items]
$onlyIf[$getGlobalUserVar[$get[$toLowerCase[$message[1]]];$authorID]>=1;You don't have enough items]
$let[wood;wood]
$let[campfire;campfire]
$let[lucky;lucky]
$let[wbottle;wbottle]
$let[water;wbottle]
$let[bottle;wbottle]
$let[leaf;leaf]
$let[trumpet;trumpet]
$let[magicwood;magicwood]
$let[mwood;magicwood]
$let[magic-wood;magicwood]
$let[blaze;blaze]
$let[tin;tin]
$let[metal;tin]
$let[lering;lering]
$let[lring;lering]
$let[coring;cring]
$let[uncoring;uring]
$let[ering;epring]
$let[epring;epring]
$let[myring;myring]
$let[faring;faring]
$let[rifle;rifle]
$let[gun;rifle]
$let[rod;rod]
$let[laptop;laptop]
$let[pc;laptop]
$let[pickaxe;pickaxe]
$let[silver;silver]
$let[ruby;ruby]
$let[uranium;uranium]
$let[sulphur;sulphur]
$let[woodprize;4]
$let[campfireprize;400]
$let[luckyprize;4000]
$let[wbottleprize;500]
$let[leafprize;3]
$let[trumpetprize;25000]
$let[magicwoodprize;400]
$let[blazeprize;100]
$let[tinprize;100]
$let[leringprize;8000]
$let[myringprize;2000]
$let[faringprize;10000]
$let[coringprize;100]
$let[uncoringprize;250]
$let[epringprize;500]
$let[axe;axe]
$let[axeprize;1500]
$let[xpt;zpt]
$let[xptprize;100]
$let[xp;xpt]
$let[xpprize;100]
`}