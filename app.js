// global variables

const box = 10; // this refers to a single box on the canvas
const rows = 50; // number of rows (y axis)
const columns = 50; // number of columns (x axis)

const cBoard = document.querySelector("#snakeBoard"); 
let pen; //will represent contextfor drawing on the canvas

// Initial dimension of snake
let snakeX = box * 25;
let snakeY = box * 25;
// snake movement and direction
let moveX = 0;
let moveY = 0;
// an arraynfor the body of the snake to show it's length
const snakeLength = [];

// Snake food
let baitX;
let baitY;

// variables to end game
let gameEnd;
const endGameAlert = document.querySelector(".alert");

window.addEventListener('load', () => {
  cBoard.height = rows * box;
  cBoard.width = columns * box;
  pen = cBoard.getContext("2d");

  // function to move snake
  document.addEventListener("keyup", moveSnake);

  randomFood();
  setInterval(gameUpdate, 1000/15);
});

const gameUpdate = () => {
  if (gameEnd) return;
  // board color and dimensions
  pen.fillStyle="black";
  pen.fillRect(0, 0, cBoard.width, cBoard.height);

  // snake food color and position
  pen.fillStyle="green";
  pen.fillRect(baitX, baitY, box, box);

  // check if snake eats food
  if(snakeX == baitX && snakeY == baitY) {
    snakeLength.push([baitX, baitY]);
    randomFood();
  }

  // make the parts of the snake move along together
  for (let i = snakeLength.length -1; i > 0; i--) {
    snakeLength[i] = snakeLength[i-1];
  }
  if (snakeLength.length) snakeLength[0] = [snakeX, snakeY];

  // snake color and position
  pen.fillStyle="blue";
  snakeX += moveX * box;
  snakeY += moveY * box;
  pen.fillRect(snakeX, snakeY, box, box);
  // add food consumed to snake body
  snakeLength.forEach((item, index) => pen.fillRect(item[0], item[1], box, box))

  // conditions for game over
  // 1. if snake moves out of box
  if (snakeX < 0 || snakeX > columns * box || snakeY < 0 || snakeY > rows * box) {
    gameEnd = true;
    endGameAlert.style.display = "flex";
    gameRestart();
  }

  snakeLength.forEach((item, index) => {
    if (snakeX == item[0] && snakeY == item[1]) {
      gameEnd = true;
      endGameAlert.style.display = "flex";
      gameRestart();
    }
  })
}

// function to randomly place food
const randomFood = () => {
  baitX = Math.floor(Math.random() * rows) * box;
  baitY = Math.floor(Math.random() * columns) * box;
}

// function to move snake
const moveSnake = (event) => {
  if(event.code == "ArrowUp" && moveY != 1) {
    moveX = 0;
    moveY = -1;
  } else if(event.code == "ArrowRight" && moveX != -1) {
    moveX = 1;
    moveY = 0;
  } else if (event.code == "ArrowDown" && moveY != -1) {
    moveX = 0;
    moveY = 1;
  } else if (event.code == "ArrowLeft" && moveX != 1) {
    moveX = -1;
    moveY = 0;
  }
}

// restart game function
const gameRestart = () => {
  document.querySelector(".alert-btn").addEventListener("click", () => {
    location.reload();
  })
}