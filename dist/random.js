/*!
 * Random version 0.2.1
 * Copyright 2014-Preset
 * Author: Ratchagarn Naewbuntad & Watcharakrit Phantu
 * Licensed under MIT
 */
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
(function() {

'use strict';


var global = this;


/**
 * ------------------------------------------------------------
 * Util
 * ------------------------------------------------------------
 */

var util = (function(context) {

  return {

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

})(global);


/**
 * ------------------------------------------------------------
 * Exports function
 * ------------------------------------------------------------
 */

exports('util', util);


}).call(this);
(function(simpleStorage) {

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
  this.storage_name = 'random_source';
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
 * Do auto save state if options is avaliable
 * ------------------------------------------------------------
 * @name Random.doAutoSaveState
 * @return {Boolean} Save state or not
 */

Random.doAutoSaveState = function(context) {
  if (context.options.autoSaveState) {
    context.saveState();
    return true;
  }
  else {
    return false;
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

    var default_options = {
          source: [],
          autoSaveState: false,
          defaultTTL: 86400000
        },
        random_source_state = this.getState();

    this.options = util.extend(default_options, this.options);
    this.source = this.options.source.slice(0);

    // resume state if avaliable
    if (random_source_state) {
      this.source = random_source_state.slice(0);
    }
    // for init 2nd+
    else if (this.default_source) {
      this.source = this.default_source.slice(0);
    }

    this.default_source = this.options.source.slice(0);
    this.rollback_source = [];


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
   * Get random state
   * ------------------------------------------------------------
   * @name Random.saveState
   * @return {Object} Random object for chaning
   */

  getState: function() {
    return simpleStorage.get(this.storage_name);
  },


  /**
   * Save random state
   * ------------------------------------------------------------
   * @name Random.saveState
   * @return {Object} Random object for chaning
   */

  saveState: function(options) {
    if (options == null) { options = {}; }

    var that = this,
        default_options = {
          TTL: options.defaultTTL || that.options.defaultTTL // one day
        };

    // merge options
    options = util.extend(default_options, options);

    return simpleStorage.set( this.storage_name, this.source, options );
  },


  /**
   * Delete random state
   * ------------------------------------------------------------
   * @name Random.saveState
   * @return {Object} Random object for chaning
   */

  deleteState: function() {
    return simpleStorage.deleteKey( this.storage_name );
  },


  /**
   * Reset random source
   * ------------------------------------------------------------
   * @name Random.reset
   * @return {Object} Random object for chaning
   */
  
  reset: function() {
    this.source = this.default_source.slice(0);
    Random.doAutoSaveState(this);
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
      Random.doAutoSaveState(this);
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

    Random.doAutoSaveState(this);

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


}).call(this, simpleStorage);
(function() {

'use strict';


var global = this,
    util = require('util');


/**
 * Animation core function
 * ------------------------------------------------------------
 * @name Animation
 */

function Animation() {
  this.init();
}


/**
 * ------------------------------------------------------------
 * Extend Animation prototype
 * ------------------------------------------------------------
 */

Animation.prototype = {

  init: function() {
    console.log('Animation init !');
  }

};


/**
 * ------------------------------------------------------------
 * Exports function
 * ------------------------------------------------------------
 */

exports('Animation', Animation);


}).call(this);
(function() {

'use strict';


var global = this,
    Random = require('Random'),
    util = require('util');


/**
 * ------------------------------------------------------------
 * Extend core prototype
 * ------------------------------------------------------------
 */

Random.extend({

  hookInit: function() {
    // load plugin animation
    this.animation = new ( require('Animation') )();
  },

  play: function() {
    console.log('Play');
  }

});


/**
 * ------------------------------------------------------------
 * Assign to global scope
 * ------------------------------------------------------------
 */

global.Random = Random;


}).call(this);