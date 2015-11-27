/**
 * MODULES.
 */
var EventEmitter = require('wolfy87-eventemitter');


/**
 * CLASS.
 */
class Selectize extends EventEmitter {

  constructor() {
    super();
  }

}


/**
 * EXPORTS.
 */
module.exports = Selectize;

// var selectize = require('zuwem-selectize');

// selectize('.zuwem-selectize')
// .on('change', () => {
// })
// .on('delete', () => {
// })
// .on('add', () => {
// });


// var selectize = (selector) => {
//   var targets;
//   try {
//     targets = document.querySelectorAll(selector);
//   } catch(e) {
//     window.setTimeout()
//   }
// };