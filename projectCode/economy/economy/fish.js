module.exports = {
  
  name: "fish",
  code: `$description[1;You fish at $randomText[bath;River;Pond;Swimming Pool;Sea], and you get **$random[0;8] Wallet** \`$getServerVar[prefix]you found wallet on the water]
$color[1;$random[0;999999]]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[110;8000]]]

$globalCooldown[2m;**⏰ Wait for %time% to fishing again!**]

`
}