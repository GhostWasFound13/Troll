module.exports = {
name: "crime",
code: `
$author[1;Criminals be like]
$color[1;RANDOM]
$description[1;**you commited a crime which is not so nice of you**
**You did get away with it and got [$numberSeparator[$random[1;100];,]] **
]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[10;10000]]]`}
