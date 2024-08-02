import getTransactionReceipt from './multisigHandler';
import EnvParamsProvider from './envParamsProvider';
import FilecoinMultisigHandler from './multisigHandler';
import {getRequester} from './index';
const winston = require('winston');

async function main() {
  const now_time = new Date().toISOString();
  // 设置logger
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'multisig-service'},
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({filename: 'error.log', level: 'error'}),
      new winston.transports.File({filename: 'combined.log'}),
    ],
  });

  const envParamsProvider = new EnvParamsProvider(process.env);
  const requester = getRequester(envParamsProvider);

  const multisigHandler = new FilecoinMultisigHandler(
    logger,
    envParamsProvider,
    requester
  );

  // 各种参数 
  // 1 f079426
  // 2 f0111584
  // 3 f02182258
  let minerId = 'f02182258';
  const newOwnerId = "f03153746"
  // t03837
  // let encodeParams = 'RADenQg=';
  // let txnid = 0;


  // step 1
  // let rs = await multisigHandler.changeMinerOwner(
  //   minerId,
  //   newOwnerId
  // );

  // step 2
  // 主节点发起变更owner请求
  // let encodeParams="RQDSvsAB";
  // let rs = await multisigHandler.initNewMultisigChangeOwner2(
  //   minerId,
  //   encodeParams
  // );

  // step 3
  // 副节点同意变更owner请求
  let encodeParams="RQDSvsAB";
  let txnid = 2;
  let rs = await multisigHandler.approveMultisigChangeOwner2(
    minerId,
    txnid,
    encodeParams
  );

  console.log(`result is: ${rs}`);
}

main()
  .then()
  .catch(err => console.log(err))
  .finally(() => process.exit());







