#!/usr/bin/env node
const logger = require("../src/logger")("bin");
const arg = require("arg");
const chalk = require("chalk");
const getConfig = require("../src/config/config-mgr");
const start = require("../src/commands/start");
const draw = require("../src/commands/draw");
const pong = require("../src/commands/pong");

try {
  const args = arg({
    "--start": Boolean,
    "--draw": Boolean,
    "--pong": Boolean,
  });

  logger.debug("Received args", args);

  if (args["--start"]) {
    const config = getConfig();
    start(config);
  }
  if (args["--draw"]) {
    const config = getConfig();
    draw(config);
  }
  if (args["--pong"]) {
    const config = getConfig();
    pong(config);
  }
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--draw")}\tInteractive drawing!`);
}
