(function() {

'use strict';

var util = transit.require('util'),
    G = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    groups = [];


G.forEach(function(name, i) {

  var deg = 36 * i,
      delay = 100 * i,
      // radius = util.rand(200, 400),
      radius = 100 + (50 * (i + 1)),
      // speed = util.rand(1, 4);
      speed = util.rand(0, 1);

  speed += util.rand(0, 99) / 100;

  groups.push({
    name: name,
    deg: deg,
    // deg: 180, // for center
    degx: 0, // for dynamic
    radius: radius,
    speed: speed,
    delay: delay
  });

});


transit.exports('groups', groups);

}).call(this);