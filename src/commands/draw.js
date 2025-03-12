const logger = require("../logger")("draw");
const chalk = require("chalk");
const keypress = require("keypress");

module.exports = function draw(config) {
  const drawingChar = "#";

  // Grid for drawing
  let width = 30;
  let height = 20;
  let grid = Array(height)
    .fill()
    .map(() => Array(width).fill(" "));

  // Current cursor position
  let x = 0,
    y = 0;

  // Function to display the current drawing with an outline
  const renderDrawing = () => {
    console.clear();
    console.log(chalk.green("ASCII Drawing Tool"));
    console.log(chalk.yellow("Use arrow keys to move, 'e' to erase everything, 'q' to quit"));
    console.log();

    // Draw the outline of the drawable area
    console.log("+" + "-".repeat(width) + "+"); // Top border
    for (let row = 0; row < height; row++) {
      let rowStr = "|"; // Left border
      for (let col = 0; col < width; col++) {
        if (grid[row][col] === " ") {
          rowStr += " "; // Empty space inside the grid
        } else {
          rowStr += grid[row][col]; // Drawing character
        }
      }
      rowStr += "|"; // Right border
      console.log(rowStr);
    }
    console.log("+" + "-".repeat(width) + "+"); // Bottom border
  };

  // Function to handle key presses
  const handleKeyPress = (ch, key) => {
    if (key && key.name === "q") {
      // Quit the tool if 'q' is pressed
      process.exit();
    }

    if (key) {
      switch (key.name) {
        case "up":
          if (y > 0) y--;
          break;
        case "down":
          if (y < height - 1) y++;
          break;
        case "left":
          if (x > 0) x--;
          break;
        case "right":
          if (x < width - 1) x++;
          break;
        case "e": // Erase everything (clear the entire grid)
          grid = Array(height)
            .fill()
            .map(() => Array(width).fill(" "));
          break;
        default:
          break;
      }

      // Automatically draw '#' at the new cursor position
      grid[y][x] = drawingChar;

      renderDrawing(); // Re-render after each key press
    }
  };

  // Set up the keypress listener
  keypress(process.stdin);

  // Begin listening for user input
  process.stdin.on("keypress", handleKeyPress);

  // Start the application
  renderDrawing();

  // Make the terminal ready to receive keypress events
  process.stdin.setRawMode(true);
  process.stdin.resume();
};
