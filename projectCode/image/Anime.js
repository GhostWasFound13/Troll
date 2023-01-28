module.exports = {
  name: "anime",
  code: `

$onlyIf[$mentioned[1]!=;Mention someone!]
$onlyIf[$checkContains[$message;bite;cuddle;feed;fluff;hug;kiss;lick;pat;poke;slap;tickle]==true; It's not a valid type! The types are: bite cuddle feed fluff hug kiss lick pat poke slap tickle.]
$title[1;$username $message[1]'d $username[$mentioned[1]]!]
$image[1;https://purrbot.site/img/sfw/$message[1]/gif/$message[1]_$randomText[001;002;003;004;005;006;007;008;009;010;011;012;013;014;015;016].gif]
$color[1;FFF000]
$footer[1;Requested By $username!]
$cooldown[7s;{title:\\⚠️ | Cooldown Error} {color:FF0000}
{description:Hey <@$authorID>, This command has a cooldown, Don't spam the command or else...}
{footer:You have to wait %time% to use this command again! | Default cooldown is 7s!}]



`
}