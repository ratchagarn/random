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