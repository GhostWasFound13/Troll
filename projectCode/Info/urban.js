module.exports = {
  name:"urban",
  aliases:"define",
  code:`
$title[1;$message;$jsonrequest[https://api.eriner.repl.co/search/urban?word=$message;url]]
$addField[1;Example;$jsonrequest[https://api.eriner.repl.co/search/urban?word=$message;example]]
$addField[1;Definition;$jsonrequest[https://api.eriner.repl.co/search/urban?word=$message;definition]]
$color[1;RANDOM]
$footer[1;by $jsonrequest[https://api.eriner.repl.co/search/urban?word=$message;author].]
$addTimestamp[1]
$onlyIf[!=$message;A query is required.]
$suppressErrors[No results of $message.]
$botTyping
$thumbnail[1;https://images-ext-2.discordapp.net/external/vsJzSQEhpja_P1Odr5AZzZEds8BYEDh5-jgWc8jD0yk/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/53/books_1f4da.png]
`
}  