module.exports = {
 name: "daily",
 code: ` <a:Economy1:916928554275602463> | You Claimed 25000 Money!
<:Money1:916928233990152232> | Next Daily After 12h
 $globalCooldown[12h;You Can Claim Your Daily Again In %time%
 ]
 $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];25000];$authorID]
$log[$userTag has been claimed 25k doge coin]`}