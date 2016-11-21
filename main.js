
var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var submitButton, inputTextArea;
var rawLines;

function init() {

  submitButton = document.getElementById('submitButton');
  submitButton.onclick = submit;

  inputTextArea = document.getElementById('inputText');


}

function submit() {
  log("Button Clicked!");

  getRawLines();
  getLeftIndent();


}

function getRawLines() {
  rawLines = inputTextArea.value.split("\n");
  log(rawLines);
}

function getLeftIndent() {

  for (var i = 0; i < rawLines.length; i++) {
    log(rawLines[i]);
  }

}
