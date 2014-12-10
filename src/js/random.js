(function() {

'use strict';

var global = this;


/**
 * ------------------------------------------------------------
 * Util
 * ------------------------------------------------------------
 */


var util = {

  /**
   * Blank function
   * ------------------------------------------------------------
   * @name Random.noop
   * @return {Function} blank function useful when use as default callback
   */

  noop: function noop() {},


  /**
   * Deep extend object.
   * ============================================================
   * @name extend
   * @param {Object} destination object.
   * @param {Object} object for extend to destination.
   * @return {Object} reference to destination.
   * See: http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
   */

  extend: function(dst, source) {
    for (var prop in source) {
      if (source[prop] && source[prop].constructor && source[prop].constructor === Object) {
        dst[prop] = dst[prop] || {};
        global.util.extend(dst[prop], source[prop]);
      } else {
        dst[prop] = source[prop];
      }
    }
    return dst;
  },


  /**
   * Clone object.
   * ------------------------------------------------------------
   * @name Random.clone
   * @param {Object} object is want to clone.
   * @return {Object} object it is not inherit of another.
   */

  clone: function(from) {
    var name, to;
    to = {};
    for (name in from) {
      if (from.hasOwnProperty(name)) {
        to[name] = from[name];
      }
    }
    return to;
  },


  /**
   * Random number between range
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   * see: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
   * ------------------------------------------------------------
   * @name Random.rand
   * @param {Number} min range
   * @param {Number} max range
   * @return {Number} random number
   */

  rand: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

};


/**
 * ------------------------------------------------------------
 * Core function
 * ------------------------------------------------------------
 */

function Random(options) {
  var default_options = {};
  options = util.extend(default_options, options);
  this.init(options);
}


/**
 * Extend function to core function prototype
 * ------------------------------------------------------------
 * @name Random.extend
 * @param {Function} function for extend to prototype
 */

Random.extend = function(func) {
  // don't override core method.
  Random.prototype = util.extend(func, Random.prototype);
};


// hook Random init
Random.hook = function(hook_func) {
  return (hook_func || util.noop)();
};


/**
 * ------------------------------------------------------------
 * Defined prototype
 * ------------------------------------------------------------
 */

Random.prototype = {

  init: function(options) {
    this.options = this.options || options;
    this.source = this.options.source;
    this.default_source = this.source.slice(0);
    this.rollback_source = [];

    console.log('Init random !');
  },


  /**
   * Reset random source
   * ------------------------------------------------------------
   * @name Random.reset
   * @return {Array} default source
   */
  
  reset: function() {
    this.source = this.default_source.slice(0);
    return this.source;
  },


  /**
   * Rollback to previous source
   * ------------------------------------------------------------
   * @name Random.rollback
   * @return {Array} previous source
   */
  
  rollback: function() {
    var rollback_source = this.rollback_source.pop();
    if (rollback_source) {
      this.source = rollback_source;
    }
    return this.source;
  },


  /**
   * get random output
   * ------------------------------------------------------------
   * @name Random.pop
   * @param {Boolean} remove source or not
   * @return {String/Number} random output
   */
  
  pop: function(remove) {
    if (remove == null) { remove = true; }

    var rand = util.rand(0, this.source.length - 1),
        output = null;

    if (remove) {
      this.rollback_source.push(this.source.slice(0));
      output = this.source.splice(rand, 1);
    }
    else {
      output = this.source.slice(rand, rand + 1);
    }

    return output[0];
  }

};


/**
 * ------------------------------------------------------------
 * Assign to global scope
 * ------------------------------------------------------------
 */

global.util = util;
global.Random = Random;


}).call(this);