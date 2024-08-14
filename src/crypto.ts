import * as Vault from 'node-vault';

let vaultSecret: string | null = null;

// 定义参数类型
interface AesDecryptParams {
    vaultUrl: string;
    vaultToken: string;
    secret: string;
    keyName: string;
}

export async function aesDecrypt({
    vaultUrl,
    vaultToken,
    secret,
    keyName,
}: AesDecryptParams): Promise<string> {
    if (vaultSecret) {
        return vaultSecret;
    }

    const vaultClient = Vault({
        apiVersion: 'v1',
        endpoint: vaultUrl,
        token: vaultToken,
    });

    try {
        // Decrypt the ciphertext
        const decryptResponse = await vaultClient.write(`transit/decrypt/${keyName}`, {
            ciphertext: secret,
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
