(function() {

'use strict';

var global = this,
    slice = Array.prototype.slice;


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
  this.options = options;
  this.init();
}


/**
 * ------------------------------------------------------------
 * Assign util to Core
 * ------------------------------------------------------------
 */

Random.util = util;


/**
 * ------------------------------------------------------------
 * comment
 * ------------------------------------------------------------
 */

Random.plugin = {};


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


/**
 * Add plugin
 * ------------------------------------------------------------
 * @name Random.addPlugin
 * @param {String} plugin name
 * @param {Function} plugin function
 */

Random.addPlugin = function(name, func) {

  // check plugin exist or not
  if (Random.plugin[name]) {
    throw new Error('Plugin name `' + name + '` is already exist.');
  }

  Random.plugin[name] = func;
};  


/**
 * Load plugin
 * ------------------------------------------------------------
 * @name Random.loadPlugin
 * @param {String} plugin name
 * @return {Object} Random object for chaning
 */

Random.loadPlugin = function(name) {
  if (Random.plugin[name]) {
    return Random.plugin[name];
  }
};



/**
 * ------------------------------------------------------------
 * Assign prototype
 * ------------------------------------------------------------
 */

Random.prototype = {

  /**
   * Initialize class
   * ------------------------------------------------------------
   * @name Random.init
   * @return {Object} Random object for chaning
   */
  

  init: function() {
    console.log('Init random !');

    var default_options = {};
    this.options = util.extend(default_options, this.options);

    // for init 2nd+
    if (this.default_source) {
      this.options.source = this.default_source.slice(0);
    }

    this.source = this.options.source.slice(0);
    this.default_source = this.source.slice(0);
    this.rollback_source = [];

    // fire hook function
    if (typeof this.hookInit === 'function') {
      this.hookInit.call(this);
    }

    return this;
  },


  /**
   * Set options
   * ------------------------------------------------------------
   * @name Random.setOptions
   * @param {Object} options object for override
   * @return {Object} Random object for chaning
   */
  
  setOptions: function(options) {
    this.options = util.extend(this.options, options);
    return this;
  },


  /**
   * Reset random source
   * ------------------------------------------------------------
   * @name Random.reset
   * @return {Object} Random object for chaning
   */
  
  reset: function() {
    this.source = this.default_source.slice(0);
    return this;
  },


  /**
   * Rollback to previous source
   * ------------------------------------------------------------
   * @name Random.rollback
   * @return {Object} Random object for chaning
   */
  
  rollback: function() {
    var rollback_source = this.rollback_source.pop();
    if (rollback_source) {
      this.source = rollback_source;
    }
    return this;
  },


  /**
   * Remove random source by index
   * ------------------------------------------------------------
   * @name Random.popByIndex
   * @param {Number} index of source
   * @param {Boolean} remove source by index or not
   * @return {Array} source array
   */

  popByIndex: function(index, remove) {
    var output = null;

    if (remove == null) { remove = true; }

    if (remove) {
      this.rollback_source.push(this.source.slice(0));
      output = this.source.splice(index, 1);
    }
    else {
      output = this.source.slice(index, index + 1);
    }

    return output[0];
  },


  /**
   * get random output
   * ------------------------------------------------------------
   * @name Random.pop
   * @param {Boolean} remove source by index or not
   * @return {String/Number} random output
   */

  pop: function(remove) {
    var index = util.rand(0, this.source.length - 1),
        output = this.popByIndex(index, remove);
    return output;
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