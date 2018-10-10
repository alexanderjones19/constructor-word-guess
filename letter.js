class Letter {
    constructor(characterVal) {
        this.characterVal = characterVal;
        this.guessedYet = false;
    }

    toString() {
        if (this.guessedYet) {
            return this.characterVal;
        }
        else {
            return '_';
        }
    }

    guess(letterGuessed) {
        if (letterGuessed.toUpperCase() === this.characterVal.toUpperCase()) {
            this.guessedYet = true;
        }
    }
}

module.exports = Letter;