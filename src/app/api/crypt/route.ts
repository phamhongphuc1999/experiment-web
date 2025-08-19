import { NextResponse } from 'next/server';
import { ENCRYPT_KEY, IV_HEX } from 'src/configs/constance';
import { encryptText } from 'src/services/encrypt';

export async function GET() {
  const res = await fetch('https://randomuser.me/api/');
  const randomData = await res.json();
  const data = encryptText(ENCRYPT_KEY, IV_HEX, JSON.stringify(randomData));
  return NextResponse.json({ data });
}
