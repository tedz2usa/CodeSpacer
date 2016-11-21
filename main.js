
var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var submitButton;

function init() {

  submitButton = document.getElementById('submitButton');
  submitButton.onclick = submit;

}

function submit() {
  log("Button Clicked!");
}
