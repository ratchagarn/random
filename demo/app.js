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
    random.addPlanet( item.name, item.deg, item.time );
  }, item.delay);

});


window.random = random;


}).call(this);