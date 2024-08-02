import * as Vault from 'node-vault';
import * as fs from 'fs';

let vaultSecret: string | null = null;

export async function aesDecrypt(): Promise<string> {
    if (vaultSecret) {
        return vaultSecret;
    }

    const vaultUrl = process.env.VAULT_ADDR || 'http://127.0.0.1:8200';
    const vaultToken = process.env.VAULT_TOKEN;
    const keyName = process.env.KEY_NAME;
    const secret = process.env.SECRET;

    const vaultClient = Vault({
        apiVersion: 'v1',
        endpoint: vaultUrl,
        token: vaultToken,
    });

    // console.log('vaultUrl:', vaultUrl);
    // console.log('token:', vaultToken);
    // console.log('secret:', secret);


    try {

        // Decrypt the ciphertext
        const decryptResponse = await vaultClient.write(`transit/decrypt/${keyName}`, {
            ciphertext: secret
        });
        vaultSecret = Buffer.from(decryptResponse.data.plaintext, 'base64').toString('utf-8').trim();

    } catch (error) {
        console.error('Error:', error);
    }
    if (vaultSecret) {
        return vaultSecret;
    } else {
        throw new Error('Vault secret not found');
    }
}