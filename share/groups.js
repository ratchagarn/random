(function() {

'use strict';

var util = require('util'),
    G = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    groups = [];


G.forEach(function(name, i) {

  var deg = 36 * i,
      time = util.rand(10, 12);
  time += util.rand(0, 9) / 10;

  groups.push({
    name: name,
    deg: deg,
    time: time
  });

});


exports('groups', groups);

}).call(this);