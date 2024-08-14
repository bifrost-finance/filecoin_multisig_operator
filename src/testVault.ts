// test.ts
require('dotenv').config();

import { aesDecrypt } from './crypto'; // 替换为实际文件路径


async function main() {
    try {
        const secret = await aesDecrypt({
            vaultUrl: process.env.VAULT_ADDR || 'http://127.0.0.1:8200',
            vaultToken: process.env.VAULT_TOKEN || '',
            secret: process.env.SECRET || '',
            keyName: process.env.KEY_NAME || '',
        });
        console.log('Decrypted secret:', secret);
    } catch (error) {
        console.error('Error decrypting secret:', error);
    }
}

main();
