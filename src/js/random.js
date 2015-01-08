(function() {

'use strict';


var global = this,
    Random = require('Random'),
    Animation = require('Animation'),
    util = require('util');


/**
 * ------------------------------------------------------------
 * Extend Animation to core prototype
 * ------------------------------------------------------------
 */

Random.extend( Animation.prototype );


/**
 * ------------------------------------------------------------
 * Extend new method for random
 * ------------------------------------------------------------
 */

// Random.extend({});


/**
 * ------------------------------------------------------------
 * Assign to global scope
 * ------------------------------------------------------------
 */

global.Random = Random;


}).call(this);