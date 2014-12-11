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
   * @param {String} context name
   * @return {Object} export function
   */

  window.require = function(name) {
    if (exports_function[name]) {
      return exports_function[name];
    }
  };

}
else {

  throw new Error('function `exports` or `require` is alreay exits.');

}


}).call(this);