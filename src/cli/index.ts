#!/usr/bin/env node
import program from "commander";
const version = require("../../../package.json").version; // tslint:disable-line
import { makeLogger } from "../lib/logging";
import { startSimulatorFromCLI } from "./commands";

const logger = makeLogger("Tokesim Chain Service", "CLI");
program
  .version(version, "-v, --version")
  .option(
    "-c, --chain <ethereum>",
    "JSON file path pointing to an accounts config file",
  )
  .option(
    "-p, --port <port>",
    "Set port for simulator",
    "7545",
  )
  .action(async () => {
    try {
      await startSimulatorFromCLI(program);
      logger.info("simulator service launched!");
    } catch (e) {
      logger.error(e);
      logger.error("Could not start simulator");
      logger.debug(e.stack);
    }
  })
  .parse(process.argv);
