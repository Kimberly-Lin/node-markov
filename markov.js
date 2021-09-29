/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words;
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let nextVal = this.words[i + 1] ? this.words[i + 1] : null;

      if (!(chains[this.words[i]])) {
        chains[this.words[i]] = [];
        chains[this.words[i]].push(nextVal)
      } else {
        chains[this.words[i]].push(nextVal);
      }
    }
    return chains;
  }

  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE

    let chains = this.makeChains()

    let randomText;
    let chainsKeys = Object.keys(chains);

    let randomStart = getRandomIndex(chainsKeys);
    let currKey;

    randomText = chainsKeys[randomStart];
    currKey = chainsKeys[randomStart];
    let nextIndex;
    let nextWord;

    while (numWords > 1) {
      nextIndex = getRandomIndex(chains[currKey])
      nextWord = chains[currKey][nextIndex];

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

/** Select random index of input array */
function getRandomIndex(array) {

  let randomIndex;
  randomIndex = Math.floor(Math.random() * (array.length));

  return randomIndex;
}

module.exports = {
  MarkovMachine
}