<h1>FlaggedAPI</h1>
<h1>Installation 💾</h1>
<img src="https://minecraftskinstealer.com/achievement/2/npm+install+flaggedapi/Install+now%21">
<br><a href="https://discord.gg/b9ax4KJ"><img class="aboutmeIMG" src="https://nodei.co/npm/flaggedapi.png?downloads=true&downloadRank=true&stars=true"></a>
<br>
<br>
<br>
<h1>What is FlaggedAPI? 🤷‍♂️</h1>
<p><b>FlaggedAPI is a All-In-One API to connect to most of my services :D</b><br>It is a small API right now & only has an cuss checker and a logging system.<br>but it will receive updates whenever I can get around to it 😃
<br>
All functions should have JSDoc! It's when you hover over a function in VSCode and it gives you information about it :D
It includes a description, and code inside of it :D 100% Help in the function itself XD</p>
<br>
<br><h2>Important Announcements!</h2>
<br><p>Major version 3.0.0 completely changes how the code works and how it is written! You will have to update your code.</p>
<br>
<br>
<br>
<h1>3.2.0 Update</h1>
Better coded consoleControl(); and updated the README.md file *(Sorry)*
<br>
<br>
<br>
<br><i>Don't forget that all the documentation is found when hovering the functions in VSCode!</i>
<br>
<br>
<br>
<h1>Required and Recommended Settings</h1>
<p>Here is what the requiring of the code looks like</p>    

```js
//This is the demo code, it has a lot of possibilities. 🤣

//Most, if not all functions/values have the JSDoc in VSCode. To see it do this:
//• Call the API: const FlaggedAPI = require("flaggedapi");
//• Use the logger (Or any function really): FlaggedAPI.log()
//• Hover over the .log() part!
//It should display detailed help 😁 If however it does not display correctly or you still need help, go to https://discord.gg/b9ax4KJ and join the Discord server!


//Normal Operations:
//These are used to call and create the shortcut calls of the API.

//Calling the API.
const { ACD, ACDClear, ACDToggle, chalk, check, clear, colors, list, log, supported, consoleControl } = require("flaggedapi");

//Now all you have to use is:
//• ACD();
//• log();
//• ACDClear();


//Always need set:

//Allows you to toggle ACD (Advanced Console Debugging).
//If toggled True: You will see ACD messages and ACDClear() will not run
//REMEMBER THAT ACDToggle(true) MUST BE SET TO TRUE TO SEE THE MESSAGES!
//as of 1.3.0 you no longer need to set a boolean in the function, it will toggle it's state.
ACDToggle(/*Default is: false*/); //This will set it to True because it was False, if ran again, it will set it to False.

//Allows you to toggle Supported Console.
//If toggled True: You will see all log messages in color!
//If toggled False: No coloring will be used!
//MOST CONSOLES PROPERLY SUPPORT COLORS! Only use this option if you need too :)
supported(/*Default is: true*/); //This will set it to False because it was True, if ran again, it will set it to True.

//Allows you to set the colors for all of the ACL & ACD logging.
//It must be hard-coded and ran every time at startup.
//However it can also be ran at any point in time to change the color.
//It must follow this example: ([`Color_ID`, `Hex Value`], [`Main_Color`, `#FF0000`]).
colors([`Text_Color_Debug`, `#F0e0a0`], [`Main_Color`, `#FF0000`], [`Text_Color_Main`, `#F0e0a0`]);

//Lists the current color settings.
colors();
```
<details>
    <summary><h2>No Notes Version</h2></summary>

```js
const { ACD, ACDClear, ACDToggle, chalk, check, clear, colors, list, log, supported } = require("flaggedapi");
ACDToggle();
supported(); 
colors([`Text_Color_Debug`, `#F0e0a0`], [`Main_Color`, `#FF0000`], [`Text_Color_Main`, `#F0e0a0`]);
colors();
```
</details>
<br>
<br>
<h1>ACL <i>(Advanced Console Logging)</i></h1>
<p>It makes the console more customizable</p>

```js
//Normal functions:

//Clears the console if ACDToggle() is False.
ACDClear();

//Logs strings to the console!
//Now supports Integers, Booleans, Objects, Arrays or anything else!
 
//Use the log()
log(); //=>*Nothing*
 
log(``); //=>*Nothing*
      
log(` `); //=> (!) 

log(`Test`); //=> (!) Test
 
log({ Some: `Object`}); //=> (!) { Some: `Object`}

log(`Logging with\nmore then\n\none line!`); //=>
//(!) Logging with
// ╠═ more then
// ║  
// ╚═ one line!

log(`Test`, { color: "#FF0000", type: "info" }); //=> (!) Info: Test
//*The text will be Red, and it will append "Info:"*
//The Info color will be what you have set it in colors()

log(`Test`, { returnRaw: true, bold: true, italic: true, underline: true, color: "#FF0000" }); //=> chalk.hex(#424742).bold(` (`) + chalk.hex(#047ffa).bold(`!`) + chalk.hex(#424742).bold(`) `) + chalk.hex(`#FF0000`).bold.italic.underline("Test")
//*It will return the raw chalk format for processing*
//This is a string value that you will need to have processed, it will not log.

log(`Test`, { returnRaw: false, bold: true, italic: true, underline: true, color: "#FF0000" }); //=> (!) Test
//*It will be Bold, Italic, Underlined, and the text will be Red*
//It will log to the console.
//In this case, all of these options are optional.

log(`Test`, { returnRaw: true, color: "#FF0000", type: "info" }).then(data => console.log(data)); //=> chalk.hex(#424742).bold.italic(` (`) + chalk.hex(#e3ca1c).bold.italic(`!`) + chalk.hex(#424742).bold.italic(`) `) + chalk.hex(#e3ca1c).italic.bold(`Info: `) + chalk.hex(#FF0000).italic(This is a test!)
//*It will return the raw chalk format for processing*
```
<details>
    <summary><h2>No Notes Version</h2></summary>

```js
ACDClear();
log();
log(``);
log(` `);
log(`Test`);
log({ Some: `Object`});
log(`Logging with\nmore then\n\none line!`);
log(`Test`, { color: "#FF0000", type: "info" });
log(`Test`, { returnRaw: true, bold: true, italic: true, underline: true, color: "#FF0000" });
log(`Test`, { returnRaw: false, bold: true, italic: true, underline: true, color: "#FF0000" });
log(`Test`, { returnRaw: true, color: "#FF0000", type: "info" }).then(data => console.log(data));
```
</details>
<br>
<br>
<h1>ACD <i>(Advanced Console Debugging)</i></h1>
<p>It makes it easier to send error or success messages to the console</p>

```js
//Normal functions:

//Logs to the console!

//The "success" part can be one of four values: "success", "info", "warning", "error"
ACD("You are reading the README.md help file!", "success");//=> (!) Success: You are reading the README.md help file!
```
<details>
    <summary><h2>No Notes Version</h2></summary>

```js
ACD("You are reading the README.md help file!", "success");
```
</details>
<br>
<br>
<br>
<h1>Console Control</h1>
<p>Now you can control the console and add your own custom commands to it!</p>

```js
//Any packages or variables that you have in your code
const somepkg = require(`somepkg`);
let somestr = `This is an example`;

//Calling the function will make FlaggedAPI take over the console.
//IMPORTANT! You MUST pass the root dir path into the function, if you call the function from another file, you must pass the root dir.
consoleControl(__dirname, { somepkg, somestr });
```
<details>
    <summary><h2>No Notes Version</h2></summary>

```js
const somepkg = require(`somepkg`);
let somestr = `This is an example`;
consoleControl(__dirname, { somepkg, somestr });
```
</details>
<br>
<br>
<br>
<h1>Cuss Check ✅</h1>
<p>This part of the code checks and sees if the inputted string match's one of the over 182+ cuss words!</p>

```js
//Cuss Checking
 
//Use check()
check(`Doesn't matter, frick you nerd, you piece of crap`, { custom_words: [`nerd`], ignored_words: [`Words`, `You`, `Don't`, `Want`, `Checked`, `Crap`], level: 4 }).then(data => {
  console.log(data); //=>
  //{
  //    number_of_words: 2,
  //    words: [
  //      {
  //        cussword: 'frick',
  //        language: 'english',
  //        level: 4,
  //        reference: 'https://www.urbandictionary.com/define.php?term=Frick',
  //        origin: 'api'
  //      },
  //      { cussword: 'nerd', level: 1, origin: 'custom' }
  //    ]
  //}
})

//Gives you a list of all the cuss words. (This is just for you to view the words in it's Array format. Use the method below to get the actual Array for processing)
list().then(data => {
    console.log(data)
})
```
<br>
<br>
<br>
<br>
<h1>All Changelogs</h1>
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
<details>
    <summary><p>1.2.5 -> 1.2.6 Changelog</p></summary>
    <br>• Started Following the Semantic Versioning (To the best that I can)
    <br>• Updated LICENSE
    <br>• Updated package.json
    <br>• Updated the README.md documentation
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.2.6 -> 1.2.7 Changelog</p></summary>
    <br>• Updated package.json
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.2.7 -> 1.2.8 Changelog</p></summary>
    <br>• FlaggedAPI.ACL.colors() was renamed to FlaggedAPI.ACL.Colors()
    <br>• FlaggedAPI.ACL.log() was renamed to FlaggedAPI.ACL.Log()
    <br>• Fixed FlaggedAPI.ACL.Colors() ACD error
    <br>• Code Improvements
    <br>• Updated package.json
    <br>• Updated FlaggedAPI.ACL.Colors() Documentation
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.2.8 -> 1.2.9 Changelog</p></summary>
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.2.9 -> 1.3.0 Changelog</p></summary>
    <br>• Updated log()! (it now has a New Line indicator!)
    <br>• The space in front of the log() prefix was removed (IDK why I added that)
    <br>• Better Documentation (All the documentation was reviewed and updated!)
    <br>• Small code improvements (It doesn't change functionality, just how it's typed out lol)
    <br>• Updated src/ACL.js
    <br>• Updated src/cussCheck.js
    <br>• Updated package.json
    <br>• Edited: README.md (As always)
</details>
<details>
    <summary><p>1.3.0 -> 1.3.1 Changelog</p></summary>
    <br>• Fixed a bug where if you used log() with `returnRaw: ture` and `type: "error"` or `type: "warning"` it would say `(!) Info:` instead of `(!) Error:`
    <br>• Updated src/ACL.js
    <br>• Updated package.json
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.3.1 -> 1.3.2 Changelog</p></summary>
    <br>• Fixed a bug where if you used log() without any options it would throw an error
    <br>• Updated src/ACL.js
    <br>• Updated package.json
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.3.2 -> 1.4.0 Changelog</p></summary>
    <br>• Added the ability to remove all colors from console messages (Mainly for unsupported consoles)
    <br>• Added strip-ansi package
    <br>• Updated some more in-package documentation
    <br>• Updated src/ACL.js
    <br>• Updated package.json
    <br>• Edited: README.md
</details>
<details>
    <summary><p>1.4.0 -> 2.0.0 Changelog</p></summary>
    <br>• Added .gitignore
    <br>• Changed API links!
    <br>• Updated some more in-package documentation
    <br>• Updated src/cussCheck.js
    <br>• Updated LICENSE
    <br>• Updated package.json
    <br>• Edited: README.md
</details>
<details>
    <summary><p>2.0.0 -> 3.0.0 Changelog</p></summary>
    <br>• Edited .gitignore
    <br>• Added .npmignore
    <br>• Changed API links to github
    <br>• Revamped Documentation
    <br>• Revamped Code
    <br>• Changed how imports are done. No more flaggedapi.ACL.log, it is now just flaggedapi.log
    <br>• Updated src/cussCheck.js
    <br>• Removed flaggedapi.cussCheck.number
    <br>• Removed flaggedapi.cussCheck.request
    <br>• Added flaggedapi.check (same as flaggedapi.cussCheck.request)
    <br>• Added flaggedapi.chalk (So that you have access to the correct version)
    <br>• Updated src/ACL.js
    <br>• log(); now supports more than just strings
    <br>• Updated LICENSE
    <br>• Updated package.json
    <br>• Updated package-lock.json
    <br>• Removed "request" package
    <br>• Edited README.md
</details>
<details>
    <summary><p>3.0.0 -> 3.0.1 Changelog</p></summary>
    <br>• Updated src/cussCheck.js
    <br>• Changed API links from dev branch to main branch
    <br>• Updated src/ACL.js
    <br>• Fixed bug where in log() where if "returnRaw: true" and "type" was added it would return undefined. Now it will be a Promise when returnRaw is true
    <br>• Updated package.json
    <br>• Edited README.md
</details>
<details>
    <summary><p>3.0.0 -> 3.1.0 Changelog</p></summary>
    <br>• Added src/consoleControl.js 
    <br>• consoleControl(); allows you input to the console and you can create commands for it 
    <br>• Updated package.json
    <br>• Forgot to edit README.md
</details>
<details>
    <summary><p>3.1.0 -> 3.2.0 Changelog</p></summary>
    <br>• Updated src/consoleControl.js
    <br>• Full documentation for consoleControl();
    <br>• Better coding of consoleControl(); to make it look nicer and run better.
    <br>• Updated package.json
    <br>• Edited README.md
</details>
<br>
<br>
<br>
<h1>Support 🔧</h1>
<p><b>I will give support over in my <a href="https://discord.gg/b9ax4KJ">Discord Server</a></b></p>
<a href="https://discord.gg/b9ax4KJ"><img src="https://discordapp.com/api/guilds/698186167350329476/embed.png?style=banner2"></a>
<br>
<br><h2>While I tried to make this version the best that it could be, it still is in a young state and may not work right or it may not be explained the right way, I am sorry in advanced if it is confusing XD If at anytime you need help PLEASE message me on discord and I will be happy to help! :D</h2>