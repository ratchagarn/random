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


anim.play();


// for programatic
window.anim = anim;


/**
 * ------------------------------------------------------------
 * Bind shortkey
 * ------------------------------------------------------------
 */

Mousetrap.bind('p', function() {
  anim.pause();
});

Mousetrap.bind('s', function() {
  anim.shafflePlanet();
});



}).call(this);