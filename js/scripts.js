// Utility Logic
function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}
function justWords(text) {
  const cleanText = text.replace(/[\|&;\$%@"<>\(\)\+!.]/g, "");
  console.log(cleanText);
  return cleanText.split(" ");
}

function sortedWords(words) {
  let sorted = [];
  words.forEach(function (word) {
    sorted.push(word.toLowerCase());
  });
  return sorted.sort();
}
// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }

  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    };
  });
  return wordCount;
}

function getThreeMostUsedWords(text) {

  let repeatCount = 0;
  let object = { word: null, count: null };
  let repeatedArray = [];
  const wordArray = justWords(text);
  const wordsSorted = sortedWords(wordArray);
  let knownWord;
  wordsSorted.forEach(function (element, index) {
    if (knownWord && knownWord.toLowerCase() === element.toLowerCase()) {
      repeatCount++;
      object = { word: knownWord, count: repeatCount };
    } else {
      if (object.word) {
        repeatedArray.push(object);
      }
      knownWord = wordsSorted[index];
      repeatCount = 1;
      object = { word: knownWord, count: repeatCount };
    }
  })

  const returnArray = repeatedArray.sort(function (a, b) {
    return b.count - a.count;
  });

  return returnArray;
}



function numberOfOccurencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

// UI Logic
function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>"
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurencesOfWord = numberOfOccurencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    console.log(getThreeMostUsedWords("Hi there hey yo hi hi yay yo whoa there whoa... yay!"));
  });
});