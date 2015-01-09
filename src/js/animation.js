(function() {

'use strict';


var global = this,
    util = transit.require('util'),
    groups = transit.require('groups');


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
    this.animate_state = 'stop'; // stop/play
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
   * Get planet element node by name
   * ------------------------------------------------------------
   * @name Animation.getPlanetNode
   * @param {String} planet name
   * @return {Object} planet element node
   */

  getPlanetNode: function(name) {
    var node = document.getElementById('planet-' + name);
    if (!node) {
      console.warn('Can\'t find planet node');
    }
    return node;
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
          degx: 0,
          radius: 200,
          speed: 1,
          delay: -1
        },
        index = this.total_planets;

    settings = util.extend(default_settings, settings);

    var styles = [
          'transform: rotateZ(' + settings.deg + 'deg)',
          'transform: rotateZ(' + (settings.deg * -1) + 'deg) translate3d(-50%,-50%,0);'
        ],
        id = 'planet-' + settings.name,
        container_class = 'center-galaxy null-ctrl-planet planet-container',
        tpl = '<div id="' + id + '" class="' + container_class + '" style="' + styles[0] + '" data-index="' + index + '">' +
                '<div class="planet">' +
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

    var targetPlanet = this.getPlanetNode(name);
    if (targetPlanet) {

      // do animate remove node before remove element
      // *** CODE HERE ***

      targetPlanet.parentNode.removeChild(targetPlanet);
    }

  },


  /**
   * Update planet settings by name
   * ------------------------------------------------------------
   * @name Animate.updatePlanetSettings
   * @param {String} planet name
   * @param {Object} update settings
   */

  updatePlanetSettings: function(name, update_settings) {

    if (update_settings == null) { update_settings = {}; }

    var targetPlanet = this.getPlanetNode(name);
    if (targetPlanet) {
      var index = parseInt( targetPlanet.getAttribute('data-index'), 10 );
      groups[ index ] = util.extend( groups[ index ], update_settings );
      console.log(update_settings, groups[ index ]);
    }

  },


  /**
   * description
   * ------------------------------------------------------------
   * @name name
   * @param {String/Number/Object/Function/Boolean} desc
   * @return {String/Number/Object/Function/Boolean} desc
   */

  shafflePlanet: function() {
    groups.forEach(function(settings, i) {
      var speed = util.rand(0, 1);
      speed += util.rand(0, 99) / 100;
      settings.deg = util.rand(36, 360);
      settings.speed = speed;
    });

    var all_planets = this.stage.querySelectorAll('.planet-container');
    for (var i = 0, len = all_planets.length; i < len; i++) {
      var planet = all_planets[i];
      planet.setAttribute('style', 'transform: rotateZ(' + groups[i].deg + 'deg)');
      planet.querySelector('.ground')
        .setAttribute('style', 'transform: rotateZ(' + (groups[i].deg * -1) + 'deg) translate3d(-50%,-50%,0);');
    }

  },


  /**
   * Play planet animation
   * ------------------------------------------------------------
   * @name Animate.play
   */
  
  play: function() {

    // set state to play
    this.animate_state = 'play';

    var that = this,
        planets = [];

    var update = function() {

      // if state isn't play then do nothing but keep track animate
      if (that.animate_state === 'play') {

        if (planets.length < that.total_planets) {
          planets = that.stage.querySelectorAll('.planet');
        }

        for (var i = 0, len = planets.length; i < len; i++) {

          var el = planets[i],
              settings = groups[i],
              degx = settings.degx,
              radius = settings.radius,
              speed = settings.speed;

          if (degx >= 360) {
            degx = 0;
          }

          el.style['webkitTransform'] = 'rotateY(' + degx + 'deg)' +
                                        'translate3d(0, 0, ' + radius + 'px)' +
                                        'rotateY(' + (degx * -1) + 'deg)';

          settings.degx = degx + speed;
        }

      }

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  },


  /**
   * Pause planet animation
   * ------------------------------------------------------------
   * @name Animate.pause
   */

  pause: function() {
    if (this.animate_state === 'pause') {
      this.resume();
    }
    else {
      this.animate_state = 'pause';
    }
  },


  /**
   * Resume planet animation
   * ------------------------------------------------------------
   * @name Animate.resume
   */

  resume: function() {
    this.animate_state = 'play';
  }

};


/**
 * ------------------------------------------------------------
 * Exports function
 * ------------------------------------------------------------
 */

transit.exports('Animation', Animation);


}).call(this);