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