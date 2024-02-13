/**
 * ***Cuss Check***  \
 * Checks a string for words against the registered words in the Anti-cuss API
 *
 * *Recommended* Example:
 * ```js
 * //Call the API
 * const { check } = require("flaggedapi")
 *
 * // Defined String that you want to check
 * let CheckString = `Doesn't matter, frick you nerd, you peice of crap`;

 * //Any words that you don't want flagged
 * let ignored_words_array = [`Words`, `You`, `Don't`, `Want`, `Checked`, `Crap`];
 * 
 * //Words that you do what flagged by the api that are not added to the main list
 * let custom_words: [`nerd`]
 *
 * //Use check()
 * check(CheckString, { custom_words: custom_words, ignored_words: ignored_words_array, level: 4 }).then(data => {
 *   console.log(data); //=>
 *   //{
 *   //    number_of_words: 2,
 *   //    words: [
 *   //      {
 *   //        cussword: 'frick',
 *   //        language: 'english',
 *   //        level: 4,
 *   //        reference: 'https://www.urbandictionary.com/define.php?term=Frick',
 *   //        origin: 'api'
 *   //      },
 *   //      { cussword: 'nerd', level: 1, origin: 'custom' }
 *   //    ]
 *   //}
 * })
 * ```
 * 
 * @param {String} searchString **The string that you want to check for cuss words.**
 * @param {Object} [options] **The options that you want to use while checking.**
 * @param {Array} [options.ignored_words] **Words that you don't want flagged by the API**
 * @param {Number} [options.level] **A numeral value that determines what type of words are caught, starting at 1.**  \
 * The lower the value, the more servre the word is.  \
 * Let's say that *"nerd"* is very offensive, so it's `level: 1`.  \
 * And *"non"* is not that offensive, but is still somewhat bad, so we set the value to `level: 3`.  \
 * If the `searchString` value is `"Hey nerd, your a non!"` with `options.level: 2`, *"nerd"* will be caught but *"non"* will not be.
 * @param {Array} [options.custom_words] **Words that you want flagged by the API**.  \
 * Words that are added here will be included into the cuss list, all words are marked as `level: 1` to have it catch them
 * @returns {Object}
 * @since **`3.0.0`**
 */
function check(searchString, options) {
    return new Promise((res, rej) => {
        fetch(`https://raw.githubusercontent.com/TheFlagen430297/FlaggedAPI/dev/db/cussList.json`).then(response => response.json()).then(data => {
            let found_cuss = { number_of_words: 0, words: [] };
            searchString = searchString.toLowerCase();
            if (options && options.custom_words) options.custom_words.forEach((item, index, array) => { data.push({ cussword: item.toLowerCase(), level: 1, origin: `custom`}); });
            data.forEach((item, index, array) => {
                if (index == array.length - 1) res(found_cuss);
                if (options && options.level < item.level) return;
                if (options && options.ignored_words && options.ignored_words.find(x => x === item.cussword)) return;
                if (searchString.includes(item.cussword)) {
                    found_cuss.number_of_words++;
                    found_cuss.words.push(item);
                }
            });
        })
    });
}

module.exports = { check };