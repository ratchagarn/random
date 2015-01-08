(function() {

'use strict';

var util = require('util'),
    G = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    groups = [];


G.forEach(function(name, i) {

  var deg = 36 * i,
      delay = 150 * i;

  groups.push({
    name: name,
    deg: 180,
    radius: 250,
    delay: delay
  });

});


exports('groups', groups);

}).call(this);