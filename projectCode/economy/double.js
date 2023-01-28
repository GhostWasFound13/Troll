module.exports = {
name: "double",
$if: "v4",
code: `
$if[$randomText[f;f;f;f;f;f;f;f;f;f;f;f;f;f;f;w;w;w;w;w;w;w;w;f;f;f;f;w]==w]
$setUserVar[wallet;$sum[$getUserVar[wallet];$getUserVar[wallet]]]
$getServerVar[check] **$username** You won double or nothing **x$numberSeparator[$getUserVar[wallet];,]$getServerVar[symbol]**
$else
$if[$randomText[f;f;f;f;f;f;f;f;f;f;f;f;f;f;f;w;w;w;w;w;w;w;w;f;f;f;f;w]==f]
$setUserVar[wallet;0]
$getServerVar[error] **$username** You lost double or nothing **-$numberSeparator[$getUserVar[cash];,]$getServerVar[symbol]**
$endif
$endif
$onlyIf[$getUserVar[wallet]>=1;$getServerVar[error] **$username** You need more than 1$getservervar[symbol]]
$onlyIf[$getUserVar[casino]!=unset;$getServerVar[error] **$username** You don't have a casino]
$onlyIf[$getServerVar[eco]==on;$getServerVar[error] **$username** This server does not have economy enabled]
$onlyIf[$getUserVar[ecobl;$authorid]==false;$getServerVar[error] **$username** You are economy blacklisted]`}