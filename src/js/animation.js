(function($) {

'use strict';


var global = this,
    util = transit.require('util'),
    groups = transit.require('groups'),
    random = transit.require('_random');


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
    this._stage = null,
    this._total_planets = 0;
    this._deg_range = 0;
    this._animate_state = 'play'; // play/pause
    this._new_round = false;
    this._html = document.getElementsByTagName('html')[0];

    this._sfx = {
      bg: new Audio('../src/public/sfx/bg.mp3'),
      open: new Audio('../src/public/sfx/open.mp4'),
      end: new Audio('../src/public/sfx/end.mp4'),
      tik: new Audio('../src/public/sfx/tik.mp4')
    };

    this._sfx.open.loop = true;
    this._sfx.bg.loop = true;
    this._sfx.bg.play();
  },


  /**
   * Set stage for random
   * ------------------------------------------------------------
   * @name Animation.setState
   * @param {String} stage ID
   */
  
  setup: function(id) {
    this._stage = document.getElementById(id);
    this._total_planets = 0;

    var tpl = '<div id="sun">' +
                '<div id="sun-glow"></div>' +
                '<div id="sun-aura-slow" class="sun-aura spin-slow"></div>' +
                '<div id="sun-aura-fast" class="sun-aura spin-fast"></div>' +
                '<div id="sun-face"></div>' +
              '</div>',
        sun = util.parseHTML(tpl);

    this._stage.appendChild(sun);
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
   * Get all planets element nodes
   * ------------------------------------------------------------
   * @name Animation.getAllPlanetNodes
   * @param {Function} callback for node
   */

  getPlanetAllNodes: function(callback) {
    var all_planets = this._stage.querySelectorAll('.planet-container');
    for (var i = 0, len = all_planets.length; i < len; i++) {
      callback( all_planets[i], i, groups[i] );
    }
  },


  /**
   * Get all planets settings
   * ------------------------------------------------------------
   * @name Animation.getAllPlanetsSettings
   * @param {Function} callback for settings
   */

  getAllPlanetsSettings: function(callback) {
    for (var i = 0; i < this._total_planets; i++) {
      callback( groups[i], i );
    }
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
        index = this._total_planets;

    settings = util.extend(default_settings, settings);

    var styles = [
          'transform: rotateZ(' + settings.deg + 'deg)',
          'transform: rotateZ(' + (settings.deg * -1) + 'deg) translate3d(-50%,-50%,0);'
        ],
        id = 'planet-' + settings.name,
        container_class = 'center-galaxy null-ctrl-planet planet-container',
        tpl = '<div id="' + id + '" class="' + container_class + '" style="' + styles[0] + '">' +
                '<div class="planet">' +
                  '<div class="ground" style="' + styles[1] + '">' + settings.name + '</div>' +
                '</div>' +
              '</div>',
        planet = util.parseHTML(tpl);


    if (settings.delay === -1) {
      this._stage.appendChild( planet );
    }
    else {
      setTimeout(function() {
        that._stage.appendChild( planet );
      }, settings.delay);
    }

    this._total_planets++;
    this._deg_range = 360 / this._total_planets;
  },


  /**
   * Remove planent from stage
   * ------------------------------------------------------------
   * @name Animate.removePlanet
   * @param {String} Planet name
   * @param {Number} Planet index
   * @param {Function} Callback function fire after remove finish
   */
  
  removePlanet: function(name, index, callback) {

    var targetPlanet = this.getPlanetNode(name);
    if (targetPlanet) {

      // do animate remove node before remove element
      targetPlanet.classList.add('planet-out');
      this._sfx.open.pause();
      this._sfx.open.currentTime = 0;
      this._sfx.end.play();

      setTimeout(function() {

        // remove setting
        groups.splice(index, 1);

        // remove planet element
        targetPlanet.parentNode.removeChild(targetPlanet);

        // fire callback
        ( callback || util.noop )();

      }, 1000);
    }

  },


  /**
   * description
   * ------------------------------------------------------------
   * @name name
   * @param {String/Number/Object/Function/Boolean} desc
   * @return {String/Number/Object/Function/Boolean} desc
   */

  shufflePlanet: function() {

    this._animate_state = 'play';
    this.stopShakeStage();
    this._stage.classList.remove('random-steady');

    this.getAllPlanetsSettings(function(settings, i) {
      // update settings
      
      // var speed = util.rand(1, 2),
      var speed = 0,
          deg = util.rand(36, 360),
          radius = 200 + (util.rand(10, 30) * (i + 1));

      speed += util.rand(20, 99) / 100;

      TweenLite.to(settings, 1, {
        deg: deg,
        radius: radius,
        speed: speed
      });

    });

  },


  /**
   * Shake stage
   * ------------------------------------------------------------
   * @name Animate.shakeStage
   */
  
  shakeStage: function() {
    if ( !this._html.classList.contains('shake') ) {
      this._html.classList.add('shake');
      this._sfx.bg.pause();
      this._sfx.bg.currentTime = 0;
      this._sfx.open.play();
    }
  },


   /**
   * stop shake stage
   * ------------------------------------------------------------
   * @name Animate.stopShakeStage
   */

  stopShakeStage: function() {
    this._html.classList.remove('shake');
    this._sfx.open.pause();
    this._sfx.open.currentTime = 0;
    this._sfx.bg.play();
  },


  /**
   * Start planet animation
   * ------------------------------------------------------------
   * @name Animate.ready
   */
  
  ready: function() {

    setTimeout(function() {
      document.body.classList.add('fade-in');
    }, 250);

    var that = this,
        planets = [];

    var update = function() {

      if (that._animate_state !== 'out') {

        if (planets.length < that._total_planets || that._new_round) {
          planets = that._stage.querySelectorAll('.planet-container');
          that._new_round = false;
        }

        for (var i = 0, len = planets.length; i < len; i++) {

          var planet = planets[i],
              settings = groups[i],
              deg = settings.deg,
              degx = settings.degx,
              radius = settings.radius,
              speed = settings.speed;

          if (degx >= 360) {
            degx = 0;
          }


          planet.setAttribute('style', 'transform: rotateZ(' + deg + 'deg)');
          planet.querySelector('.planet')
            .setAttribute('style', 'transform: rotateY(' + degx + 'deg) translate3d(0, 0, ' + radius + 'px) rotateY(' + (degx * -1) + 'deg)');
          planet.querySelector('.ground')
            .setAttribute('style', 'transform: rotateZ(' + (deg * -1) + 'deg) translate3d(-50%,-50%,0);');

          settings.degx = degx + speed;

        }

      }

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  },


  /**
   * Random preparation
   * ------------------------------------------------------------
   * @name Animation.steady
   */

  steady: function() {

    if ( this._animate_state === 'steady' || this._html.classList.contains('shake')) {
      return;
    }
    this._animate_state = 'steady';

    var that = this,
        index_shuffle = [];

    groups.forEach(function(item, i) {
      index_shuffle.push(i);
    });

    index_shuffle = util.shuffle(index_shuffle);

    // this.pause();
    this.getAllPlanetsSettings(function(settings, i) {
      // update settings

      TweenLite.to(settings, 2, {
        deg: 180,
        degx: (that._deg_range * index_shuffle[i]) % 360,
        radius: 200,
        speed: 0,
        onComplete: function() {
          that.pause();
          that._stage.classList.add('random-steady');
          setTimeout(function() {
            that.shakeStage();
            that.play(4, 10, function() {
              // console.log('Ready for Chosen one !!');
            });
          }, 1000);
        }
      });

    });

  },


  /**
   * Choice planet by stop animation
   * ------------------------------------------------------------
   * @name Animation.go
   */

  go: function() {

    var that = this,
        stop = false,
        updateFinalSettings = function() {

          that.getAllPlanetsSettings(function(settings, i) {

            var target_degx = Math.ceil( settings.degx / that._deg_range ) * that._deg_range;

            TweenLite.to(settings, 1, {
              degx: target_degx,
              speed: 0,
              onComplete: function() {

                that._animate_state = 'out';
                console.log(settings.name, '====>', settings.degx);
                if (settings.degx === 360) {
                  console.log('Random get ', settings.name);

                  that._new_round = true;

                  setTimeout(function() {

                    that.removePlanet(settings.name, i, function() {
                      random.popByIndex(i);
                      console.log(random.source);
                      recalulatePosition();
                    });

                  }, 1500);

                }

              }
            });

          });
        },
        recalulatePosition = function() {
          that.stopShakeStage();
          that._total_planets--;
          that._deg_range = 360 / that._total_planets;
          that.shufflePlanet();
        };

    // hot fixed bug (force animation state to `play`)
    this._animate_state = 'play';

    // duration, speed
    var duration = util.rand( 5, 7 );
    this.pause(duration, 0.5, function() {
      if (!stop) {
        console.log('Go finish !');
        stop = true;
        that._stage.classList.remove('random-steady');
        updateFinalSettings();
      }

    });
  },


  /**
   * Play planet animation
   * ------------------------------------------------------------
   * @name Animation.play
   * @param {Number} speed duration
   * @param {Number} animation speed
   * @param {Function} callback fire after play finish
   */

  play: function(duration, speed, callback) {
    if (duration == null) { duration = 1; }
    if (speed == null) { speed = 1; }

    this._animate_state = 'play';
    this.getAllPlanetsSettings(function(settings, i) {
      TweenLite.to(settings, duration, {
        speed: speed,
        onComplete: function() {
          ( callback || util.noop )();
        }
      });
    });
  },


  /**
   * Pause planet animation
   * ------------------------------------------------------------
   * @name Animation.pause
   * @param {Number} reduce speed duration
   * @param {Number} lastest speed
   * @param {Function} callback fire after pause animation finish
   */

  pause: function(duration, speed, callback) {
    // if (this._animate_state === 'steady') {
    //   console.warn('Can\'t stop! (Animation is `steady` state)');
    //   return;
    // }

    if (duration == null) { duration = 1; }
    if (speed == null) { speed = 0; }

    var that = this;

    if (this._animate_state === 'pause') {
      this.resume();
    }
    else {
      this.getAllPlanetsSettings(function(settings, i) {
        TweenLite.to(settings, duration, {
          speed: speed,
          // onUpdate: function() {
          //   console.log('Update pause !');
          // },
          onComplete: function() {
            that._animate_state = 'pause';
            (callback || util.noop)();
          }
        });
      });
    }
  },

  /**
   * Resume planet animation (alias of method play)
   * ------------------------------------------------------------
   * @name Animate.resume
   */

  resume: function() {
    this.play();
  }

};


/**
 * ------------------------------------------------------------
 * Exports function
 * ------------------------------------------------------------
 */

transit.exports('Animation', Animation);


}).call(this, jQuery);