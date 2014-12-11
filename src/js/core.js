(function() {

'use strict';

var global = this,
    slice = Array.prototype.slice,
    util = require('util');


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
 * Exports function
 * ------------------------------------------------------------
 */

exports('Random', Random);


}).call(this);