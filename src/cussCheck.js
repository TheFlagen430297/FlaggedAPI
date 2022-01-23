const ACL = require(`./ACL`), requestURL = require('request'), Package = require("../package.json");
let env = { preload_cussList: null }, HandleStorage = { e: undefined, r: undefined, b: undefined };

/**
 * ***Cuss Request***  \
 * Checks a string for words against the registered words in the Anti-cuss API
 *
 * @param {String} text
 * **The String that you want to check for a cuss word**
 *
 * @param {{refresh: Boolean, ignored_words: Array}} options
 * **The options that you would like to use**
 *
 * > • ***`refresh`***
 * **Whether to fetch the cuss list from the API**
 * `refresh: true` **or to use the cache** `refresh: false`.  
 * *In most cases, the Cuss List does not need to be refreshed after first run, if you wish to save resources on both ends you can set this to false* 😄
 *
 * > • ***`ignored_words`***
 * **An array of words that you do not want the API to flag as a cuss word**  
 * *In future updates I might make it to where cuss words have levels of severity, which will allow you to pick from a set list. like LMAO is lvl:1 while F### will be lvl:3 or something like that. This will alow more control over what you want and don't want caught by the API*
 *
 * *Recommended* Example:
 * ```js
 * let CheckString = "The String you want to check";
 * let ignored_words_array = [`Words`, `You`, `Don't`, `Want`, `Checked`];
 * client.cussCheck(CheckString, { refresh: false, ignored_words_array }).then(ReturnedData => {
 *      console.log(ReturnedData); //Returns an Object with info.
 *      console.log(ReturnedData.hasCuss); //Returns Boolean.
 *      console.log(ReturnedData.cuss_list); //Returns all cuss words found.
 * }).catch(err => {
 *      console.log(err.error)
 * })
 * ```
 * @see https://theflagen430297.com/API/FlaggedAPI/Home#CussRequest
 */
function request(text, options) {
    if (!options) { options = {} }
    return new Promise(function (resolve, reject) {
        Handler(() => {
            if (!HandleStorage.r || HandleStorage.r.statusCode === 404) return;
            //if (typeof (options) != "object") return ACL.ACD(`Please pass an Object of options, example: { refresh: true }`, `error`);
            //if (options.refresh) QueueList();
            else {
                if (!env.preload_cussList) QueueList();
                else run(null, env.preload_cussList);
            };
            function QueueList() {
                Handler();
                setTimeout(function () {
                    const list = JSON.parse(HandleStorage.b);
                    env.preload_cussList = list;
                    run(null, list);
                }, 500);
            };
        });
        function run(error, list) {
            let err = [];
            if (!error) {
                const found_cuss = [];
                if (typeof (text) != 'string') err;
                for (let index = 0; index < list.length; index++) {
                    const element = list[index].toLowerCase();
                    if ((options.ignored_words ? !options.ignored_words.includes(element) : true) && text.toLowerCase().includes(element)) found_cuss.push(element);
                };
                let data = { hasCuss: found_cuss.length > 0 ? true : false, cuss_list: found_cuss };
                if (err.length === 0) err = null;
                resolve(data);
            } else reject({ error: true});
        };
    })
};
/**
 * ***Cuss List***  \
 * Returns the full list of words
 * @param {Boolean} Array **If `true` it returns the list as an array, if `false` it will print to the console**
 * @param {Array} returned **The array that is returned**  
 * \
 * ***`Code Examples`***  \
 * Use the returned method to get the array value\
 * Example:
 * ```js
 * FlaggedApi.cussCheck.list(true, returned => {
 * console.log(returned); //=> ["Bad", "words"]
 * });
 * ```
 * \
 * Use without the returned method to get a message in the console\
 * Example:
 * ```
 * FlaggedApi.cussCheck.list(); //=> (!) ["Bad", "words"]
 * ```
 * 
 * @see https://theflagen430297.com/API/FlaggedAPI/Home#CussList
 */
function list(Array, returned) {
    Handler(() => {
        let array = HandleStorage.b.replace(/\[|\]/g, "").replace(/\"/g, "").split(/,/g);
        if (!Array) return ACL.log(HandleStorage.b);
        else return returned(array);
    });
};
/**
 * ***Number of blocked Words***  \
 * Returns the number of cuss words
 * 
 * @param returned **If `returned` is used, it returns an Integer, else it will print to the console**  
 * \
 * ***`Code Examples`***  \
 * Use the returned method to get the Integer value\
 * Example:
 * ```js
 * FlaggedApi.cussCheck.number(returned => {
 *     console.log(returned); //=> 183
 * });
 * ```
 * \
 * Use without the returned method to get a message in the console\
 * Example:
 * ```
 * FlaggedApi.cussCheck.number(); //=> There are 183 words in the database, if you would like to contribute and add more words you can summit your words at https://theflagen430297.com/RD#Join
 * ```
 * 
 * @see https://theflagen430297.com/API/FlaggedAPI/Home#CussNumber
 */
function number(returned) {
    let num = 0, array;
    Handler(() => { getNumber(); });
    function getNumber() {
        array = HandleStorage.b.replace(/\[|\]/g, "").replace(/\"/g, "").split(/,/g);
        array.forEach(x => { num++ }); i();
        function i() {
            if (num === array.length) {
                if (!returned) return ACL.log(`There are ${num} words in the database, if you would like to contribute and add more words you can summit your words at https://theflagen430297.com/RD#Join`);
                else return returned(num);
            } else setTimeout(() => { i() }, 50);
        };
    };
};
function Handler(code) {
    let time = new Date();
    requestURL.get('https://storage.theflagen430297.com/API/FlaggedAPI/Cussing/list.txt', function (e, r, b) {
        HandleStorage.e = e; HandleStorage.r = r; HandleStorage.b = b;
        if (!b && !r) return console.log(`Check your internet connection, if this keeps happening please report it at https://theflagen430297.com/RD#Join\n\nErrorCode:\n${e}`);
        else if (!b && r) return Returned_Data(`A connection to the server was made but the server did not send any data, please report this at https://theflagen430297.com/RD#Join`);
        else if (r.statusCode === 404) return ACL.log(`The resource that is required could not be found.\nReinstall the package and try again.\nIf that doesn't work please report it at https://theflagen430297.com/RD#Join\n\nPackage Version: ${Package.version}\nTime: ${time}\n`, true, `error`);
        else setTimeout(function () {
            try {
                code()
            } catch (e) {
                code
            }
        }, 500);
    });
};
module.exports = { request, list, number };