const { check, list } = require('./src/cussCheck');
const { consoleControl } = require('./src/consoleControl');
const { ACD, ACDClear, ACDToggle, colors, log, supported, chalk, clear} = require('./src/ACL.js');
module.exports = { ACD, ACDClear, ACDToggle, colors, log, supported, chalk, clear, check, list, consoleControl };