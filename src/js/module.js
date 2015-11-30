/**
 * MODULES.
 */
var EventEmitter = require('wolfy87-eventemitter');
var autosizeInput = require('autosize-input');


/**
 * VARIABLES.
 */
var itemTemplate = (name) => {
  var fragment = document.createDocumentFragment();
  var item = document.createElement('div');
  item.className = 'selectize-item';
  var text = document.createElement('div');
  text.className = 'selectize-item-text';
  text.innerHTML = name;
  item.appendChild(text);
  return item;
};


/**
 * CLASS.
 */
class Selectize extends EventEmitter {

  constructor(selector) {

    super();

    var targets;

    try {
      targets = document.querySelectorAll(selector);
    } catch(e) {
      window.setTimeout(() => {
        this.emit('error', e);
      }, 1);
    }

    this.elements = [];

    for (var i = 0; i < targets.length; i++) {
      this.elements.push(new Element(this, targets[i]));
    }

  }

  add(items) {

    if (Object.prototype.toString.call(items) !== '[object Array]') {
      items = [items];
    }

    items.forEach((item) => {
      this.elements.forEach((element) => element.add(item));
    });

    return this;
  }

}

class Element {

  constructor(parent, element) {

    this.parent = parent;
    this.element = element;

    this.element.innerHTML = '<div class="selectize-container"><input type="text" class="selectize-input" /></div>';
    this.input = this.element.getElementsByTagName("input")[0]
    this.container = this.element.querySelectorAll('.selectize-container')[0];

    this.currentValue = this.input.value;

    autosizeInput(this.input);
    this.input.addEventListener('keyup', (e) => this.keyup(e));
    this.element.addEventListener('click', (e) => this.click(e));

  }

  add(item) {
    this.container.insertBefore(itemTemplate(item), this.input);
    this.input.value = "";
    return item;
  }

  click(e) {

    this.input.focus();

    var target = e.target || e.srcElement;

    if (target.className.match(/selectize-item-text/)) {
      var value = target.innerHTML;
      this.container.removeChild(target.parentNode);
      this.parent.emit('delete', value, this);
    }

  }

  keyup(e) {

    var keyCode = e.keyCode;

    if (keyCode === 13) {
      this.parent.emit('add', this.add(this.input.value), this);
    } else if (this.input.value !== this.currentValue) {
      this.parent.emit('change', this.input.value, this);
    }

    this.currentValue = this.input.value;

  }

  getItems() {
    let items = this.container.querySelectorAll('.selectize-item-text');
    let values = [];
    for (let i = 0; i < items.length; i++) {
      values.push(items[i].innerHTML);
    }
    return values;
  }

}


/**
 * FUNCTIONS.
 */
function selectizeFactory(selector) {
  var selectize = new Selectize(selector);
  return selectize;
}


/**
 * EXPORTS.
 */
module.exports = selectizeFactory;