// Canvas
const canvasDIV = document.querySelector(".snake-canvas");
const ctxS = canvasDIV.getContext("2d");
const textDiv = document.querySelector(".text");
const fixBtn = document.querySelector(".fix");

class CanvasSnake {
  width = 1084;
  height = window.innerHeight * 0.9 - 16;
  bgColor = "#000";
}

class Snake {
  width = 10;
  height = 5;
  color = "#1A71C2";

  posX = 10;
  posY = 10;

  movementSize = 5;

  checkWin() {
    if (snake.posX == apple.posX && snake.posY == apple.posY) {
      apple.count++;

      textDiv.textContent = apple.count;
      apple.createApple();
    }
  }

  //   Movements
  goLeft() {
    ctxS.fillStyle = this.color;
    ctxS.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posX -= snake.movementSize;

    if (snake.posX <= -5) {
      snake.posX = 295;
    }

    snake.checkWin();
    ctxS.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }

  goRight() {
    ctxS.fillStyle = this.color;
    ctxS.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posX += snake.movementSize;

    if (snake.posX >= 295) {
      snake.posX = 0;
    }

    snake.checkWin();
    ctxS.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }

  goUp() {
    ctxS.fillStyle = this.color;
    ctxS.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posY -= snake.movementSize;

    if (snake.posY < 0) {
      snake.posY = 145;
    }

    snake.checkWin();
    ctxS.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }

  goDown() {
    ctxS.fillStyle = this.color;
    ctxS.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posY += snake.movementSize;

    if (snake.posY > 145) {
      snake.posY = 0;
    }

    snake.checkWin();
    ctxS.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }
}

class Apple {
  posX = 50;
  posY = 50;

  width = 10;
  height = 5;

  count = 0;

  createApple() {
    let randomX = Math.floor(Math.random() * 290);

    while (randomX % 5 != 0) {
      randomX--;

      if (randomX % 5 == 0) {
        break;
      }
    }

    apple.posX = randomX;

    let randomY = Math.floor(Math.random() * 140);

    while (randomY % 5 != 0) {
      randomY--;

      if (randomY % 5 == 0) {
        break;
      }
    }

    apple.posY = randomY;

    ctxS.fillStyle = "#aaa";
    ctxS.fillRect(apple.posX, apple.posY, apple.width, apple.height);
  }
}

class AISnake {
  fixAI(e) {
    e.preventDefault();

    ctxS.clearRect(0, 0, canvasSnake.width, canvasSnake.height);
    apple.createApple();
  }

  // calculates closest way
  makeDecide() {
    let width = 295;
    let height = 145;

    // let normal way = appleposx - snakeposx
    // if snakeposx + (width - appleposx) <= normal way

    // snake        apple
    if (snake.posX < apple.posX) {
      let normalWay = apple.posX - snake.posX;
      let otherWay = snake.posX + (width - apple.posX);
      if (otherWay < normalWay) {
        snake.goLeft();
      } else {
        snake.goRight();
      }

      // console.log("normalX:", normalWay, "otherX", otherWay);
    }

    // apple      snake
    if (snake.posX > apple.posX) {
      let normalWay = snake.posX - apple.posX;
      let otherWay = width - snake.posX + apple.posX;
      if (otherWay < normalWay) {
        snake.goRight();
      } else {
        snake.goLeft();
      }

      // console.log("normalX:", normalWay, "otherX", otherWay);
    }

    // snake
    //
    // apple
    if (snake.posY < apple.posY) {
      let normalWay = apple.posY - snake.posY;
      let otherWay = snake.posY + (height - apple.posY);

      if (otherWay < normalWay) {
        snake.goUp();
      } else {
        snake.goDown();
      }

      // console.log("normalY:", normalWay, "otherY", otherWay);
    }

    // apple
    //
    // snake
    if (snake.posY > apple.posY) {
      let normalWay = snake.posY - apple.posY;
      let otherWay = height - snake.posY + apple.posY;
      if (otherWay < normalWay) {
        snake.goDown();
      } else {
        snake.goUp();
      }

      // console.log("normalY:", normalWay, "otherY", otherWay);
    }
  }
}

const canvasSnake = new CanvasSnake();
const snake = new Snake();
const apple = new Apple();
const aiSnake = new AISnake();

if(deviceWidth < 1084) {
  canvasDIV.width = deviceWidth * 0.9;
  canvasSnake.width = deviceWidth * 0.9;
  canvasSnake.height = window.innerHeight * 0.9;
  canvasDIV.style.filter = "brightness(0.8)";

  snake.width = 18;
  apple.width = 18;
}

setInterval(aiSnake.makeDecide, 1000 / 30); // 1000 / 30
fixBtn.addEventListener("click", aiSnake.fixAI);

canvasDIV.style.width = `${canvasSnake.width}px`;
canvasDIV.style.height = `${canvasSnake.height}px`;
canvasDIV.style.backgroundColor = `${canvasSnake.bgColor}`;

// fixes ai every 1 minutes
setInterval(() => {
  ctxS.clearRect(0, 0, canvasSnake.width, canvasSnake.height);
  apple.createApple();
}, 60000);

// Movement
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 87) {
    snake.goUp();
  } else if (e.keyCode == 65) {
    snake.goLeft();
  } else if (e.keyCode == 83) {
    snake.goDown();
  } else if (e.keyCode == 68) {
    snake.goRight();
  }
});

// Snake
ctxS.fillStyle = "#fff";
ctxS.fillRect(snake.posX, snake.posY, snake.width, snake.height);

// apple
ctxS.fillStyle = "#ff0000";
ctxS.fillRect(apple.posX, apple.posY, apple.width, apple.height);
