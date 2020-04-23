/**
 * This handles the routing for the RPC server, exposing the methods that the server handles
 */
import { makeLogger } from "../lib/logging";
import { IMethodMapping } from "@open-rpc/server-js/build/router";
import * as types from "../generated-types";
const logger = makeLogger("Tokesim-Chain", "Methods");

export interface ChainMethodMapping extends IMethodMapping {
  startSimulation: types.StartSimulation;
  stopSimulation: types.StopSimulation;
  startBlock: types.StartBlockTransactions;
  endBlock: types.EndBlockTransactions;
}
