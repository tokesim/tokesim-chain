export type Chain = string;
export type PrivateKey = string;
export type PubAddr = string;
export type Balance = string;
export interface Master {
  private_key: PrivateKey;
  pub_addr: PubAddr;
  balance: Balance;
  [k: string]: any;
}
export interface AccountEntry {
  private_key: PrivateKey;
  pub_addr: PubAddr;
  balance: Balance;
  [k: string]: any;
}
export type AccountList = AccountEntry[];
export interface Accounts {
  master: Master;
  accounts: AccountList;
  [k: string]: any;
}
export interface SimulationParams {
  chain: Chain;
  accounts: Accounts;
  [k: string]: any;
}
export type SimulationId = string;
export type Port = string;
export interface SimulationResult {
  id: SimulationId;
  port?: Port;
  [k: string]: any;
}
export type StoppedSimulation = boolean;
export type StartedBlockTransactionResult = boolean;
export type EndBlockTransactionResult = boolean;
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type StartSimulation = (simulationParams: SimulationParams) => Promise<SimulationResult>;
export type StopSimulation = (simulationId?: SimulationId) => Promise<StoppedSimulation>;
export type StartBlockTransactions = (simulationId?: SimulationId) => Promise<StartedBlockTransactionResult>;
export type EndBlockTransactions = (simulationId?: SimulationId) => Promise<EndBlockTransactionResult>;
