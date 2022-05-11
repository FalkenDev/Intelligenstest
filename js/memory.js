/**
 * Memory module ( Gane 3 )
 * @module memory
 */

/** Import finalResult from main.js */
import { finalResult } from "./main";

/**
 * Get the mainpage div element (There all content are going to be)
 * @constant {HTMLElement}
 */
const main = document.getElementById('start');

const memoryGame = {
    /**
     * User score
     * @type {Number} Score for each correct answer
     */
    score: 0,

    /**
     *  Counter of how many flags are clicked
     * @type {Number}
     */
    clickCounter: 0,

    /**
     * Start the game
     * 1. Clear everything from main.
     * 2. Showing the flags.
     * 3. After 5s hide the flags and questions appears.
     * @function startGame
     */
    startGame: function () {
        main.innerHTML = "";
        memoryGame.createGame1();
        setTimeout(memoryGame.createGame2, 5000);
    },

    /**
     * Creates the flag board
     * 1. Shuffle the flagNames array.
     * 2. Create the container for the flag boxes.
     * 3. Create the flag boxes and put in the each flag name in id and class.
     * @function createGame1
     */
    createGame1: function () {
        const flags = memoryGame.shuffleFlag(memoryGame.flagNames);
        console.log(flags);

        const flagContainer = document.createElement('div');
        flagContainer.classList = "flagContainer";
        flagContainer.id = "flagContainer";
        main.appendChild(flagContainer);

        for (let box = 0; box < 9; box++) {
            const flagBox = document.createElement('div');
            flagBox.id = flags[box];
            flagBox.classList = "flagBox";
            flagBox.classList.add(flags[box].toLowerCase());
            flagContainer.appendChild(flagBox);
        }
    },

    /**
     * Create the second board ( after 5s )
     * 1. Toggle all flags backgrounds to hidden.
     * 2. Create question container.
     * 3. Creating 9 flag names questions from flagNames array.
     * @function createGame2
     */
    createGame2: function () {
        main.classList.add("memoryContainer");

        for (let boxCounter = 0; boxCounter < 9; boxCounter++) {
            const flagBox = document.getElementById(memoryGame.flagNames[boxCounter]);
            flagBox.classList.add("toggleBackground");
            flagBox.addEventListener('click', memoryGame.flagClick);
        }

        const questionContainer = document.createElement('div');
        questionContainer.classList = "questionContainer";
        questionContainer.id = "questionContainer";
        main.appendChild(questionContainer);

        const textFlags = memoryGame.shuffleFlag(memoryGame.flagNames);
        for (let textCounter = 0; textCounter < 9; textCounter++) {
            const question = document.createElement('div');
            question.id = textFlags[textCounter] + "Text";
            question.innerHTML = (textCounter + 1) + ". " + textFlags[textCounter];
            questionContainer.appendChild(question);
        }
        console.log(textFlags);
    },

    /**
     * When click event triggerd on a flag box
     * 1. Check if the flag box is the same as the question order.
     * - If true
     *      1. Removes the togglebackground.
     *      2. Give score for correct answer and add 1 to clickCounter.
     *      3. Removes click event on box with function removeClickSingle.
     * - else
     *      1. Remove class toggleBackground.
     *      2. Add class incorrectFlag (Gives red border and set the opacity on the box).
     *      3. Create final result with function createInput.
     *      4. Remove click event on all boxes with function removeClickEvent.
     * @function flagClick
     */
    flagClick: function () {
        if (event.target.id === memoryGame.flagNames[memoryGame.clickCounter]) {
            const flag = document.getElementById(event.target.id);
            flag.classList.remove("toggleBackground");
            memoryGame.score++;
            memoryGame.clickCounter++;
            memoryGame.removeClickSingle(event.target);
        } else {
            const flag = document.getElementById(event.target.id);
            flag.classList.remove("toggleBackground");
            flag.classList.add("incorrectFlag");
            memoryGame.createInput();
            memoryGame.removeClickEvent();
        }
    },

    /**
     * Removes click event from all flag boxes
     * @function removeClickEvent
     */
    removeClickEvent: function () {
        for (let id = 0; id < 9; id++) {
            const box = document.getElementById(memoryGame.flagNames[id]);
            box.removeEventListener('click', this.flagClick);
        }
    },

    /**
     * Remove click event from single box
     * @function removeClickSingle
     * @param {HTMLElement} box pass in HTMLElement
     */
    removeClickSingle: function (box) {
        box.removeEventListener('click', memoryGame.flagClick);
    },

    /**
     * Shuffle a array
     * @function shuffleFlag
     * @param {Array} array Pass in the flagNames array
     * @returns {Array} Returning a shuffled array
     */
    shuffleFlag: function (array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    },

    /**
     * Create input button to final result
     * @function createInput
     */
    createInput: function () {
        const endGame = document.createElement('input');
        endGame.id = "endGame";
        endGame.type = "button";
        endGame.value = "Get final result";
        endGame.addEventListener('click', memoryGame.nextGame);
        main.appendChild(endGame);
    },

    /**
     * Load the final result page
     * @function nextGame
     */
    nextGame: function () {
        finalResult(memoryGame.score);
    },

    /**
     * 9 Flag names
     * @type {Array.string}
     */
    flagNames: [
        "Sweden",
        "Norway",
        "Finland",
        "Denmark",
        "USA",
        "France",
        "Italy",
        "Spain",
        "Greece"
    ]
};

/** Export memoryGame */
export { memoryGame };
