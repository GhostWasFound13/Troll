Function Handler For Custom Functions

First create a file what whatever name you want, but make sure the name ends with .js
Then put this code there
const fs = require("fs");
const {resolve} = require("path");

module.exports = (client, path) => {
 const PATH = resolve(path) + "/";
 fs.readdir(PATH, (e, f) => {
 if(e) throw e;
 else f.filter(x => x.endsWith(".js"))
 .forEach(file => client.functionManager.createCustomFunction(require(PATH + file)));
 })
}  

Then create a directory for the custom functions

Now in your index.js add
const loadFunction = require("pathToHandlerFile");

/* ... */

loadFunction(bot, "pathToFunctionDir"); 

Replace pathToHandlerFile with the file path that you created first, eg: 
Replace bot with the keyword you defined your client

Replace pathToFunctionDir with that path of the directory you made for the custom functions

Now to add custom functions, add js file In That Directory and use module.exports
Example: findRoles.js
module.exports = {
 name:"$findRoles",
 type:"djs",
 code: async(d)=>{
 const data = d.util.openFunc(d); 
 const [query,limit=10,type="startsWith", seperator="\n"] = data.inside.splits;
 if(!["startsWith","includes","endsWith"].includes(type)) return d.aoiError.fnError(d,'custom',{inside : data.inside},`Invalid Type Provided In`) 

 data.result = d.guild.roles.cache.filter(x=>x.name.toLowerCase()[type](query)).map(x=>x.name).join(seperator)
 return {code: d.util.setCode(data)}
 } 
} 