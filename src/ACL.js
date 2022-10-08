/**
 * Just some stuff to store XD
 * 
 * *ᴺᵉʷ*
 * *ᵁᵖᵈᵃᵗᵉᵈ*
 * *ₒₚₜᵢₒₙₐₗ*
 * 
 */

const chalk = require("chalk");
const strip = require(`strip-ansi`);
let Settings = {
    ACDEnabled: false,
    Main_Color: { color: `#047ffa`, description: `Used as the main color theme, seen in the prefix as the "!" in the normal logger` },
    Secondary_Color: { color: `#7d807d`, description: `The second color, seen in the prefix as the "!" in the debugging logger` },
    Tertiary_Color: { color: `#424742`, description: `The 3rd color, seen in the prefix as the "(" & ")" in all logging` },
    Text_Color_Main: { color: `#7d807d`, description: `The color of the text` },
    Text_Color_Debug: { color: `#424742`, description: `The color of the text` },
    Success_Color: { color: `#00e804`, description: `The color when the Success method is called. Effects the prefix and the word "Success"` },
    Supported_Console: true,
    Info_Color: { color: `#e3ca1c`, description: `The color when the Info method is called. Effects the prefix and the word "Info"` },
    Warning_Color: { color: `#e64b0b`, description: `The color when the Warning method is called. Effects the prefix and the word "Warning"` },
    Error_Color: { color: `#e60b0b`, description: `The color when the Error method is called. Effects the prefix and the word "Error"` },
};

/**
 * ***ACD*** *Advanced Console Debugging*  \
 * It allows more decorative console log debugging.
 * @param {String} text **Whatever you want the message to display**
 * @param {`success`|`info`|`warning`|`error`| undefined} type **The type of message** 
 * > • ***`success`***  \
 * > • ***`info`***  \
 * > • ***`warning`***  \
 * > • ***`error`***
 * 
 * *As of **1.2.1** the `type` will defaulted to ***`info`****
 * 
 * *Recommended Examples:*
 * ```js
 *      //Call the API
 *      const { ACD } = require("flaggedapi").ACL;
 * 
 *      //Use the ACD()
 *      ACD("Line 7 was ran"); //=> (!) Info: Line 7 was ran
 *      ACD("Line 8 was ran", "info"); //=> (!) Info: Line 8 was ran
 *      ACD("Line 9 was unsuccessful", "error"); //=> (!) Error: Line 9 was unsuccessful
 * ```
 * @returns {void|throw} returns nothing, logs error
 */
function ACD(text, type) {
    if (!Settings.ACDEnabled) {
        if (!text) return this.config.ACDEnabled;
    } else {
        if (!text) return this.config.ACDEnabled;
        if (!type) InfoGen(text, false);
        else if (type.toLowerCase() === `success`) {
            SuccessGen(text, false);
        } else if (type.toLowerCase() === `info`) {
            InfoGen(text, false);
        } else if (type.toLowerCase() === `warning`) {
            WarningGen(text, false);
        } else if (type.toLowerCase() === `error`) {
            ErrorGen(text, false);
        } else ErrorGen(`Unknown type "${type}". Expected: \`success\`, \`info\`, \`warning\`, \`error\``);
    }
}

/**
 * ***ACDClear***   \
 * Clears the console if ACDToggle is False
 * 
 * *Recommended Examples:*
 * ```js 
 *      //Call the API
 *      const { clear } = require("flaggedapi").ACL;
 * 
 *      //Use the clear()
 *      clear();
 * ```
 */
function ACDClear() {
    if (!Settings.ACDEnabled) console.clear();
}

/**
 * ***ACD Colors***   \
 * Change the colors of the console 😁
 * @param  {...any} options **To Use:**  \
 * If you use it without any input you will get the current colors of the console.  \
 * *Recommended Example:*
 * ```js
 *      //Call the API
 *      const { colors } = require("flaggedapi").ACL;
 * 
 *      //Use the colors()
 *      colors();
 * ```
 * \
 * \
 * To set colors use this:
 * ```js
 *      colors([`Text_Color_Debug`, `#F0e0a0`], ["Main_Color", "#FF0000"], [`Text_Color_Main`, `#F0e0a0`])
 * ```
 * Each color must be an array of both its official name and the 6-digit Hex color that you wish for it to be.  \
 * Run ***`colors();`*** to get all the color names
 * 
 * *List of color names:*
 * - Main_Color
 * - Secondary_Color
 * - Tertiary_Color
 * - Text_Color_Main
 * - Text_Color_Debug
 * - Success_Color
 * - Info_Color
 * - Warning_Color
 * - Error_Color
 * 
 * ***NOTE:*** *This is a `in-memory` only option and needs to be set at every startup.*
 */
function colors(...options) {
    if (options.length > 0) {
        options.forEach(x => {
            try {
                if (x[0] === `ACDEnabled`) return;
                Settings[x[0]].color = `${x[1]}`;
                ACD(`Successfully added: ${chalk.hex(x[1])(x[0])} with the color of ${chalk.hex(x[1])(x[1])}`, `success`);
            } catch (e) { ACD(`Unknown Value: ${x[0]}`, `warning`); }
        });
    } else {
        let entries = Object.entries(Settings);
        entries.forEach(x => {
            if (x[0] === `ACDEnabled`) return;
            console.log(chalk.hex(`${x[1].color}`)(`■ - ${x[0].toString()}: \`${x[1].color}\`\n${x[1].description}\n`));
        });
    }
}

/**
 * ***Log*** *ᵁᵖᵈᵃᵗᵉᵈ*  \
 * More cooler looking logging with better features 😄
 * 
 * @param {String?} text Whatever you want to print to the console.
 * @param {Object} options You can add options to the log to make it look different :)
 * @param {Boolean?} options.returnRaw *ₒₚₜᵢₒₙₐₗ* ***`returnRaw`***  \
 * If true, it will return the raw [chalk processed string](https://www.npmjs.com/package/chalk/v/4.1.2 "Chalk 4.1.2 needs to be installed for the raw string to work"), useful for NPM's that update the console like [*npm i log-update*](https://www.npmjs.com/package/log-update/v/4.0.0 "I highly recommend using 4.0.0, it's the best version XD"). 
 * @param {Boolean?} options.bold *ₒₚₜᵢₒₙₐₗ* ***`bold`***  \
 * Whether or not to bold the message.
 * @param {Boolean?} options.italic *ₒₚₜᵢₒₙₐₗ* ***`italic`***  \
 * Whether or not to italic the message. 
 * @param {Boolean?} options.underline *ₒₚₜᵢₒₙₐₗ* ***`underline`***  \
 * Whether or not to underline the message.
 * @param {String?} options.color *ₒₚₜᵢₒₙₐₗ* ***`color`***  \
 * A 6-digit Hex string. It changes the color of the text.
 * @param {"success"|"info"|"warning"|"error"} options.type *ₒₚₜᵢₒₙₐₗ* ***`type`***  \
 * The type of message that you want to use. 
 * 
 * *Recommended Examples:*
 * ```js
 *      //Call the API
 *      const { log } = require("flaggedapi").ACL;
 * 
 *      //Use the log()
 *      log(); //=>*Nothing*
 * 
 *      log(""); //=>*Nothing*
 * 
 *      log("Test"); //=> (!) Test
 * 
 *      log("Logging with\nmore then\n\none line!"); //=>
 *      //(!) Logging with
 *      // ╠  more then
 *      // ║  
 *      // ╚  one line!
 * 
 *      log("Test", { returnRaw: false, bold: true, italic: true, underline: true, color: "#FF0000" }); //=> (!) Test
 *      //*It will be Bold, Italic, Underlined, and the text will be Red*
 *      //It will log to the console.
 *      //In this case, all of these options are optional.
 * 
 *      log("Test", { returnRaw: true, bold: true, italic: true, underline: true, color: "#FF0000" }); //=> chalk.hex(#424742).bold(` (`) + chalk.hex(#047ffa).bold(`!`) + chalk.hex(#424742).bold(`) `) + chalk.hex(`#FF0000`).bold.italic.underline("Test")
 *      //*It will return the raw chalk format for processing*
 *      //This is a string value that you will need to have processed, it will not log.
 *      //In this case, all of these options except returnRaw are optional.
 * 
 *      log("Test", { color: "#FF0000", type: "info" }); //=> (!) Info: Test
 *      //*The text will be Red, chat formatting like bolding isn't available*
 *      //The Info color will be what you have set it in ACL.colors()
 *      //In this case, the color option is optional.
 * 
 *      log("Test", { returnRaw: true, color: "#FF0000", type: "info" }); //=> chalk.hex(#424742).bold.italic(` (`) + chalk.hex(#e3ca1c).bold.italic(`!`) + chalk.hex(#424742).bold.italic(`) `) + chalk.hex(#e3ca1c).italic.bold(`Info: `) + chalk.hex(#FF0000).italic(This is a test!)
 *      //*It will return the raw chalk format for processing*
 *      //In this case, the color option is optional, the rest are needed.
 * ```
 * @returns {void|String} When used with option ***`returnRaw`*** set to `true` it will return a [chalk processed string](https://www.npmjs.com/package/chalk/v/4.1.2 "Chalk 4.1.2 needs to be installed for the raw string to work"), else it will apply the passed options and log the given string to the console
 */
function log(text, options) {
    let Prefix = chalk.hex(Settings.Tertiary_Color.color).bold(`(`) + chalk.hex(Settings.Main_Color.color).bold(`!`) + chalk.hex(Settings.Tertiary_Color.color).bold(`) `);
    if (!options && !text) return console.log(``);
    let parts = text.split(`\n`);
    text = "";
    parts.forEach((x, i) => {
        if (i == 0) return text = x;
        if (i != (parts.length - 1)) if (!x) text = text + `\n ║  `;
        else text = text + `\n ╠  ` + x;
        else text = text + `\n ╚  ` + x;
    });
    if (text && !options) return executeLog(false, false, Prefix + chalk.hex(Settings.Text_Color_Main.color)(text));
    else {
        if (options.type) {
            if (options.type.toLowerCase() === "success") return SuccessGen(text, true, options.color, options.returnRaw);
            else if (options.type.toLowerCase() === "info") return InfoGen(text, true, options.color, options.returnRaw);
            else if (options.type.toLowerCase() === "warning") return WarningGen(text, true, options.color, options.returnRaw);
            else if (options.type.toLowerCase() === "error") return ErrorGen(text, true, options.color, options.returnRaw);
            else ErrorGen(`Expected either "success", "info", "warning", or "error" but got ->${chalk.hex(Settings.Info_Color.color)(options.type)}<-\n${chalk.hex(Settings.Tertiary_Color.color).bold.italic(` (`) + chalk.hex(Settings.Secondary_Color.color).bold.italic(`!`) + chalk.hex(Settings.Tertiary_Color.color).bold.italic(`) If you are not needing a type then it is recommend to remove it from the options.`)}`, true);
        } else {
            if (options.returnRaw === true) {
                return `chalk.hex("${Settings.Tertiary_Color.color}").bold("(") + chalk.hex("${Settings.Main_Color.color}").bold("!") + chalk.hex("${Settings.Tertiary_Color.color}").bold(") ") + chalk.hex("${options.color ? options.color : Settings.Text_Color_Main.color}")${options.bold ? ".bold" : ""}${options.italic ? ".italic" : ""}${options.underline ? ".underline" : ""}("${text}")`;
            } else executeLog(false, true, `console.log(Prefix + chalk.hex("${options.color ? options.color : Settings.Text_Color_Main.color}")${options.bold ? ".bold" : ""}${options.italic ? ".italic" : ""}${options.underline ? ".underline" : ""}(text))`);
        }
    }
}

/**
 * ***ACD Toggle*** *ᵁᵖᵈᵃᵗᵉᵈ*  \
 * If set to True it will display the set message in the console.  \
 * If not set it will toggle it's current state  \
 * **Default:** ***`false`***
 * @param {Boolean|Null} boolean 
 * 
 * ***NOTE:*** *This is a `in-memory` only option and needs to be set at every startup.*
 * 
 * *As of **1.3.0** the `input` is no longer needed to be defined, it will just toggle state.*
 * 
 * *Recommended Examples:*
 * ```js
 * //Call the API
 * const { ACDToggle } = require("flaggedapi").ACL;
 * 
 * //Use the ACDToggle()
 * ACDToggle();
 * //*It will toggle it's state* (Such as if it is False, it will be toggled to True)
 * 
 * //Assign the desired value *(Must be Boolean)*
 * ACDToggle(true);
 * ```
 * @returns {void|throw} returns nothing, logs error
 */
function ACDToggle(boolean) {
    if (boolean == undefined) return Settings.ACDEnabled = !Settings.ACDEnabled;
    else if (typeof (boolean) != "boolean") return ErrorGen(`It must be either true or false, but got ->${boolean}<-`);
    else Settings.ACDEnabled = boolean;
}

/**
 * ***Supported Console*** *ᴺᵉʷ*  \
 * If set to False it will strip all ASCI color codes and log it  \
 * If not set it will toggle it's current state  \
 * **Default:** ***`true`***
 * @param {Boolean|Null} boolean
 * 
 * ***NOTE:*** *This is a `in-memory` only option and needs to be set at every startup.*
 * 
 * *Recommended Examples:*
 * ```js
 * //Call the API
 * const { supported } = require("flaggedapi").ACL;
 * 
 * //Use the supported()
 * supported();
 * //*It will toggle it's state* (Such as if it is False, it will be toggled to True)
 * 
 * //Assign the desired value *(Must be Boolean)*
 * supported(true);
 * ```
 * @returns {void|throw} returns nothing, logs error
 */
function supported(boolean) {
    if (boolean == undefined) return Settings.Supported_Console = !Settings.Supported_Console;
    else if (typeof (boolean) != "boolean") return ErrorGen(`It must be either true or false, but got ->${boolean}<-`);
    else Settings.Supported_Console = boolean;
}

function SuccessGen(text, boolean, color, returnRaw) {
    if (returnRaw) return executeLog(true, false, `chalk.hex("${Settings.Tertiary_Color.color}").bold.italic("(") + chalk.hex("${boolean ? Settings.Success_Color.color : Settings.Secondary_Color.color}").bold.italic("!") + chalk.hex("${Settings.Tertiary_Color.color}").bold.italic(") ") +
    chalk.hex("${Settings.Success_Color.color}").italic.bold("Success: ") + chalk.hex("${color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color}").italic("${text}")`);
    else executeLog(false, false, chalk.hex(Settings.Tertiary_Color.color).bold.italic(`(`) + chalk.hex(boolean ? Settings.Success_Color.color : Settings.Secondary_Color.color).bold.italic(`!`) + chalk.hex(Settings.Tertiary_Color.color).bold.italic(`) `) +
        chalk.hex(Settings.Success_Color.color).italic.bold(`Success: `) + chalk.hex(color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color).italic(text));
}

function InfoGen(text, boolean, color, returnRaw) {
    if (returnRaw) return executeLog(true, false, `chalk.hex("${Settings.Tertiary_Color.color}").bold.italic("(") + chalk.hex("${boolean ? Settings.Info_Color.color : Settings.Secondary_Color.color}").bold.italic("!") + chalk.hex("${Settings.Tertiary_Color.color}").bold.italic(") ") +
    chalk.hex("${Settings.Info_Color.color}").italic.bold("Info: ") + chalk.hex("${color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color}").italic("${text}")`);
    else executeLog(false, false, chalk.hex(Settings.Tertiary_Color.color).bold.italic(`(`) + chalk.hex(boolean ? Settings.Info_Color.color : Settings.Secondary_Color.color).bold.italic(`!`) + chalk.hex(Settings.Tertiary_Color.color).bold.italic(`) `) +
        chalk.hex(Settings.Info_Color.color).italic.bold(`Info: `) + chalk.hex(color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color).italic(text));
}

function WarningGen(text, boolean, color, returnRaw) {
    if (returnRaw) return executeLog(true, false, `chalk.hex("${Settings.Tertiary_Color.color}").bold.italic("(") + chalk.hex("${boolean ? Settings.Warning_Color.color : Settings.Secondary_Color.color}").bold.italic("!") + chalk.hex("${Settings.Tertiary_Color.color}").bold.italic(") ") +
    chalk.hex("${Settings.Warning_Color.color}").italic.bold("Warning: ") + chalk.hex("${color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color}").italic("${text}")`);
    else executeLog(false, false, chalk.hex(Settings.Tertiary_Color.color).bold.italic(`(`) + chalk.hex(boolean ? Settings.Warning_Color.color : Settings.Secondary_Color.color).bold.italic(`!`) + chalk.hex(Settings.Tertiary_Color.color).bold.italic(`) `) +
        chalk.hex(Settings.Warning_Color.color).italic.bold(`Warning: `) + chalk.hex(color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color).italic(text));
}

function ErrorGen(text, boolean, color, returnRaw) {
    if (returnRaw) return executeLog(true, false, `chalk.hex("${Settings.Tertiary_Color.color}").bold.italic("(") + chalk.hex("${boolean ? Settings.Error_Color.color : Settings.Secondary_Color.color}").bold.italic("!") + chalk.hex("${Settings.Tertiary_Color.color}").bold.italic(") ") +
    chalk.hex("${Settings.Error_Color.color}").italic.bold("Error: ") + chalk.hex("${color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color}").italic("${text}")`);
    else executeLog(false, false, chalk.hex(Settings.Tertiary_Color.color).bold.italic(`(`) + chalk.hex(boolean ? Settings.Error_Color.color : Settings.Secondary_Color.color).bold.italic(`!`) + chalk.hex(Settings.Tertiary_Color.color).bold.italic(`) `) +
        chalk.hex(Settings.Error_Color.color).italic.bold(`Error: `) + chalk.hex(color ? color : boolean ? Settings.Text_Color_Main.color : Settings.Text_Color_Debug.color).italic(text));
}

function executeLog(returnRaw, eval, string) {
    if (returnRaw) return string;
    if (!Settings.Supported_Console) return console.log(strip(string));
    if (eval) return eval(string);
    console.log(string);
}

module.exports = {
    //It is highly recommend to use the most recent function assignments
    //the most recent function assignments
    ACD, ACDClear, colors, log, ACDToggle, supported,

    //For everyone who hates to update their code, the old function assignments still work :D
    //Legacy function assignments
    Log: log,
    Colors: colors
};