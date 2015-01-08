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
  this.stage = null;
}


/**
 * ------------------------------------------------------------
 * Extend Animation prototype
 * ------------------------------------------------------------
 */

Animation.prototype = {

  /**
   * Set stage for random
   * ------------------------------------------------------------
   * @name Animation.setState
   * @param {String} stage ID
   */
  
  setup: function(id) {
    this.stage = document.getElementById(id);

    var sun = document.createElement('div');
    sun.id = 'sun';
    sun.className = 'center-galaxy';

    this.stage.appendChild(sun);
  },


  /**
   * Add planet to stage
   * ------------------------------------------------------------
   * @name Animation.addPlanet
   * @param {String} planet name
   * @param {Number} deg for transform
   * @param {Number} animation time
   */
  
  addPlanet: function(name, deg, time) {

    if (deg == null) { deg = 0; }
    if (time == null) { time = 5; }

    var styles = [
          'transform: rotateZ(' + deg + 'deg)',
          // '-webkit-animation: orbit ' + time + 's infinite linear;',
          'transform: rotateZ(' + (deg - (deg * 2)) + 'deg) translate3d(-50%,-50%,0);'
        ],
        id = 'planet-' + name,
        tpl = '<div id="' + id + '" class="center-galaxy null-ctrl-planet" style="' + styles[0] + '">' +
                '<div class="planet">' +
                  '<div class="ground" style="' + styles[1] + '">' + name + '</div>' +
                '</div>' +
              '</div>',
        planet = util.parseHTML(tpl);


    this.stage.appendChild( planet );


    var degx = 0;
    var update = function() {
      if (degx > 360) {
        degx = 0;
      }
      document.getElementById(id).querySelector('.planet')
        .style['webkitTransform'] = 'rotateY(' + degx + 'deg)' +
                                    'translate3d(0, 0, 200px)' +
                                    'rotateY(' + (degx - (degx * 2)) + 'deg)';
      degx++;
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  },


  /**
   * Remove planent from stage
   * ------------------------------------------------------------
   * @name Animate.removePlanet
   * @param {String} Planet name
   */
  
  removePlanet: function(name) {

    var targetPlanet = document.getElementById('planet-' + name);
    if (targetPlanet) {

      // do animate remove node before remove element
      // *** CODE HERE ***

      targetPlanet.parentNode.removeChild(targetPlanet);
    }

  }

};


/**
 * ------------------------------------------------------------
 * Exports function
 * ------------------------------------------------------------
 */

exports('Animation', Animation);


}).call(this);