import getTransactionReceipt from './multisigHandler';
import EnvParamsProvider from './envParamsProvider';
import FilecoinMultisigHandler from './multisigHandler';
import { getRequester } from './index';
const winston = require('winston');

async function main() {
  const now_time = new Date().toISOString();
  // 设置logger
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'multisig-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  // 读取环境变量、.env 里的配置
  const envParamsProvider = new EnvParamsProvider(process.env);
  // 构建 http request 请求框架
  const requester = getRequester(envParamsProvider);

  // 创建多签处理器
  const multisigHandler = new FilecoinMultisigHandler(
    logger,
    envParamsProvider,
    requester
  );

  // 各种参数 
  let minerId = 'f02182258';
  let encodeParams = 'RACH/30=';
  // bafy2bzacecpkxvgzp5suvif5ilh2u2rzf4ucgfwwp4rtjzxutgsugu7vx6se6
  // txnid=512
  let txnid = 1333;

  // 主节点发起变更owner请求
  // let rs = await multisigHandler.initNewMultisigChangeOwner2(
  //   minerId,
  //   encodeParams
  // );

  // 副节点同意变更owner请求
  let rs = await multisigHandler.approveMultisigTransfer(
    // 发给谁 f02090461 f02099612 f02078888
    'f02097134',
    // amount 10000000000000000000
    '650000000000000000000',
    // cid
    'bafy2bzaceb5yjuhvythn4egbyq64g3zabadtcgentum2e4c54j3guokxuiffc'
  );

  let address = 'f410f7gr7frgry5mnecl7mbrbynk2uaqrwuftbqwy6py'
  // trans
  // let rs = await multisigHandler.simpleTransfer(
  //   address,
  //   '1000000000000000000',
  // );

  // 主节点同意请求
  // let rs = await multisigHandler.approveMultisigChangeOwner2(
  //   // 发给谁
  //   minerId,
  //   txnid,
  //   encodeParams
  // );

  console.log(`result is: ${rs}`);
}

main()
  .then()
  .catch(err => console.log(err))
  .finally(() => process.exit());
