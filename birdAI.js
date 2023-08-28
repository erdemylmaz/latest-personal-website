// elements
const canvasElement = document.querySelector(".bird-canvas");
const ctx = canvasElement.getContext("2d");

// js
class Canvas {
  width = 1084;
  // width= 200;
  height = window.innerHeight * 0.9 - 16;
  bgColor = "#000";
  FPS = 240;

  restart = () => {
    ctx.clearRect(0, 0, this.width, this.height);
    pipes.pipes = [];
    bird.posX = 96;
    bird.posY = 24;
    bird.index = 0;
  };
}

class Pipes {
  totalPipeCount = 0;
  pipes = [];

  pipeSpaceHeight = 164;
  pipeWide = 48;
  pipeBetweenSize = 200;

  createPipe = () => {
    let randomHeight = Math.floor(
      Math.random() * (canvas.height - (this.pipeSpaceHeight * 2))
    );

    if(randomHeight < this.pipeSpaceHeight) {
      randomHeight += this.pipeSpaceHeight;
    }

    if(randomHeight > this.pipeSpaceHeight) {
      randomHeight -= this.pipeSpaceHeight;
    }

    if(randomHeight > (canvas.height - this.pipeSpaceHeight)) {
      randomHeight -= this.pipeSpaceHeight;
    }

    let pipe = {
      index: this.pipes.length,
      posX: canvas.width - this.pipeWide,
      posY: 0,

      pipeTop: {
        height: randomHeight,
        posX: canvas.width - this.pipeWide,
        posY: 0,
      },

      pipeBottom: {
        height: canvas.height - (randomHeight + this.pipeSpaceHeight),
        posX: canvas.width - this.pipeWide,
        posY: randomHeight + this.pipeSpaceHeight,
      },
    };

    this.pipes.push(pipe);
    this.totalPipeCount++;
  };

  updatePipe = () => {
    this.pipes.forEach((pipe, index) => {
      if (pipe.posX >= -100) {
        ctx.clearRect(pipe.posX, 0, this.pipeWide, canvas.height);

        pipe.posX--;

        ctx.fillStyle = "#131313";

        //   draw top part of pipe
        ctx.fillRect(pipe.posX, 0, this.pipeWide, pipe.pipeTop.height);

        //   draw bottom part of pipe
        ctx.fillRect(
          pipe.posX,
          pipe.pipeBottom.posY,
          this.pipeWide,
          pipe.pipeBottom.height
        );
      } else {
        //   kill pipe
        // this.pipes.splice(index, 1);
      }
    });
  };
}

class Bird {
  width = 32;
  height = 24;
  color = "#1A71C2";

  posX = 96;
  posY = 24;

  index = 0;
  jumpSize = 100;

  gravity = 0; // from selman kahya
  velocity = 0.1; // from selman kahya

  //   from selman kahya
  update = () => {
    ctx.clearRect(
      bird.posX - 1,
      bird.posY - 1,
      bird.width + 2,
      bird.height + 2
    );
    // from selman kahya
    this.gravity += this.velocity;
    this.gravity = Math.min(5, this.gravity);

    this.posY += this.gravity;

    ctx.fillStyle = bird.color;
    ctx.fillRect(bird.posX, bird.posY, bird.width, bird.height);

    this.isDead();
  };

  // movements from selman kahya
  jump = () => {
    this.gravity = -4;
  };

  isDead = () => {
    if (pipes.pipes.length != 0) {
      let nextPipe = pipes.pipes[this.index];
      let spaceFrom = nextPipe.pipeTop.height;
      let spaceTo = nextPipe.pipeBottom.posY;

      if (
        nextPipe.posX + pipes.pipeWide >= this.posX &&
        this.posX >= nextPipe.posX &&
        (this.posY >= spaceTo || this.posY <= spaceFrom)
      ) {
        canvas.restart();
      } else if (this.posX > nextPipe.posX + pipes.pipeWide) {
        this.index++;
      }

      //   console.log(nextPipe);
    }
  };
}

class AI {
  makeDecide = () => {
    let nextPipe = pipes.pipes[bird.index];
    let spaceFrom = nextPipe.pipeTop.height + 10;
    let spaceTo = nextPipe.pipeBottom.posY - 10;

    let midSpace = (spaceFrom + spaceTo) / 2;

    if (bird.posY > midSpace) {
      bird.jump();
    }
  };
}

const canvas = new Canvas();
const pipes = new Pipes();
const bird = new Bird();
const ai = new AI();

let deviceWidth = window.innerWidth;

if(deviceWidth < 1084) {
  canvas.width = deviceWidth * 0.9;
  canvasElement.width = deviceWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
  canvasElement.style.filter = "brightness(0.8)";
}

// draw bird
ctx.fillStyle = bird.color;
ctx.fillRect(bird.posX, bird.posY, bird.width, bird.height);

pipes.createPipe();

// jump by key
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    bird.jump();
  }
});

// gravityEffect
let createTime = pipes.pipeBetweenSize / canvas.FPS;

setInterval(() => {
  pipes.createPipe();
}, createTime * 1000);
// 1 second - 120px, x second pipeBetweenSize

setInterval(() => {
  // update pipes positions
  pipes.updatePipe();

  // gravity effect
  bird.update();

  //ai
  ai.makeDecide();
}, 1000 / canvas.FPS);

canvasElement.style.width = `${canvas.width}px`;
canvasElement.style.height = `${canvas.height}px`;
canvasElement.style.backgroundColor = `${canvas.bgColor}`;
