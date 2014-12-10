(function() {

'use strict';

var global = this,
    util = global.util,
    Random = global.Random,
    animation = {};


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

  play: function() {
    console.log('Play animation !');
  }

};


/**
 * ------------------------------------------------------------
 * Extend Random prototype
 * ------------------------------------------------------------
 */

Random.extend(Animation.prototype);


}).call(this);