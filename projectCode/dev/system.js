module.exports = ({
name: "$alwaysExecute",
 code: `

<@$authorID> that command doesn't exist
$onlyIf[$isbot==false;]
$onlyIf[$commandInfo[$message[1];name]==;]
$onlyIf[$replaceText[$message[1];a!;]!=;]
$onlyIf[$checkContains[$message[1];?!]==true;]
`
}) 