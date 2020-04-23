import { ChainType } from "./types";
import { ChainServer } from "./server";
import { methods as ethereumMethods } from "./ethereum";
import { IMethodMapping } from "@open-rpc/server-js/build/router";
import { getAvailableTCPPort } from "../lib/util";

export const startSimulator = async (port: string, chain: ChainType) => {
  let methods: IMethodMapping;
  if (chain === "ethereum") {
    methods = ethereumMethods(port, null);
    const chainServer = new ChainServer(port, methods);
    await chainServer.start();
  }
};
