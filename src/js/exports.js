(function() {

'use strict';


var exports_storage = {};


/**
 * Clone object.
 * ------------------------------------------------------------
 * @name Random.clone
 * @param {Object} object is want to clone.
 * @return {Object} object it is not inherit of another.
 */

function clone(from) {
  var name, to;
  to = {};
  for (name in from) {
    if (from.hasOwnProperty(name)) {
      to[name] = from[name];
    }
  }
  return to;
}


function cloneFunction(func) {
  function F() {}
  F.apply(func);
  return F;
}


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
    if (exports_storage[name]) {
      throw new Error('Exports name `' + name + '` is already exist.');
    }

    exports_storage[name] = func;
  };


  /**
   * Require function
   * ------------------------------------------------------------
   * @name require
   * @param {String} context name (set to `__list` for view exports avaliable right now)
   * @param {Boolean} clone object/function or not
   * @return {Object} export function
   */

  window.require = function(name, clone_this) {

    if (name === '__list') {
      var exports_avaliable = [];
      for (var _name in exports_storage) {
        exports_avaliable.push(_name);
      }
      return exports_avaliable;
    }
    else {

      var resource = exports_storage[name];

      if (resource) {

        // set default clone argument
        if (clone_this == null) { clone_this = false; }

        if (clone_this) {

          if (typeof resource === 'function') {
            resource = cloneFunction(resource);
          }
          else if (typeof resource === 'object') {
            resource = clone(resource);
          }

        }

        return resource;
      }

    }
  };

}
else {

  throw new Error('function `exports` or `require` is alreay exits.');

}


}).call(this);