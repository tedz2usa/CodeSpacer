
var log = console.log.bind(console);

window.onload = init;

var submitButton, inputTextArea, markedOutput;
var rawLines, splitLines;
var alignChars;
var sliderAnchorPairs, maxLengths;
var leftIndent;

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
  leftIndent = getLeftIndent();
  getSplitLines();
  performAlignment();

  output();
  log(splitLines);

}

function performAlignment() {

  findMaxLengths();
  expandCells();
  addLeftIndent();

}

function addLeftIndent() {

  for (var i = 0; i < splitLines.length; i++) {
    splitLines[i][0] = leftIndent + splitLines[i][0];
  }

}

function expandCells() {
  log("Expanding cells.");
  for (var i = 0; i < maxLengths.length; i++) {
    var maxLength = maxLengths[i];
    var alignment = "left";
    if (i == 0) {
      alignment = "right";
    }

    // Now apply maxLength for all cells in column i.
    for (var j = 0; j < splitLines.length; j++ ) {
      var cell = splitLines[j][i];
      var diff = maxLength - cell.length;
      var extraSpace = multiplyString(" ", diff);
      if (alignment == "left") {
        if (i != maxLengths.length - 1) { // Do not add extra space at end if on the last column.
          splitLines[j][i] = splitLines[j][i] + extraSpace;
        }
      } else {
        splitLines[j][i] = extraSpace + splitLines[j][i];
      }
      log(splitLines[j][i]);
    }

  }


}

function findMaxLengths() {
  maxLengths = [];

  var sampleSplitLine = splitLines[0];

  for (var i = 0; i < sampleSplitLine.length; i++ ) {
    // Inside column i.
    var maxLength = 0;
    for (var j = 0; j < splitLines.length; j++ ) {
      // Going through all cells of column i.
      var cell = splitLines[j][i];
      if (cell.length > maxLength) {
        maxLength = cell.length;
      }
    }
    // Found maxLength for column i.
    maxLengths.push(maxLength);
  }

  log(maxLengths);
}

function multiplyString(str, amount) {
  var result = "";
  for (var i = 1; i <= amount; i++) {
    result += str;
  }
  return result;
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
