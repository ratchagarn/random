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
    },


    /**
     * Convert HTML string to DOM
     * ------------------------------------------------------------
     * @name parseHTML
     * @param {String} HTML string
     * @return {Object} DOM Node
     */

    parseHTML: function(str) {
      var frag = document.createDocumentFragment(),
          temp = document.createElement('DIV');

      temp.insertAdjacentHTML('beforeend', str);
      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
      // nulling out the reference, there is no obvious dispose method
      temp = null;
      return frag;
    },


    /**
     * Check duplicate value in array
     * ------------------------------------------------------------
     * @name util.checkArrayDup
     * @param {Array} Array for check duplicatie
     * @return {Number} Index of array at duplicate
     */

    checkArrayDup: function(arr) {
      var dup_index = -1;
      for (var i = 0, len_i = arr.length; i < len_i; i++) {
        var current_value = arr[i];
        for (var j = 0, len_j = arr.length; j < len_j; j++) {
          if (i !== j && current_value === arr[j]) {
            dup_index = j;
            return dup_index;
          }
        }
      }
      return dup_index;
    },


    /**
     * Shuffle array
     * see: http://phpjs.org/functions/shuffle/
     * ------------------------------------------------------------
     * @name util.shuffle
     * @param {Array} Array for shuffle
     */

    shuffle: function(inputArr) {
      //   example 1: ini_set('phpjs.strictForIn', true);
      //   example 1: shuffle(data);
      //   example 1: $result = data;
      //   returns 1: {5:'a', 4:5, 'q':5, 3:'c', 2:'3'}
      //   example 2: var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
      //   example 2: ini_set('phpjs.strictForIn', true);
      //   example 2: var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
      //   example 2: shuffle(data);
      //   example 2: $result = data;
      //   returns 2: {5:'a', 'q':5, 3:'c', 2:'3', 4:5}

      var valArr = [],
        k = '',
        i = 0,
        strictForIn = false,
        populateArr = [];

      for (k in inputArr) {
        // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
          valArr.push(inputArr[k]);
          if (strictForIn) {
            delete inputArr[k];
          }
        }
      }
      valArr.sort(function () {
        return 0.5 - Math.random();
      });

      // BEGIN REDUNDANT
      this.php_js = this.php_js || {};
      this.php_js.ini = this.php_js.ini || {};
      // END REDUNDANT
      strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
        .ini['phpjs.strictForIn'].local_value !== 'off';
      populateArr = strictForIn ? inputArr : populateArr;

      for (i = 0; i < valArr.length; i++) {
        // Repopulate the old array
        populateArr[i] = valArr[i];
      }

      return strictForIn || populateArr;
    }

  };

})(global);


/**
 * ------------------------------------------------------------
 * requestAnimationFrame polyfill
 * ------------------------------------------------------------
 */

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

}());


/**
 * ------------------------------------------------------------
 * Exports function
 * ------------------------------------------------------------
 */

transit.exports('util', util);


}).call(this);