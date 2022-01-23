<h1>FlaggedAPI</h1>
<h1>Installation 💾</h1>
<img src="https://minecraftskinstealer.com/achievement/2/npm+install+flaggedapi/Install+now%21">
<br><a href="https://theflagen430297.com/RD#Join"><img class="aboutmeIMG" src="https://nodei.co/npm/flaggedapi.png?downloads=true&amp;downloadRank=true&amp;stars=true"></a>
<br>
<br>
<br>
<h1>What is FlaggedAPI? 🤷‍♂️</h1>
<p><b>FlaggedAPI is a All-In-One API to connect to most of my services :D</b><br>It is a small API right now & only has an cuss checker and a logging system.<br>but it will receive updates whenever I can get around to it 😃</p>
<br>
<br>
<br>
<h1>About the 1.2.0 - 1.2.4 Update</h1>
<p>This update is big :D Getting and processing the cuss words are now totally better (And plans to make it ever better are coming). Also new and cool console logging was added (:

All functions should have tooltips? I guess you call them that? It's when you hover over a function in VSCode and it gives you information about it.\
It includes a description, and code inside of it :D 100% Help in the function itself XD

<h2>In 1.2.1</h2>• ACL was redone to be able to return the raw log string! This is big news because you can use ACL in NPM's that update the console like <a href="https://www.npmjs.com/package/log-update/v/4.0.0"; title="I highly recommend using 4.0.0, it's the best version XD"><i>npm i log-update</i></a>
<br>• <i>Don't forget that all the documentation is found when hovering the functions in VSCode!</i>
<br>
<br>
<h2>In 1.2.4</h2>• FlaggedAPI.cussCheck.request() was redone and changed from a callback to a Promise!
<br>• <i>Don't forget that all the documentation is found when hovering the functions in VSCode!</i>
<br>
<br>
<b>TAKE NOTE:</b> All other versions before 1.2.0 are not going to work because the API Links changes. The domain changed from https://theflagen430297.com to https://storage.theflagen430297.com</p>
<br>
<br>
<br>
<h1>A bit about me 📜</h1>
<p>Hello there, I'm TheFlagen430297, I am:
<br>
• A Minecraft Server Owner
<br>
• a YouTuber
<br>
• a Christian
<br>
• a Republican
<br>
• a Discord Bot Coder
<br>
• And kinda messing around with Web Development XD</p>
<br>
<br>
<br>
<h1>Required and Recommended Settings</h1>
<p>Here is what the requiring of the code looks like</p>    

```js
//This is the demo code, it has a lot of possibilities. 🤣


//Keys and Info:
//Some helpful information about this document and the API

//How to read this README:
//• If there are 2 new lines it's a new Group.
//• If there is 1 new line it is a new Section in the Group.

//Most, if not all functions/values have the Markdown examples in VSCode. To see it do this:
//• Call the API: const FlaggedAPI = require("flaggedapi");
//• Use the logger (Or any function really): FlaggedAPI.ACL.log()
//• Hover over the .log() part!
//It should display detailed help 😁 If however it does not display correctly or you still need help, go to https://theflagen430297.com/RD#Join and join the Discord server!


//Normal Operations:
//These are used to call and create the shortcut calls of the API.

//Calling the API.
const FlaggedAPI = require("flaggedapi");

//Access to the cussCheck & ACL (Advanced Console Logging) branch and its components.
//It's put into one line for space saving.
let { ACDToggle, ACDClear, log, ACD, colors} = FlaggedAPI.ACL, { list, number, request } = FlaggedAPI.cussCheck
//Now all you have to use is:
//• ACD();
//• log();
//• ACDClear();


//Always need set:

//Allows you to toggle ACD (Advanced Console Debugging).
//If true: You will see ACD messages and FlaggedAPI.ACL.ACDClear() will not run
//REMEMBER THAT ACDToggle(true) MUST BE SET TO TRUE TO SEE THE MESSAGES!
ACDToggle(true /*Default is: false*/);

//Allows you to set the colors for all of the ACL & ACD logging.
//It must be hard-coded and ran every time at startup.
//However it can also be ran at any point in time to change the color.
//It must follow this example: ([`Color_ID`, `Hex Value`], ["Main_Color", "#FF0000"]).
colors([`Text_Color_Debug`, `#F0e0a0`], ["Main_Color", "#FF0000"], [`Text_Color_Main`, `#F0e0a0`]);

//Lists the current color settings.
colors();
```
<details>
    <summary><h2>No Notes Version</h2></summary>

```js
const FlaggedAPI = require("flaggedapi");
let { ACDToggle, ACDClear, log, ACD, colors} = FlaggedAPI.ACL, { list, number, request } = FlaggedAPI.cussCheck
ACDtoggle(true);
colors([`Text_Color_Debug`, `#F0e0a0`], ["Main_Color", "#FF0000"], [`Text_Color_Main`, `#F0e0a0`]);
colors();
```
</details>
<br>
<br>
<h1>ACL <i>(Advanced Console Logging)</i></h1>
<p>It makes the console more customizable</p>

```js
//Normal functions:

//Clears the console if ACL.toggle() is false.
ACDClear();

//Logs strings to the console!
//This does not support Integers, Booleans, Objects, Arrays or anything else except String Values. (Support for these values are unknown, please request this addition at https://theflagen430297.com/RD#Join)
log(); //=>*Nothing*

log(""); //=>*Nothing*

log("Test"); //=> (!) Test

log("Test", { returnRaw: false, bold: true, italic: true, underline: true, color: "#FF0000" }); //=> (!) Test
//*It will be Bold, Italic, Underlined, and the text will be Red*
//It will log to the console.
//In this case, all of these options are optional.

log("Test", { returnRaw: true, bold: true, italic: true, underline: true, color: "#FF0000" }); //=> chalk.hex(#424742).bold(` (`) + chalk.hex(#047ffa).bold(`!`) + chalk.hex(#424742).bold(`) `) + chalk.hex(`#FF0000`).bold.italic.underline("Test")
//*It will return the raw chalk format for processing*
//This is a string value that you will need to have processed, it will not log.
//In this case, all of these options except returnRaw are optional.

log("Test", { color: "#FF0000", type: "info" }); //=> (!) Info: Test
//*The text will be Red, chat formatting like bolding isn't available*
//The Info color will be what you have set it in ACL.colors()
//In this case, the color option is optional.

log("Test", { returnRaw: true, color: "#FF0000", type: "info" }); //=> chalk.hex(#424742).bold.italic(` (`) + chalk.hex(#e3ca1c).bold.italic(`!`) + chalk.hex(#424742).bold.italic(`) `) + chalk.hex(#e3ca1c).italic.bold(`Info: `) + chalk.hex(#FF0000).italic(This is a test!)
//*It will return the raw chalk format for processing*
//In this case, the color option is optional, the rest are needed.
```
<details>
    <summary><h2>No Notes Version</h2></summary>

```js
ACDClear();
log();
log("");
log("Test");
log("Test", { returnRaw: false, bold: true, italic: true, underline: true, color: "#FF0000"});
log("Test", { returnRaw: true, bold: true, italic: true, underline: true, color: "#FF0000"});
log("Test", { color: "#FF0000", type: "info" }); 
log("Test", { returnRaw: true, color: "#FF0000", type: "info"});
```
</details>
<br>
<br>
<h1>ACD <i>(Advanced Console Debugging)</i></h1>
<p>It makes it easier to send error or success messages to the console</p>

```js
//Normal functions:

//Logs to the console!

//The "info" part can be one of four values: "success", "info", "warning", "error"
ACD("You are reading the README.md help file!", "info");//=> (!) Info You are reading the README.md help file!
```
<details>
    <summary><h2>No Notes Version</h2></summary>

```js
ACD("You are reading the README.md help file!", "info");
```
</details>
<br>
<br>
<h1>Cuss Check ✅</h1>
<p>This part of the code checks and sees if the inputted string match's one of the over 182+ cuss words!</p>

```js
//Cuss Checking
request("String that has some cusswords in it", { refresh: false, ignored_words: [`Words`, `You`, `Don't`, `Want`, `Checked`] }).then(ReturnedData => {
    console.log(ReturnedData); //Returns an Object with info.
    console.log(ReturnedData.hasCuss); //Returns Boolean.
    console.log(ReturnedData.cuss_list); //Returns all cuss words found.
}).catch(err => { console.log(err.error);})


//Gives you a list of all the cuss words. (This is just for you to view the words in it's Array format. Use the method below to get the actual Array for processing)
list();

//Returns the Array of words.
list(true, x => {
    console.log(x);
})

//Returns a Integer
number(returned => {
    console.log(returned);
});

//Returns a message that contains the number of words
number();
```
<br>
<br>
<br>
<br>
<details>
    <summary><p>1.0.0 -> 1.1.1 Changelog</p></summary>
    • Added "README.md".
    <br>• Removed "test.js".
    <br>• Added better error messages to all events.
    <br>• Moved all script files to "src".
</details>
<details>
    <summary><p>1.1.1 -> 1.1.4 Changelog</p></summary>
    • Edited: README.md
</details>
<details>
    <summary><p>1.1.4 -> 1.1.5 Changelog</p></summary>
    • Added a new error on all events that makes the options required 
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.1.5 -> 1.2.0 Changelog</p></summary>
    Oh goodness where do I begin...
    <br>• Redid how the cussing system checks the given string
    <br>• Added ACL & ACD
    <br>• Added LICENSE
    <br>• Edited exports.js
    <br>• Edited index.
    <br>• Changed API URLs
    <br>• A lot more that I don't remember (I'll be better with the changelogs XD)
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.2.0 -> 1.2.1 Changelog</p></summary>
    <br>• When you do not specify a type in ACD, it will choose Info as the default
    <br>• ACL.log() was redone and has better performance
    <br>• ACL.log() was given more options and better documentation
    <br>• ACL.log() now has an option to return the raw content
    <br>• FIXED THE STUPID ERROR IN README.md: In this readme, I had it as "const FlaggedAPI = require("./index");" not "const FlaggedAPI = require("flaggedapi");". Noobish move bro... I'm sorry!
    <br>• Fixed small but multiple coding discrepancies between the code itself and the documentation, making it more unified :D
    <br>• Fixed the documentation in ACD where the function was called "log()" when you needed to use "ACD()". Again, I'm sorry XD
    <br>• Edited: README.md *(Better grammar too)*
</details>
<details>
    <summary><p>1.2.1 -> 1.2.2 Changelog</p></summary>
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.2.2 -> 1.2.3 Changelog</p></summary>
    <br> A special thanks to Ping for his help with this update!
    <br>
    <br>• Fixed the hex bug when using returnRaw
    <br>• Deleted exports.js
    <br>• Renamed index.js to exports.js
    <br>• Redid how the function are required
    <br>• Renamed ACDtoggle() to ACDToggle()
    <br>• Changed clear() to ACDClear() in the documentation
    <br>• Edited: README.md
    <br>• Removed Herobrine... Wait what???
</details>
<details>
    <summary><p>1.2.3 -> 1.2.4 Changelog</p></summary>
    <br> A special thanks again to Ping for his help with this update!
    <br>
    <br>• Changed FlaggedAPI.cussCheck.request() from Callback to Promise!!
    <br>• Added request() to the Cuss Check documentation <i>(It's not like this whole thing is to block cusswords, and I totally forgot to add the main function... Nah bro your trippin)</i>
    <br>• Fixed FlaggedAPI.ACL.log() <i>(Wasn't working due to string & eval errors?)</i>
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.2.4 -> 1.2.5 Changelog</p></summary>
    <br>• Updated LICENSE
    <br>• Edited: README.md
</details>
<br>
<br>
<br>
<br>
<h1>Support 🔧</h1>
<p><b>I will give support over in my Discord server!</b>

[**https://theflagen430297.com/RD#Join**](https://theflagen430297.com/RD#Join)</p>
<a href="https://theflagen430297.com/RD#Join"><img src="https://discordapp.com/api/guilds/698186167350329476/embed.png?style=banner2"></a>
<br>
<br><h2>While I tried to make this version the best that it could be, it still is in a young state and may not work right or it may not be explained the right way, I am sorry in advanced if it is confusing XD If at anytime you need help PLEASE message me on discord and I will be happy to help! :D</h2>