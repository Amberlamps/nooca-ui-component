/**
 * Test script.
 */

var selectize = require('./module.js');

selectize('.selectize')
.add([])
.on('add', (value, source) => {
})
.on('delete', (value, source) => {
})
.on('change', (value, source) => {
})
.on('error', (err) => {
})
.on('ready', (data) => {
});