/**
 * @file main.js
 * @author Kasper Falk (FalkenDev)
 * @description Test tool to calculate how intelligent a person is. The test person must perform a number of exercises and the total result from the exercises will be the intelligence of the test person.
 */

/** Import questonGame form questions.js */
import { questionGame } from "./questions";

/** Import fizzBuzzGame from fizzbuss.js */
import { fizzbuzzGame } from "./fizzbuzz";

/** Import memoryGame from memory */
import { memoryGame } from "./memory";

/**
 * Get the mainpage div element (There all content are going to be)
 * @constant {HTMLElement}
 */
const main = document.getElementById('start');

/**
 * Retrieve start button
 * @constant {HTMLInputElement}
 */
const button = document.querySelector('input');

/**
 * What game it is
 * @type {Number}
 */
let gameCounter = 0;

/**
 * Max score from all the games
 * @type {Number}
 */
const totalscore = 39;

/**
 * Total score from user
 * @type {Number}
 */
let totalUserScore = 0;

window.reset = function () {
    if (gameCounter === 1) {
        questionGame.score = 0;
        questionGame.questionCounter = 1;
        questionGame.startGame();
    } else if (gameCounter === 2) {
        fizzbuzzGame.score = 0;
        fizzbuzzGame.fizzbuzzCounter = 1;
        fizzbuzzGame.startGame();
    } else if (gameCounter === 3) {
        memoryGame.score = 0;
        memoryGame.clickCounter = 0;
        memoryGame.startGame();
    }
};

/**
 * Adding eventlistener on input button (start first game)
 * @event button
 */
button.addEventListener('click', firstGame);

/**
 * Start the first game (Tips questions)
 * @function firstGame
 */
function firstGame () {
    gameCounter = 1;
    main.innerHTML = '';
    questionGame.startGame();
};

/**
 * Loading start page for the second game (FizzBuzz).
* @function secondGame
* @param {Number} score Score from first game (Question)
*/
function secondGame (score) {
    gameCounter = 2;

    totalUserScore += score;

    main.innerHTML = '';

    const result = document.createElement('h1');
    result.innerHTML = "You got " + score + " points out of 15";

    const secondGameTitle = document.createElement('h1');
    secondGameTitle.innerHTML = "Next game is Fizz to the buzz";

    const textSecondGame = document.createElement('div');
    textSecondGame.innerHTML = "<p>You are goint to answer if it is a number / fizz / buzz or fizz buzz<p>";
    textSecondGame.innerHTML += "<p>There are going to be 5 questions, each correct answer gives 3 points</p>";

    const buttonSecondGame = document.createElement('input');
    buttonSecondGame.id = "startSecond";
    buttonSecondGame.type = "button";
    buttonSecondGame.value = "Start";

    buttonSecondGame.addEventListener('click', fizzbuzzGame.startGame);

    main.appendChild(result);
    main.appendChild(secondGameTitle);
    main.appendChild(textSecondGame);
    main.appendChild(buttonSecondGame);
};

/**
 * Loading start page for the third game (Memory)
 * @function thirdGame
 * @param {Number} score Score from second game (FizzBuzz)
 */
function thirdGame (score) {
    gameCounter = 3;
    totalUserScore += score;

    main.innerHTML = '';

    const result = document.createElement('h1');
    result.innerHTML = "You got " + score + " points out of 15";

    const thirdGameTitle = document.createElement('h1');
    thirdGameTitle.innerHTML = "Next game is memory game";

    const textThirdGame = document.createElement('div');
    textThirdGame.innerHTML = "<p>Nine flags are going to show up for 5 sec then it's going ti be hidden</p>";
    textThirdGame.innerHTML += "<p>After five seconds, 9 questions will be displayed. You must press the correct hidden flag that is in the question order.</p>";

    const buttonThirdGame = document.createElement('input');
    buttonThirdGame.id = "startThird";
    buttonThirdGame.type = "button";
    buttonThirdGame.value = "Start";

    buttonThirdGame.addEventListener('click', memoryGame.startGame);

    main.appendChild(result);
    main.appendChild(thirdGameTitle);
    main.appendChild(textThirdGame);
    main.appendChild(buttonThirdGame);
};

/**
 * Game finnished
 * @function finalResult
 * @param {Number} score
 */
function finalResult (score) {
    gameCounter++;

    totalUserScore += score;

    main.classList.remove('memoryContainer');

    main.innerHTML = "";
    gameCounter = 0;

    const finalResultH1 = document.createElement('h1');
    finalResultH1.innerHTML = "You have finnished all games.<br>";
    finalResultH1.innerHTML += "Your score is " + totalUserScore + " of " + totalscore + "<br>";
    finalResultH1.innerHTML += "Great job!";

    main.appendChild(finalResultH1);
}

/** Export firstGame, secondGame, thirdGame, finalResult */
export { firstGame, secondGame, thirdGame, finalResult };
