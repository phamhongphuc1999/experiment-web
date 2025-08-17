import { NextResponse } from 'next/server';
import { ENCRYPT_KEY, exampleJson, IV_HEX } from 'src/configs/constance';
import { encryptText } from 'src/services/encrypt';

export async function GET() {
  const data = encryptText(ENCRYPT_KEY, IV_HEX, JSON.stringify(exampleJson));
  return NextResponse.json({ data });
}
