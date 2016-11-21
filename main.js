
var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var submitButton, inputTextArea;
var rawLines, splitLines;

function init() {

  submitButton = document.getElementById('submitButton');
  submitButton.onclick = submit;

  inputTextArea = document.getElementById('inputText');


}

function submit() {
  log("Button Clicked!");

  getRawLines();
  var leftIndent = getLeftIndent();
  getSplitLines();

}

function getSplitLines() {
  splitLines = [];
  for (var i = 0; i < rawLines.length; i++) {
    splitLines[i] = rawLines[i].trim().split(" ");
    log(splitLines[i]);
  }
}

function getRawLines() {
  rawLines = inputTextArea.value.split("\n");
}

function getLeftIndent() {

  // implies code will not work if indentation is too large.
  var minIndent = "CODE INDENTATION TOO LARGE aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  for (var i = 0; i < rawLines.length; i++) {
    var rawLine = rawLines[i];
    var j;
    for (j = 0; j < rawLine.length && (rawLine[j] === ' ' || rawLine[j] === '\t' ); j++);
    // log(j);
    if (j < minIndent.length) {
      minIndent = rawLine.substring(0, j);
    }
  }
  return minIndent;

}
