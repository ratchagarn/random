(function() {

'use strict';

var util = transit.require('util'),
    groups = transit.require('groups'),
    random = new ( transit.require('Random') )(),
    anim = new ( transit.require('Animation') )();


/**
 * ------------------------------------------------------------
 * Setup stage
 * ------------------------------------------------------------
 */

anim.setup('galaxy');


/**
 * ------------------------------------------------------------
 * Add planet to stage
 * ------------------------------------------------------------
 */

$.map(groups, function(item, i) {

  anim.addPlanet( item );

});


anim.ready();


// for programatic
window.anim = anim;


/**
 * ------------------------------------------------------------
 * Bind shortkey
 * ------------------------------------------------------------
 */


Mousetrap.bind('space', function() {
  anim.steady();
});

Mousetrap.bind('r', function() {
  anim.go();
});

Mousetrap.bind('p', function() {
  anim.pause();
});

Mousetrap.bind('s', function() {
  anim.shafflePlanet();
});



}).call(this);