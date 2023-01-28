
module.exports = {
 name: "roleinfo",
 code:  `$title[1;$roleName[$findRole[$message]] Info]
 
$description[1;
**Name:**
<@&$findRole[$message]>
 
**Color:**
\`$getRoleColor[$findRole[$message]]\`
 
**Creation Date:**
\`$creationDate[$findRole[$message];date]\`
 
**You have this role?**
\`$toLocaleUpperCase[$hasRole[$authorID;$findRole[$message];$guildID]]]/
 
**Members:**
\`$djsEval[message.guild.roles.cache.get('$findRole[$message]').members.map(m=>m.id).length;yes]\`

**Position:**
\`$rolePosition[$findRole[$message]]/$roleCount\`

**Permissions:**
\`$rolePerms[$findRole[$message];,]\`]
$color[1;RANDOM]`
 
} ussslese