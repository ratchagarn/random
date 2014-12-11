(function() {

'use strict';

var global = this,
    Random = global.Random;


/**
 * ------------------------------------------------------------
 * Extend core prototype
 * ------------------------------------------------------------
 */

Random.extend({

  hookInit: function() {
    // load plugin animation
    this.animation = new ( Random.loadPlugin('Animation') )();
    // console.log(this.animation);
  },

  play: function() {
    console.log('Play');
  }

});


}).call(this);