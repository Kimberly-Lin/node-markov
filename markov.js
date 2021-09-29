/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words;
    this.chains = this.makeChains();
    //this.randomText = this.getText();
    // MORE CODE HERE
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // create empty object
    // loop through the words array
    // put word as key, add word+1 to values
    let chains = {};
    //option 1
    for (let i = 0; i < this.words.length; i++) {
      let nextVal = this.words[i + 1] ? this.words[i + 1] : null;
      //if key doesn't already exist
      if (!(chains[this.words[i]])) {
        //create key and value in an array
        chains[this.words[i]] = [];
        chains[this.words[i]].push(nextVal)
      } else {
        // if key already exists, append val to array
        chains[this.words[i]].push(nextVal);
      }
    }
    return chains;
  }

  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE

    let randomText;
    let chainsKeys = Object.keys(this.chains);

    let randomStart = getRandomIndex(chainsKeys);
    let currKey;

    randomText = chainsKeys[randomStart];
    currKey = chainsKeys[randomStart];
    let nextIndex;
    let nextWord;
    
    while (numWords > 1) {
      nextIndex = getRandomIndex(this.chains[currKey])
      nextWord = this.chains[currKey][nextIndex];

      if (nextWord === null) {
        nextIndex = getRandomIndex(chainsKeys);
        nextWord = chainsKeys[nextIndex];
        randomText = randomText + ". " + nextWord;
        currKey = nextWord;

      } else {
        randomText = randomText + " " + nextWord;
        currKey = nextWord;
      }
      numWords--;
    }
    return randomText;
  }
}

function getRandomIndex(array) {

  let randomIndex;
  randomIndex = Math.floor(Math.random() * (array.length));

  return randomIndex;
}
