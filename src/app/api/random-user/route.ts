import { NextResponse } from 'next/server';
import { ENCRYPT_KEY, IV_HEX } from 'src/configs/constance';
import { getCurrentTimestamp } from 'src/services';
import { decryptText, encryptText, randomIvHex } from 'src/services/encrypt';

export async function GET(req: Request) {
  const clientId = req.headers.get('x-client-id');
  if (clientId) {
    try {
      const decryptedKey = decryptText(ENCRYPT_KEY, IV_HEX, clientId);
      const [timestamp, _] = decryptedKey.split('---');
      const currentTimestamp = getCurrentTimestamp();
      if (currentTimestamp > Number(timestamp))
        NextResponse.json({ message: 'clientId is expired', status: false }, { status: 400 });
      const _res = await fetch('https://randomuser.me/api/');
      const randomData = await _res.json();
      const iv = randomIvHex();
      const data = encryptText(clientId, iv, JSON.stringify(randomData));
      const rawResponse = NextResponse.json({ data, iv, status: true });
      rawResponse.headers.set('x-client-id', clientId);
      return rawResponse;
    } catch (error) {
      return NextResponse.json({ message: String(error), status: false }, { status: 400 });
    }
  }
  return NextResponse.json({ message: 'clientId is not found', status: false }, { status: 400 });
}
