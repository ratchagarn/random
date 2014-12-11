(function() {

'use strict';

var random = new Random({
  source: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  autoSaveState: true
});


var $doPop = $('#do-pop'),
    $doRollback = $('#do-rollback'),
    $doReset = $('#do-reset'),
    $doSaveState = $('#do-save-state'),
    $doDeleteState = $('#do-delete-state'),
    $popResult = $('#pop-result'),
    $source = $('#source');


function showRandomResult(action) {
  if (action === 'pop') {
    $popResult.text( random.pop() );
  }
  else if (action === 'rollback') {
    random.rollback();
    console.log('Rollback');
  }
  else if (action === 'reset') {
    random.reset();
    console.log('Reset');
  }

  $source.text( random.source );
}


// bind click random pop
$doPop.on('click', function() {
  showRandomResult('pop');
});

$doRollback.on('click', function() {
  showRandomResult('rollback');
});

$doReset.on('click', function() {
  showRandomResult('reset');
});

$doSaveState.on('click', function() {
  if (random.saveState()) {
    alert('Save state complete\nTry to refresh this page for see result.');
  }
  else {
    alert('Error !, Can\'t save state right now !!');
  }
});

$doDeleteState.on('click', function() {
  if (random.deleteState()) {
    alert('Delete state complete\nTry to refresh this page for see result.');
  }
  else {
    alert('Error !, Can\'t delete state right now !!');
  }
});


showRandomResult();


window.random = random;


}).call(this);