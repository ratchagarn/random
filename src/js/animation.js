(function() {

'use strict';

var global = this,
    util = global.util,
    Random = global.Random;


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
 * Add as Random plugin
 * ------------------------------------------------------------
 */

Random.addPlugin('Animation', Animation);


}).call(this);