import { ChainMethodMapping } from "./methods";
import EthClient from "@etclabscore/ethereum-json-rpc";
import * as types from "../generated-types";
import ganache from "ganache-core";
import Client from "@open-rpc/client-js";
import { RequestManager, HTTPTransport } from "@open-rpc/client-js";
import { randomBytes } from "crypto";
import { AccountInfo } from "../lib/accounts";

/*

  id: string;
  port: Function();
  close: Function();
  status: Function();
  meta: Object;
*/

/*
  ActiveSimulation Storage should be a mapping
  from id to management data;
*/

export interface EthereumChainMetadata {
  rpcPort: string;
  chainId: string;
}

export const methods = (port: string, storage: any): ChainMethodMapping => {
  let rpcPort;
  let client: Client;
  let transport: HTTPTransport;
  return {
    startSimulation: async (simulationParams: types.SimulationParams) => {
      const convertAccount = (account: AccountInfo) => {
        return {
          secretKey: account.private_key,
          balance: account.balance,
        };
      };
      const { accounts } = simulationParams;
      const accountList = accounts.accounts.map(convertAccount);
      accountList.push(convertAccount(accounts.master));
      const meta = await startSimulator(accounts.accounts.concat(accounts.master));
      transport = new HTTPTransport(`http://localhost:${meta.rpcPort}`);
      client = new Client(new RequestManager([transport]));
      await client.request("miner_start", []);
      rpcPort = meta.rpcPort;

      return { id: randomBytes(32).toString("hex"), meta };
    },
    stopSimulation: async () => {
      return true;
    },
    endBlock: async () => {
      return client.request("miner_stop", []);
    },
    startBlock: async () => {
      return client.request("miner_start", []);
    },
  };
};

const convertAccountToGanacheFormat = (account: types.AccountEntry) => {
  return {
    secretKey: account.private_key,
    balance: account.balance,
  };
};

const startSimulator = async (accounts: types.AccountList): Promise<EthereumChainMetadata> => {
  const server = ganache.server({
    accounts: accounts.map(convertAccountToGanacheFormat),
  });

  return new Promise((resolve, reject) => {

    server.listen(0, async (err: any, blockchain: any) => {
      if (err) {
        reject(err);
      }
      const ethClient = new EthClient({
        transport: {
          host: "localhost",
          port: server.address().port,
          type: "http",
        },
      });
      const chainId = await ethClient.eth_chainId();
      resolve({
        rpcPort: server.address().port,
        chainId,
      });
    });
  });
};
