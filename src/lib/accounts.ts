export interface AccountInfo {
  private_key: string;
  pub_addr: string;
  balance: string;
}

export interface AccountFileEntries {
  master: AccountInfo;
  accounts: [AccountInfo];
}
