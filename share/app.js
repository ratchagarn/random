(function() {

'use strict';

var util = require('util'),
    groups = require('groups'),
    random = new Random();


/**
 * ------------------------------------------------------------
 * Setup stage
 * ------------------------------------------------------------
 */

random.setup('galaxy');


/**
 * ------------------------------------------------------------
 * Add planet to stage
 * ------------------------------------------------------------
 */

$.map(groups, function(item, i) {

  setTimeout(function() {
    random.addPlanet( item );
  }, 100 * i);

});


random.play( groups.length );


window.random = random;


}).call(this);