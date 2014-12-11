(function() {

'use strict';


var exports_function = {};


/**
 * Exports function
 * ------------------------------------------------------------
 * @name exports
 * @param {String} context name
 * @param {Function} export function
 */

if (!window.exports && !window.require) {

  window.exports = function(name, func) {
    // check exports function exist or not
    if (exports_function[name]) {
      throw new Error('Exports name `' + name + '` is already exist.');
    }

    exports_function[name] = func;
  };


  /**
   * Require function
   * ------------------------------------------------------------
   * @name require
   * @param {String} context name (set to `__list` for view exports avaliable right now)
   * @return {Object} export function
   */

  window.require = function(name) {
    if (name === '__list') {
      var exports_avaliable = [];
      for (var _name in exports_function) {
        exports_avaliable.push(_name);
      }
      return exports_avaliable;
    }
    else {
      if (exports_function[name]) {
        return exports_function[name];
      }
    }
  };

}
else {

  throw new Error('function `exports` or `require` is alreay exits.');

}


}).call(this);