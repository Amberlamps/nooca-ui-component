/**
 * Test script.
 */

var Selectize = require('./module.js');
var selectize = new Selectize();

selectize
.on('ready', () => {
  console.log(arguments);
  console.log('ready');
});