(function() {

'use strict';

var util = transit.require('util'),
    groups = transit.require('groups'),
    random = transit.require('_random'),
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
 * `GOD` alway with you !
 * ------------------------------------------------------------
 * @name GOD
 * @param {String} Message for ask GOD for help
 */


window.GOD = function(request_message) {

  var success = true;

  switch (request_message) {

    case 'new world':
      random.clear();
      setTimeout(function() {
        window.location.reload();
      });
      break;


    default:
      success = false;
      console.warn('GOD don\'t hear you !');

  }

  if (success) {
    console.info('GOD, listen to your request !!!');
  }

}



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
  anim.shufflePlanet();
});



}).call(this);