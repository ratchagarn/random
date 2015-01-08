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

this.changeit = function() {
  $('head').append(
    '<style>' + 
      '@-webkit-keyframes orbit {' +
        '0%   {transform:rotateY(0deg) translate3d(0,0,0) rotateY(0deg);}' +
        '100% {transform:rotateY(360deg) translate3d(0,0,0) rotateY(-360deg);}' +
      '}' +
    '</style>'
  );
};

exports('groups', groups);

}).call(this);