
var log = console.log.bind(console);

log("Hello!");

window.onload = init;

var submitButton, inputTextArea, markedOutput;
var rawLines, splitLines;
var alignChars;
var sliderAnchorPairs, maxLengths;

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
  // getAlignChars();
  performAlignment();

  output();

}

function performAlignment() {

  findMaxLengths();
  expandCells();

  // Do left indent last.
}

function expandCells() {

  


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


// function expandSliders() {
//
//   for (var i = 0; i < sliderAnchorPairs.length; i++) {
//     var pair = sliderAnchorPairs[i];
//     var maxLength = maxLengths[i];
//
//     for (var j = 0; j < splitLines.length; j++) {
//       var splitLine = splitLines[j];
//       var length = lengthOfFragments(splitLine, pair[0], pair[1]);
//       var diff = maxLength - length;
//       var extraSpace = multiplyString(" ", diff);
//       splitLine[pair[0]] = extraSpace + splitLine[pair[0]];
//       log(splitLine);
//     }
//
//   }
//   log(splitLines);
//
// }


// function findMaxLengths() {
//
//   maxLengths = [];
//
//   for (var i = 0; i < sliderAnchorPairs.length; i++) {
//
//     var pair = sliderAnchorPairs[i];
//
//     // Find max length of sum of fragments between slider and anchor pairs (inclusive).
//     var maxLength = 0;
//     for (var j = 0; j < splitLines.length; j++) {
//       var splitLine = splitLines[j];
//       var testLength = lengthOfFragments(splitLine, pair[0], pair[1]);
//       if (testLength > maxLength) {
//         maxLength = testLength;
//       }
//     }
//
//     log("Max length found between index " + pair[0] + ", " + pair[1] + " is " + maxLength);
//     maxLengths.push(maxLength);
//   }
//
// }

// // Indices are inclusive.
// function lengthOfFragments(splitLine, startIndex, endIndex) {
//   var length = 0;
//   for (var i = startIndex; i <= endIndex; i++) {
//     length += splitLine[i].length;
//   }
//   return length;
// }


// function findSliderAnchorPairs() {
//
//   // Find slider/anchor index pairs.
//   var sampleSplitLine = splitLines[0];
//   sliderAnchorPairs = [];
//   // var sliderMode = true;
//   var pair = [0, 0];
//   for (var i = 0; i < sampleSplitLine.length; i++) {
//     if (i == 0) {
//       // continue; /// By default, we know the zeroth index is a slider, continue to next index for search.
//     }
//     if (alignChars.indexOf(sampleSplitLine[i].charAt(0)) >= 0) {
//       // Found alignment char! Complete the slider/anchor pair.
//       pair[1] = i;
//       log("Found alignment char! ", pair);
//       sliderAnchorPairs.push(pair);
//       pair = [i+1, 0];
//     }
//   }
//
// }

// function getAlignChars() {
//   var alignCharsInput = document.getElementById('alignCharsInput');
//   alignChars = alignCharsInput.value.split('');
//   log(alignChars);
// }
