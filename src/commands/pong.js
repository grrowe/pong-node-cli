const logger = require("../logger")("pong");

const keypress = require("keypress");

module.exports = function pong(config) {
  const width = 40;
  const height = 20;
  const paddleHeight = 4;

  let leftScore = 0;
  let rightScore = 0;

  let leftPaddleY = Math.floor(height / 2) - Math.floor(paddleHeight / 2);
  let rightPaddleY = Math.floor(height / 2) - Math.floor(paddleHeight / 2);

  let ballX = Math.floor(width / 2);
  let ballY = Math.floor(height / 2);
  let ballDirectionX = 1;
  let ballDirectionY = -1;

  const render = () => {
    console.clear();

    logger.highlight(`SCORE`);
    logger.highlight(`LEFT: ${leftScore} | RIGHT: ${rightScore}`);

    // TOP BORDER
    console.log(`+` + `-`.repeat(width) + `+`);

    for (let row = 0; row < height; row++) {
      let line = "|";

      // left paddle
      if (row >= leftPaddleY && row < leftPaddleY + paddleHeight) {
        line += "#";
      } else {
        line += " ";
      }

      // ball
      for (let col = 1; col < width - 1; col++) {
        if (col === ballX && row === ballY) {
          line += "O";
        } else {
          line += " ";
        }
      }

      // right paddle
      if (row >= rightPaddleY && row < rightPaddleY + paddleHeight) {
        line += "#";
      } else {
        line += " ";
      }

      line += "|";
      console.log(line);
    }

    // BOTTOM BORDER
    console.log(`+` + `-`.repeat(width) + `+`);

    console.log(`Press Up and Down arrow keys to move the paddle`);
    console.log(`Press 'q' to quit the game.`);
  };

  const handleKeyPress = (ch, key) => {
    if (key && key.name === "q") {
      process.exit(1);
    }

    if (key) {
      switch (key.name) {
        case "up":
          if (leftPaddleY > 0) leftPaddleY--;
          break;
        case "down":
          if (leftPaddleY < height - paddleHeight) leftPaddleY++;
          break;
        case "w":
          if (leftPaddleY > 0) leftPaddleY--;
          break;
        case "s":
          if (leftPaddleY < height - paddleHeight) leftPaddleY++;
          break;
        case "q":
          process.exit(1);
        default:
          break;
      }
    }
  };

  const moveBall = () => {
    ballX += ballDirectionX;
    ballY += ballDirectionY;

    if (ballY <= 0 || ballY >= height - 1) {
      ballDirectionY *= -1;
    }

    if (
      ballX === 1 &&
      ballY >= leftPaddleY &&
      ballY < leftPaddleY + paddleHeight
    ) {
      ballDirectionX *= -1;
    }

    if (
      ballX === width - 2 &&
      ballY >= rightPaddleY &&
      ballY < rightPaddleY + paddleHeight + 1
    ) {
      ballDirectionX *= -1;
    }

    if (ballX <= 0) {
      rightScore++;
      resetBall();
    } else if (ballX >= width) {
      leftScore++;
      resetBall();
    }
  };

  const resetBall = () => {
    ballX = Math.floor(width / 2);
    ballY = Math.floor(height / 2);

    ballDirectionX = -ballDirectionX;
    ballDirectionY = -1;
  };

  const moveRightPaddle = () => {
    const missChance = 0.2;

    if (Math.random() < missChance) {
      return;
    }

    if (ballY < rightPaddleY) {
      if (rightPaddleY > 0) rightPaddleY--;
    } else if (ballY > rightPaddleY + paddleHeight - 1) {
      if (rightPaddleY < height - paddleHeight) rightPaddleY++;
    }
  };

  const gameLoop = () => {
    moveBall();
    moveRightPaddle();
    render();
  };

  const startGame = () => {
    render();
    setInterval(gameLoop, 100);
  };

  keypress(process.stdin);

  process.stdin.on("keypress", handleKeyPress);

  process.stdin.setRawMode(true);
  process.stdin.resume();

  startGame();
};
