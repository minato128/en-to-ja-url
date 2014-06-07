var default_culture1 = 'en-us';
var default_culture2 = 'ja-jp';

window.onload = function(){
  restore_options();
  document.getElementById('save').onclick = save_options;
  document.getElementById('clear').onclick = clear_options;
};

// Saves options to localStorage.
function save_options() {
  localStorage['culture1'] = document.getElementById('culture1').value;
  localStorage['culture2'] = document.getElementById('culture2').value;

  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.innerHTML = 'Options Saved.';
  setTimeout(function() {
    status.innerHTML = '';
  }, 750);
}

// Restores options to saved value from localStorage.
function restore_options() {
  document.getElementById('culture1').value = localStorage['culture1'] || default_culture1;
  document.getElementById('culture2').value = localStorage['culture2'] || default_culture2;
}

// Clear Option from localStorage.
function clear_options() {
  document.getElementById('culture1').value = default_culture1;
  document.getElementById('culture2').value = default_culture2;
}

