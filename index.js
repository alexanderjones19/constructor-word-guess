const inquirer = require('inquirer');
const Word = require('./word.js');

const game = {
    guessesRemaining: 12,
    lettersGuessed: [],
    currentWord: {},
    wordBank: ['Pumpkin', 'Witch', 'Vampire', 'Skeleton', 'Haunted', 'Spooky', 'Zombie', 'Costume', 'Scarecrow', 'Candy', 'October'],
    guess: function(letter) {
        if (!this.lettersGuessed.includes(letter)) {
            this.lettersGuessed.push(letter);
            this.guessesRemaining--;
            this.currentWord.guess(letter);
            if (this.currentWord.word.includes(letter)) {
                console.log('\nCORRECT!\n');
                console.log('Guesses Remaining: ' + this.guessesRemaining + '\n');
            }
            else {
                console.log('\nINCORRECT!\n');
                console.log('Guesses Remaining: ' + this.guessesRemaining + '\n');
            }
            console.log('current word', this.currentWord.word);
            console.log(this.currentWord.toString().split('').join(' '));
            this.checkForWin();
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
        console.log('\n' + this.currentWord.toString().split('').join(' ') + '\n');
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
                    game.guess(answer.letter.toUpperCase());
                }
                else if (answer.letter.length < 1 || answer.letter.length > 1) {
                    console.log('\nPlease guess only one character.\n');
                    game.userInquire();
                }
                else if (/^[a-z]+$/i.test(answer.letter) === false) {
                    console.log('\nPlease enter only a letter.\n');
                    game.userInquire();
                }
            });
    },
    checkForWin: function() {
        if (this.guessesRemaining === 0 || !this.currentWord.toString().includes('_')) {
            console.log('\nYou got it right! Next word!\n')
            this.nextWord();
        }
        else {
            this.userInquire();
        }
    }
}

game.nextWord();











