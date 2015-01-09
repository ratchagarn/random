(function() {

'use strict';

var util = transit.require('util'),
    G = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    groups = [];


G.forEach(function(name, i) {

  var deg = 37 * i,
      // delay = 10 * i,
      delay = -1,
      // radius = util.rand(200, 400),
      radius = 200 + (50 * (i + 1)),
      // speed = util.rand(1, 4);
      speed = 0;

  deg += 36;
  speed += util.rand(20, 99) / 100;

  groups.push({
    name: name,
    deg: deg % 360,
    degx: 0, // for dynamic
    radius: radius,
    speed: speed,
    delay: delay
  });

});


transit.exports('groups', groups);

}).call(this);