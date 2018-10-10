const Letter = require('./letter.js');

class Word {
    constructor(word) {
        this.word = word;
        this.wordLetterArray = this.word.split('').map((characterVal) => {
            return new Letter(characterVal);
        });
    }

    toString() {
        return this.wordLetterArray.join('');
    }

    guess(letterGuessed) {
        this.wordLetterArray.forEach((letter) => {
            letter.guess(letterGuessed);
        });
    }
}

module.exports = Word;