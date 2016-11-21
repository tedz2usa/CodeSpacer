
var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var submitButton, inputTextArea, markedOutput;
var rawLines, splitLines;

function init() {

  submitButton = document.getElementById('submitButton');
  submitButton.onclick = submit;

  inputTextArea = document.getElementById('inputText');
  markedOutput = document.getElementById('markedOutput');

  submitButton.click();


}

function submit() {
  log("Button Clicked!");

  getRawLines();
  var leftIndent = getLeftIndent();
  getSplitLines();
  output();

}

function output() {
  for (var i = 0; i < splitLines.length; i++) {
    var line = splitLines[i];
    var domLine = document.createElement('div');
    domLine.className = 'outputLine';

    for (var j = 0; j < line.length; j++) {
      var domLineFragement = document.createElement('div');
      domLineFragement.textContent = line[j];
      domLineFragement.className = 'outputLineFragment';
      domLine.appendChild(domLineFragement);
    }

    markedOutput.appendChild(domLine);
  }
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
