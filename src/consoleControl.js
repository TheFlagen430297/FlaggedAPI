const kp = require(`keypress`);
const fs = require(`fs`);
const { join } = require(`path`);
const { log, chalk, clear } = require(`./ACL`);
const logU = require(`log-update`);


/**
 * ***Console Control***
 * 
 * Allows input to the console and add commands to it
 * @param {String} dir Use `__dirname` that directs to the root of the project
 * @param {Object} imports Any imports you want to pass to the command files
 * @since **`3.1.0`**
 * @updated **`3.2.0`**
 */
function consoleControl(dir, imports) {
    fs.stat(join(dir, 'src/console/commands'), (err, stats) => { 
        if (err) {
            fs.mkdir(join(dir, 'src'), (err) => { 
                if (err) return log(err, { type: `error` });
                fs.mkdir(join(dir, 'src/console'), (err) => {
                    if (err) return log(err, { type: `error` });
                    fs.mkdir(join(dir, 'src/console/commands'), (err) => {
                        if (err) return log(err, { type: `error` });
                        fs.writeFile(join(dir, 'src/console/commands/test.js'), `module.exports = {\n    name: "test",\n    description: "just a test",\n    usage: "",\n    execute({ log }, args) {\n        return new Promise((res, rej) => {\n            console.log("just a test");\n            res();\n        });\n    }\n};`, (err) => {
                            fs.writeFile(join(dir, 'src/console/commands/help.js'), `module.exports = {\n    name: "help",\n    description: "shows all commands",\n    usage: "<command>",\n    execute({ log, xEnvs}, args) {\n        return new Promise((res, rej) => {\n            let returnString = "Commands:";\n            if (args[0]) {\n                let info = require(\`./\${args[0]}\`);\n                returnString = \`\${info.name}\${info.usage ? " " + info.usage : ""}: \${info.description}\`;\n                log(returnString, { color: "#FFFFFF"});\n                return res();\n            } else xEnvs.console.commands.files.forEach((file, index, array) => {\n                let info = require(\`./\${file}\`);\n                returnString = returnString + \`\\n\${info.name}\${info.usage ? " " + info.usage : ""}: \${info.description}\`;\n                if (index === array.length - 1) {\n                    log(returnString, { color: "#FFFFFF"});\n                    res();\n                }\n            });\n        });\n    }\n};`, (err) => { run(); });
                        });
                    });
                });
            });
        } else run();
    });

    function run() {
        let xEnvs = {
            console: {
                blinking: true,
                blinkingInterval: setInterval(() => {
                    if (!xEnvs.console.prompted) return;
                    xEnvs.console.blinking = !xEnvs.console.blinking;
                    let args = xEnvs.console.currentString.split(` `);
                    let command = args.shift();
                    let str = args.length == 0 ? `` : ` ${args.join(`,`).replace(/,/g, ` `)}`;
                    if (xEnvs.console.paused) xEnvs.console.paused = false;
                    if (xEnvs.console.commands.files.includes(`${command}.js`)) logU(eval(log(chalk.hex("#4eeeee")(command) + str + (xEnvs.console.blinking ? `|` : ``), { returnRaw: true })));
                    else logU(eval(log(chalk.hex("#FF3333")(command + str) + (xEnvs.console.blinking ? `|` : ``), { returnRaw: true })));
                }, 200),
                commands: {
                    path: join(dir, 'src/console/commands'),
                    files: fs.readdirSync(join(dir, 'src/console/commands')).filter(file => file.endsWith('.js'))
                },
                commandHistory: {
                    currentNum: 0,
                    lastKey: "*PLACEHOLDER*",
                    past: []
                },
                currentString: "",
                processedString: "",
                prompted: false,
                paused: false
            }
        };
    
    
        process.stdin.on('keypress', function (ch, key) {
            if (key && key.ctrl && key.name == `c`) {
                clearInterval(xEnvs.console.blinkingInterval);
                log(`The app has stopped`, { returnRaw: true, type: `warning`, color: `#FFFFFF` }).then(data => logU(eval(data)));
                process.stdin.pause();
                return setTimeout(() => { process.exit(0); }, 50);
            }
            if (!key) editString({ type: `add`, info: ch });
            else if (key && !ch) {
                if (key.name == `up`) {
                    if (xEnvs.console.commandHistory.past.length == 0) return;
                    xEnvs.console.commandHistory.currentNum--;
                    if (xEnvs.console.commandHistory.lastKey == `down`) xEnvs.console.commandHistory.currentNum--;
                    xEnvs.console.commandHistory.lastKey = key.name;
                    if (xEnvs.console.commandHistory.currentNum == (xEnvs.console.commandHistory.past.length)) {
                        xEnvs.console.currentString = xEnvs.console.commandHistory.past[xEnvs.console.commandHistory.currentNum];
                    } else if (xEnvs.console.commandHistory.currentNum == -1) {
                        xEnvs.console.commandHistory.currentNum = (xEnvs.console.commandHistory.past.length - 1);
                        xEnvs.console.currentString = xEnvs.console.commandHistory.past[xEnvs.console.commandHistory.currentNum];
                    } else xEnvs.console.currentString = xEnvs.console.commandHistory.past[xEnvs.console.commandHistory.currentNum];
                } else if (key.name == `down`) {
                    if (xEnvs.console.commandHistory.past.length == 0) return;
                    xEnvs.console.commandHistory.currentNum++;
                    if (xEnvs.console.commandHistory.lastKey == `up`) xEnvs.console.commandHistory.currentNum++;
                    xEnvs.console.commandHistory.lastKey = key.name;
                    if (xEnvs.console.commandHistory.currentNum <= (xEnvs.console.commandHistory.past.length)) {
                        xEnvs.console.currentString = xEnvs.console.commandHistory.past[xEnvs.console.commandHistory.currentNum - 1];
                    } else xEnvs.console.commandHistory.currentNum = xEnvs.console.commandHistory.past.length;
                }
                if (key && key.shift && key.name == `end`) {
                    xEnvs.console.commandHistory.past = [];
                    xEnvs.console.commandHistory.currentNum = 0;
                    log(`Cleared the console's past`, { returnRaw: true, type: `success` }).then(data => logU(eval(data)));
                    log();
                    xEnvs.console.currentString = ``;
                }
            } else {
                if (key.name == `return`) {
                    if (xEnvs.console.currentString == ``) return;
                    if (xEnvs.console.commandHistory.past[(xEnvs.console.commandHistory.past.length - 1)] != xEnvs.console.currentString) xEnvs.console.commandHistory.past.push(xEnvs.console.currentString);
                    xEnvs.console.commandHistory.currentNum = xEnvs.console.commandHistory.past.length;
                    xEnvs.console.prompted = false;
                    let args = xEnvs.console.currentString.split(` `);
                    let command = args.shift();
                    let str = args.length == 0 ? `` : ` ${args.join(`,`).replace(/,/g, ` `)}`;
                    if (xEnvs.console.commands.files.includes(`${command}.js`)) logU(eval(log(chalk.hex("#4eeeee")(command) + str, { returnRaw: true })));
                    else logU(eval(log(chalk.hex("#FF3333")(command + str), { returnRaw: true })));
                    call({ platform: `console`, call: `command` }, command, args);
                } else if (key.name == `backspace`) editString({ type: `bs`, info: null });
                else editString({ type: `add`, info: key.sequence });
            }
    
            function editString(input) {
                if (input.type == `bs`) {
                    xEnvs.console.currentString = xEnvs.console.currentString.substring(0, xEnvs.console.currentString.length - 1);
                    if (xEnvs.console.currentString == ``) xEnvs.console.commandHistory.currentNum = xEnvs.console.commandHistory.past.length;
                    runLog();
                } else if (input.type == `add`) { xEnvs.console.currentString = xEnvs.console.currentString + input.info; runLog(); }
            }
    
            function runLog() {
                let args = xEnvs.console.currentString.split(` `);
                let command = args.shift();
                let str = args.length == 0 ? `` : ` ${args.join(`,`).replace(/,/g, ` `)}`;
                if (xEnvs.console.commands.files.includes(`${command}.js`)) logU(eval(log(chalk.hex("#4eeeee")(command) + str + (xEnvs.console.blinking ? `|` : ``), { returnRaw: true })));
                else logU(eval(log(chalk.hex("#FF3333")(command + str) + (xEnvs.console.blinking ? `|` : ``), { returnRaw: true })));
            }
    
            if (key && key.name == `escape`) { xEnvs.console.commandHistory.currentNum = xEnvs.console.commandHistory.past.length; xEnvs.console.currentString = ``; }
        });
        process.stdin.setRawMode(true);
        process.stdin.resume();
        kp(process.stdin);
        xEnvs.console.prompted = true;
    
        function call(type, name, args) {
            if (type.platform == `console`) {
                let args = xEnvs.console.currentString.split(` `);
                let command = args.shift();
                let str = args.length == 0 ? `` : ` ${args.join(`,`).replace(/,/g, ` `)}`;
                if (xEnvs.console.commands.files.includes(`${command}.js`)) log(chalk.hex("#4eeeee")(command) + str);
                else log(chalk.hex("#FF3333")(command + str));
                
                xEnvs.console.commands.files = fs.readdirSync(join(dir, 'src/console/commands')).filter(file => file.endsWith('.js'));
                xEnvs.console.currentString = ``;
                if (type.call == `command`) {
                    if (xEnvs.console.commands.files.includes(`${name}.js`)) {
                        const filePath = join(xEnvs.console.commands.path, `${name}.js`);
                        const event = require(filePath);
                        event.execute(Object.assign({}, { log, xEnvs }, imports), args)
                        .then(() => { xEnvs.console.prompted = true; })
                        .catch(err => { log(err, { type: `error` }); xEnvs.console.prompted = true; });
                        delete require.cache[require.resolve(filePath)];
                    } else { log(`Unknown Command: ${name}`, { type: `error` }); xEnvs.console.prompted = true; }
                }
            }
        }

        const originalLog = console.log;
        console.log = function() {
            let args = Array.from(arguments);
            xEnvs.console.prompted = false;
            xEnvs.console.paused = true;
            logU.clear();
            originalLog.apply(console, args);
            xEnvs.console.prompted = true;
        };
    }
}
module.exports = { consoleControl };