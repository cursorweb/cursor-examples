/**
 * Who doesn't wanna get all my SM?
 * Instagram: https://www.instagram.com/jerrylapiz/
 * Discord: https://discord.gg/pSsnafT
 */

/**Following code is not recommended to be changed.**/
const app = require("express")();

/*This code can be changed, but this is default in case the module can't load.*/
let instagram = "https://www.instagram.com/jerrylapiz/";
let replit = "https://repl.it/@Coder100";
let discord = "Hithere#6537";
let discordServer = "https://discord.gg/pSsnafT";
let name = "Junhao Zhang";
let github = "https://github.com/cursorweb";
let website = "https://www.mr-lapiz.cf";

const data = require("./data.js") || {
  instagram: instagram,
  "repl-it": replit,
  discord: discord,
  "discord-server": discordServer,
  name: name,
  github: github,
  website: website
};


/**OFF LIMITS FROM HERE**/

app.use((req, res, next) => {
  // Set headers for each directory
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append("Header-test","Header value");
  for(i in data){
    res.set(i, data[i])
  }
  res.set('Access-Control-Expose-Headers', '*')
  next();
})

.get("/", (req, res)=>{
  // Root. Why not get the IP address for fun?
  var ip = req.connection.remoteAddress;
  res.send("User with IP address "+ip.replace(/\:([\s\S]|.*)\:/gi,"")+" is currently listening.");
});

for(i in data){
  // Get all the data for the Social Media info
  app.get("/"+i, (req, res) => {
    // Output everything in json
    res.type(".json");
    var output = {
      ok: true,
      output: data[i]
    };
    // Make it striginify
    res.send(JSON.stringify(output));
  });
}

app.get("/sm", (req, res) => {
  //Get all the data and put it in an array
  let array = Object.keys(data).map(key => {
    return {
      [key]: data[key]
    };
  });
  res.type(".json");
  // Always have to stringify the array or you get [object Object], [object Object], ...
  res.send(`{"ok":true,ans:${JSON.stringify(array)}}`);
});

app.use((req, res, next)=>{
  // In case user has accessed something not found, we can guide them
  res.type(".json");
  res.send(`{"ok":false,ans:"Not found"}`)
});

// And finally, let's get the server up!
app.listen(8080);

/* Made by Junhao Zhang */
