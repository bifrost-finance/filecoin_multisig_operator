/// constants

// terminal params
export const CREATE = 'create';
export const INIT = 'init';
export const APPROVE = 'approve';
export const CANCEL = 'cancel';
export const TRANSFER = 'transfer';

// form mainnet
export const MULTISIG_ACTOR_CODE_CID =
    'bafk2bzaceajcmsngu3f2chk2y7nanlen5xlftzatytzm6hxwiiw5i5nz36bfc';

// for calibration
export const CALIBRATION_MULTISIG_ACTOR_CODE_CID =
    'bafk2bzacedwx4svscsp6wqqu2vlcunjihvvm4u2jnsqjkwutjhir7dwtl7z6m';

// for calibration
export const CALIBRATION_STORAGE_MINER_ACTOR_CODE_CID =
    'bafk2bzacecr7ozkdz7l2pq3ig5qxae2ysivbnojhsn4gw3o57ov4mhksma7me';

// for mainnet
export const STORAGE_MINER_ACTOR_CODE_CID =
    'bafk2bzacea3f43rxzemmakjpktq2ukayngean3oo2de5cdxlg2wsyn53wmepc';

/// interfaces
export interface message {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gaslimit: number;
  gasfeecap: string;
  gaspremium: string;
  method: MsigMethod | BuiltInMethod;
  params: string;
}

/* MSIG Method*/
export enum MsigMethod {
  WITHDRAW = 0,
  PROPOSE = 2,
  APPROVE = 3,
  CANCEL = 4,
  ADD_SIGNER = 5,
  REMOVE_SIGNER = 6,
  SWAP_SIGNER = 7,
  CHANGE_NUM_APPROVALS_THRESHOLD = 8,
  LOCK_BALANCE = 9,
}

export enum BuiltInMethod {
  CONSTRUCTOR = 1,
  CHANGE_WORKER_ADDRESS = 3,
  CHANGE_OWNER_ADDRESS = 23,
}
