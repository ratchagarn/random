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
    this.stage = null,
    this.total_planets = 0;
  },


  /**
   * Set stage for random
   * ------------------------------------------------------------
   * @name Animation.setState
   * @param {String} stage ID
   */
  
  setup: function(id) {
    this.stage = document.getElementById(id);
    this.total_planets = 0;

    var sun = document.createElement('div');
    sun.id = 'sun';
    sun.className = 'center-galaxy';

    this.stage.appendChild(sun);
  },


  /**
   * Add planet to stage
   * ------------------------------------------------------------
   * @name Animation.addPlanet
   * @param {Object} setting
   *        - {String} planet name
   *        - {Number} deg for transform
   *        - {Number} animation time
   */
  
  addPlanet: function(settings) {

    var that = this,
        default_settings = {
          deg: 0,
          radius: 200,
          delay: -1
        };

    settings = util.extend(default_settings, settings);

    var styles = [
          'transform: rotateZ(' + settings.deg + 'deg)',
          // '-webkit-animation: orbit ' + time + 's infinite linear;',
          'transform: rotateZ(' + (settings.deg - (settings.deg * 2)) + 'deg) translate3d(-50%,-50%,0);'
        ],
        id = 'planet-' + settings.name,
        tpl = '<div id="' + id + '" class="center-galaxy null-ctrl-planet" style="' + styles[0] + '">' +
                '<div class="planet" data-degx="0" data-radius="' + settings.radius + '">' +
                  '<div class="ground" style="' + styles[1] + '">' + settings.name + '</div>' +
                '</div>' +
              '</div>',
        planet = util.parseHTML(tpl);


    if (settings.delay === -1) {
      this.stage.appendChild( planet );
    }
    else {
      setTimeout(function() {
        that.stage.appendChild( planet );
      }, settings.delay);
    }

    this.total_planets++;

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

  },


  /**
   * Play planet animation
   * ------------------------------------------------------------
   * @name Animate.play
   */
  
  play: function() {

    var that = this,
        planets = [],
        degx = 0,
        // speed = [0.2, 0.4, 0.3, 0.5, 0.6, 0.1, 0.7, 0.8, 1, 0.9];
        speed = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    var update = function() {
      if (planets.length < that.total_planets) {
        planets = that.stage.querySelectorAll('.planet');
      }

      for (var i = 0, len = planets.length; i < len; i++) {

        var el = planets[i],
            degx = parseFloat( el.getAttribute('data-degx') ),
            radius = parseFloat( el.getAttribute('data-radius') );

        if (degx > 360) {
          degx = 0;
        }
        el.style['webkitTransform'] = 'rotateY(' + degx + 'deg)' +
                                      'translate3d(0, 0, ' + radius + 'px)' +
                                      'rotateY(' + (degx * -1) + 'deg)';

        el.setAttribute('data-degx', degx + speed[i]);
      }

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

};


/**
 * ------------------------------------------------------------
 * Exports function
 * ------------------------------------------------------------
 */

exports('Animation', Animation);


}).call(this);