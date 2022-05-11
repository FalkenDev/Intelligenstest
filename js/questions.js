/**
 * Question module ( Game 1 )
 * @module question
 */

/**
 * Importing secondgame from main.js
 */
import { secondGame } from "./main.js";

/**
 * Get the mainpage div element (There all content are going to be)
 * @constant {HTMLElement}
 */
const main = document.getElementById('start');

/**
 * Save the question
 * @type {String}
 */
let question = "";

/**
 * Save the Answers
 * @type {String}
 */
let answers = ""; // array ?

/**
 * Save the rightAnswer
 * @type {String}
 */
let rightAnswer = "";

const questionGame = {

    /** User score
     * @type {Number} Score for each correct answer
     */
    score: 0,

    /**
     *  Counter of what question it is
     * @type {Number}
     */
    questionCounter: 1,

    /**
     * start the game ( next question )
     * 1. Clear eveything from main.
     * 2.
     * - If all the questions answered ( questionCounter is equal to 6 )
     *      1. Start second game with function secondGame
     * - Else
     *      1. Get the question, answers and right answer with function getQuestion
     *      2. Put the result in the variables
     *      3. Create the board with function createGame
     * @function startGame
     */
    startGame: function () {
        main.innerHTML = "";

        if (questionGame.questionCounter === 6) {
            secondGame(questionGame.score);
        } else {
            const game = this.getQuestion();
            question = game.question;
            answers = game.answers;
            rightAnswer = game.rightAnswer;

            this.createGame();
        }
    },

    /**
     * Create the elements
     * Give each answer box click event with function boxClick
     * @function createGame
     */
    createGame: function () {
        const questionH1 = document.createElement('h1');
        questionH1.innerHTML = question;
        main.appendChild(questionH1);

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
     * A answer checker when user click on the box / answer
     * 1. Look if box innerHTML is the same as the answer
     * - If correct
     *      1. Add class "correct" to the box (gives green background to the box)
     *      2. Give +3 score to user for correct answer
     * - Else
     *      1. Add class "incorrect" to the box (gives red background to the box)
     *      2. Show the correct box with give it class "correct" (gives green background to the box)
     * 2. Create next button and append it to main div to get to the next question
     * 3. Remove eventListener on all answer boxes
     * @function boxClick
     */
    boxClick: function () {
        if (event.target.innerHTML === rightAnswer) {
            event.target.classList.add("correct");
            questionGame.score += 3;
        } else {
            event.target.classList.add("incorrect");
            document.getElementById(rightAnswer).classList.add("correct");
        }

        const input = document.createElement('input');
        input.id = "next";
        input.type = "button";
        input.value = "Next";
        input.addEventListener('click', questionGame.nextQuestion);
        main.appendChild(input);

        questionGame.removeClickEvent();
    },

    /**
     * Removes all click eventListeners on boxButtons
     * @function removeClickEvent
     */
    removeClickEvent: function () {
        for (let id = 0; id < 3; id++) {
            const box = document.getElementById(answers[id]);
            box.removeEventListener('click', this.boxClick);
        }
    },

    /**
     * start a new question ( game )
     * @function nextQuestion
     */
    nextQuestion: function () {
        questionGame.startGame();
    },

    /**
     * Gets the question, answers and rightanswer depends on which question it is (questionCounter)
     * @function getQuestion
     * @returns Returns question, answers and rightAnswer depens on wich question it is (questionCounter)
     */
    getQuestion: function () {
        if (questionGame.questionCounter === 1) {
            questionGame.questionCounter++;
            return {
                question: this.questions[0],
                answers: this.answer1,
                rightAnswer: this.rightAnswer[0]
            };
        } else if (questionGame.questionCounter === 2) {
            questionGame.questionCounter++;
            return {
                question: this.questions[1],
                answers: this.answer2,
                rightAnswer: this.rightAnswer[1]
            };
        } else if (questionGame.questionCounter === 3) {
            questionGame.questionCounter++;
            return {
                question: this.questions[2],
                answers: this.answer3,
                rightAnswer: this.rightAnswer[2]
            };
        } else if (questionGame.questionCounter === 4) {
            questionGame.questionCounter++;
            return {
                question: this.questions[3],
                answers: this.answer4,
                rightAnswer: this.rightAnswer[3]
            };
        } else if (questionGame.questionCounter === 5) {
            questionGame.questionCounter++;
            return {
                question: this.questions[4],
                answers: this.answer5,
                rightAnswer: this.rightAnswer[4]
            };
        }
    },

    /**
     * Questions
     * @type {Array.String}
     */
    questions: [
        "Find the answer that best completes the analogy:<br> Book is to Reading as Fork is to ...", // Question 1
        "Which of the following can be arranged into a 5-letter English word?", // Question 2
        "What is the most common connecting word for SHIP and CARDS?", // Question 3
        "Tree is to ground as chimney is to ...", // Question 4
        "A farmer has 86 chickens. All but 6 die. How many are left?" // Question 5
    ],

    /**
     * First question answers
     * @type {Array.String}
     */
    answer1: [
        "drawing",
        "writing",
        "eating" // Right anwser
    ],

    /**
     * Second question answers
     * @type {Array.String}
     */
    answer2: [
        "H R G S T",
        "R I L S A", // Right anwser
        "W Q R G S"
    ],

    /**
     * Third question answers
     * @type {Array.String}
     */
    answer3: [
        "Port",
        "Harbour",
        "Deck" // Right anwser

    ],

    /**
     * Fourth question answers
     * @type {Array.String}
     */
    answer4: [
        "Smoke",
        "House", // Right anwser
        "Brick"
    ],

    /**
     * Fifth question answers
     * @type {Array.String}
     */
    answer5: [
        "80",
        "6", // Right anwser
        "5"
    ],

    /**
     * All the right Answers
     * @type {Array.String}
     */
    rightAnswer: [
        "eating", // Question 1
        "R I L S A", // Question 2
        "Deck", // Question 3
        "House", // Question 4
        "6" // Question 5
    ]
};

/**
 * Export questionGame
 */
export { questionGame };
