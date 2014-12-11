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