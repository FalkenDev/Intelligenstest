/**
 * FizzbBuzz module ( Game 2 )
 * @module fizzbuzz
 */

/** Import thirdGame from main.js */
import { thirdGame } from "./main";

/**
 * Get the mainpage div element (There all content are going to be)
 * @constant {HTMLElement}
 */
const main = document.getElementById('start');

/**
 * Save the FizzBuzz question
 * @type {Array}
 */
let fizzbuzzQuestion = [];

/**
 * Save the right answer from the question
 * @type {String}
 */
let rightAnswer = "";

/**
 * Save the answers to display on html
 * @type {String}
 */
let answers = "";

const fizzbuzzGame = {

    /**
     * User score
     * @type {Number}
     */
    score: 0,

    /**
     * Counter how many questions have been asked
     * @type {Number}
     */
    fizzbuzzCounter: 1,

    /**
     * Start FizzBuzz
     * 1. Clear everything from main.
     * 2. Adds +1 to fizzBuzzCounter (1 game has started)
     * 3. Clear fizzbuzzQuestion array
     * - If fizzBuzzCounter greater then 6
     *      1. Next game loads and export user score
     * - else
     *      1. Gets random value to start the question with from function randomValue
     *      2. Check what the startValue is and 4 other values from functiongameChecker
     *      3. Push the result to fizzbuzzQuestion
     *      4. Save the right answer to rightAnswer
     *      5. Save the answers from function createAnswers
     *      6. Create the game with fizzbuzzGame
     * @function startGame
     */
    startGame: function () {
        main.innerHTML = '';

        fizzbuzzGame.fizzbuzzCounter++;

        fizzbuzzQuestion = [];
        if (fizzbuzzGame.fizzbuzzCounter > 6) {
            thirdGame(fizzbuzzGame.score);
        } else {
            const startValue = fizzbuzzGame.randomValue(100);

            for (let step = 0; step < 5; step++) {
                const valueChecker = fizzbuzzGame.gameChecker(startValue + step);
                fizzbuzzQuestion.push(valueChecker);
            }
            rightAnswer = fizzbuzzGame.gameChecker(startValue + 5);

            answers = fizzbuzzGame.createAnswers(startValue + 5, rightAnswer);

            fizzbuzzGame.createGame();
        }
    },

    /**
     * Create the board
     * 1. Create the question element ( h1 )
     * 2. Create the tip element ( h2 )
     * 3. Create container element for answer boxes ( div )
     * 4. Create 3 question elements with answers ( div )
     * @function createGame
     */
    createGame: function () {
        const questionH1 = document.createElement('h1');
        questionH1.innerHTML = fizzbuzzQuestion + ", ?";
        main.appendChild(questionH1);

        const questionH2 = document.createElement('h2');
        questionH2.innerHTML = "Answer the right box for '?'";
        main.appendChild(questionH2);

        const container = document.createElement('div');
        container.className = "container";
        container.id = "container";
        main.appendChild(container);

        for (let amount = 0; amount < 3; amount++) {
            const boxButton = document.createElement('div');
            boxButton.className = "boxButton";
            boxButton.id = answers[amount];
            boxButton.innerHTML = answers[amount];
            boxButton.addEventListener('click', this.boxClick);
            container.appendChild(boxButton);
        }
    },

    /**
     * When click event triggerd on a answer box
     * 1.
     * - If answer clicked is equal to rightanswer
     *      1. Add class "correct" to the answer box
     *      2. Give +3 score to user
     * - Else
     *      1. Add class "incorrect" to the answer box
     *      2. Add class "correct" to right answer to show what answer was correct
     * 2. Create next button to start next question with click event function nextQuestion
     * 3. Removes click event from all answer boxes
     * @function boxClick
     */
    boxClick: function () {
        if (event.target.innerHTML === rightAnswer) {
            event.target.classList.add("correct");
            fizzbuzzGame.score += 3;
        } else {
            event.target.classList.add("incorrect");
            document.getElementById(rightAnswer).classList.add("correct");
        }

        const input = document.createElement('input');
        input.id = "next";
        input.type = "button";
        input.value = "Next";
        input.addEventListener('click', fizzbuzzGame.nextQuestion);
        main.appendChild(input);

        fizzbuzzGame.removeClickEvent();
    },

    /**
     * Removes click event from all answer boxes
     * @function removeClickEvent
     */
    removeClickEvent: function () {
        for (let id = 0; id < 3; id++) {
            const box = document.getElementById(answers[id]);
            box.removeEventListener('click', this.boxClick);
        }
    },

    /**
     * Load the next question
     * @function nextQuestion
     */
    nextQuestion: function () {
        fizzbuzzGame.startGame();
    },

    /**
     * Checks if the value is a fizz, buzz, fizzbuzz or a value.
     * @function gameChecker
     * @param {String} value
     * @returns Returns the right value
     */
    gameChecker: function (value) {
        if (value % 3 === 0 && value % 5 === 0) {
            value = "fizzbuzz";
        } else if (value % 3 === 0) {
            value = "fizz";
        } else if (value % 5 === 0) {
            value = "buzz";
        }
        return value;
    },

    /**
     * Creating the answers to the answer boxes
     * 1. Array with answers to choose
     * 2. Create array what answer is going to display on each answer box
     * 3. Push the last number from the question to answerToChouse array ( Get all the answers that can be used )
     * 4. - for loop ( Find right answer)
     *      1. Finding the rightAnswer in AnswersToChouse index
     *      2. Push the right answer to answersToDisplay
     *      3. Remove right answer from AnswersToChouse
     * 5. - for loop ( Insert random answers)
     *      1. Get random value from function randomValue with input length from answerToChouse -1 (-1 = the right answer allredy in answerToDisplay)
     *      2. Put the random value in to index of answerToChouse
     *      3. Push the answer (incorrect answer) to answerToDisplay
     *      4. Remove the incorrect answer from answerToChouse
     * 6. Shuffle the answersToDisplay with function shuffelAnswers
     * 7. return array of shuffeld answers to display in HTML
     * @function createAnswers
     * @param {String} lastNumber get the last number from the quesion
     * @param {String} rightAnswer get the right answer
     * @returns Returns the shuffeld Array
     */
    createAnswers: function (lastNumber, rightAnswer) {
        const answerToChouse = ["fizz", "buzz", "fizzbuzz"];

        const answersToDisplay = [];

        answerToChouse.push(lastNumber);

        for (let index = 0; index < 4; index++) {
            if (answerToChouse[index] === rightAnswer) {
                answersToDisplay.push(rightAnswer);
                answerToChouse.splice(index, 1);
            }
        }

        for (let index = 0; index < 2; index++) {
            const randomValues = fizzbuzzGame.randomValue(answerToChouse.length - 1);

            const randomAnswers = answerToChouse[randomValues];

            answersToDisplay.push(randomAnswers);

            answerToChouse.splice(answerToChouse.indexOf(randomAnswers), 1);
        }

        const shuffeldAnwser = fizzbuzzGame.shuffelAnswers(answersToDisplay);

        return shuffeldAnwser;
    },

    /**
     * Shuffle array in diffrent positions
     * @param {Array} array
     * @returns Returns shuffeld array
     */
    shuffelAnswers: function (array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    },

    /**
     * Gets a random value
     * @param {Number} maxValue
     * @returns Returns random value from 0 to maxValue
     */
    randomValue: function (maxValue) {
        return Math.floor(Math.random() * maxValue);
    }
};

/** Export fizzbuzzGame */
export { fizzbuzzGame };
