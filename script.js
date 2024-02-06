'use strict';

// selecting elements
const btnReset = document.querySelector('.btn-reset');

const row1 = document.querySelectorAll('.row-1');
const row2 = document.querySelectorAll('.row-2');
const row3 = document.querySelectorAll('.row-3');
const row4 = document.querySelectorAll('.row-4');
const row5 = document.querySelectorAll('.row-5');

const wrapper = document.querySelector('.wrapper')
const scoreEL=document.querySelector('.score')




const answers = ['hello', 'world', 'solid', "green",'black'];

// pick randmon word from array
let solution = answers[Math.floor(Math.random() * answers.length)]


const words = [];
let ind = 0;
let score = 0;

// index of where the keyboard input value to be stored in the rows array
let row = 0

// list of rows
const rows = [row1, row2, row3, row4, row5];


function handleType(e) {

  // base case
  //preventing invoking this function
  if (row > rows.length - 1) return;

    //storing keyboard input value into current row of  words array
    if (ind < 5 && e.key.match(/^[a-z]{1}$/) && e.key !== "Backspace") {
      words.push(e.key)
      rows[row][ind].textContent = words[ind]
      ind++;

      // handling backspace keyboard input value operataion
    } else if (e.key === "Backspace") {
      if (ind > 0) {
        ind--;
        rows[row][ind].textContent = '';
        words.pop();

      }

      // checking if input value is matching to the current random word picked
    } else if (e.key === "Enter" && words.length === 5) {


      for (let i = 0; i < rows[row].length; i++) {

        const matching = solution.split('');
        if (rows[row][i].textContent === matching[i]) {
          rows[row][i].classList.add('correct')
          score += 4;
          scoreEL.textContent = `score: ${score}`

        } else if (matching.includes(rows[row][i].textContent)) {
          rows[row][i].classList.add('close');
        }
        else {
          rows[row][i].classList.add('incorrect')

        }
      }

      // reinoking keyboard input event handler function and reinitialzing values of varaibles
      words.length = 0;
      ind = 0;
      row++
      solution=answers[Math.floor(Math.random() * answers.length)]
      handleType(e);

    }


    }


function resetGameHandler(e) {
  e.preventDefault();

  window.location.reload();

}
document.addEventListener('keydown', handleType)
btnReset.addEventListener('click', resetGameHandler)


