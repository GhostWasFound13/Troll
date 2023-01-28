module.exports = {
  
  name: "selldiamond",
  code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];1000]]
$setGlobalUserVar[diamond;$sub[$getGlobalUserVar[diamond];1]]
$title[1;__**SELLING DIAMOND💎**__]
$color[1;00ff59]
$description[1;
**@$username Successfully selling 1 diamond for $1000.**]
$onlyIf[$getGlobalUserVar[diamond]>=1;You don't have that many diamonds!.]`
}