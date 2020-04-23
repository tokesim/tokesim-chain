import { Command } from "commander";
import { makeLogger } from "../lib/logging";
import { AccountFileEntries } from "../lib/accounts";
import fs from "fs-extra";
import { startSimulator } from "../chain";

const logger = makeLogger("Tokesim Chain Service", "Commands");

export interface ParsedCommands {
  port: string;
  chain: ChainType;
}
export type ChainType = "ethereum";

const parseCommands = async (prog: Command): Promise<ParsedCommands> => {
  logger.debug("parsing commands");
  let chain: ChainType = "ethereum";
  let port = "9292";
  if (prog.port) { port = prog.port; }
  if (prog.chain === "ethereum") { chain = "ethereum"; }
  logger.debug(`parsed commands ${port} ${chain}`);
  return { port, chain };
};

export const startSimulatorFromCLI = async (program: any): Promise<void> => {
  const commands = await parseCommands(program);
  logger.info(`Starting simulator on port ${commands.port} with ${commands.chain}`)
  return startSimulator(commands.port, commands.chain);
};
