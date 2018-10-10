const inquirer = require('inquirer');
const Word = require('./word.js');

const game = {
    guessesRemaining: 12,
    lettersGuessed: [],
    currentWord: {},
    wordBank: ['pumpkin', 'witch', 'vampire', 'skeleton', 'haunted', 'spooky', 'zombie', 'costume', 'scarecrow', 'candy', 'october'],
    guess: function(letter) {
        if (!this.lettersGuessed.includes(letter)) {
            this.lettersGuessed.push(letter);
            this.guessesRemaining--;
            this.currentWord.guess(letter);
            console.log(this.currentWord.toString());
            this.userInquire();
        }
        else {
            console.log('Letter has already been guessed. Guess another.');
            this.userInquire();
        }
    },
    nextWord: function() {
        this.currentWord = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
        this.lettersGuessed = [];
        this.guessesRemaining = 12;
        this.userInquire();
    },
    userInquire: () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Guess a Letter',
                    name: 'letter'
                }
            ])
            .then(answer => {
                if (answer.letter.length === 1 && /^[a-z]+$/i.test(answer.letter)) {
                    game.guess(answer.letter);
                }
                else if (answer.letter.length < 1 || answer.letter.length > 1) {
                    console.log('Please guess only one character.');
                    game.userInquire();
                }
                else if (/^[a-z]+$/i.test(answer.letter) === false) {
                    console.log('Please enter only a letter.');
                    game.userInquire();
                }
            });
    }
}

game.nextWord();











