'use client';

import { useState } from 'react';
import DynamicReactJson from 'src/components/DynamicReactJson';
import { Button } from 'src/components/shadcn-ui/button';
import { ENCRYPT_KEY, exampleJson, IV_HEX } from 'src/configs/constance';
import { getCurrentTimestamp, hexToUint8Array } from 'src/services';
import { decryptText, encryptText } from 'src/services/encrypt';
import { initWasm } from 'src/services/wasm';
import * as uuid from 'uuid';

export default function EncryptView() {
  const [hello, setHello] = useState<{ data: string }>({ data: '' });
  const [encryptData, setEncryptData] = useState<object>({});
  const [wasmData, setWasmData] = useState<object>({});
  const [error, setError] = useState('');
  const [randomData, setRandomData] = useState<object>({});

  function onReset() {
    setHello({ data: '' });
    setEncryptData({});
    setWasmData({});
    setError('');
    setRandomData({});
  }

  async function onHello() {
    const res = await fetch('/api/hello');
    setHello(await res.json());
  }

  async function onEncrypt() {
    const res = await fetch('/api/crypt');
    const rawData = await res.json();
    const data = decryptText(ENCRYPT_KEY, IV_HEX, rawData.data);
    setEncryptData({ encryptedData: rawData.data, decryptedData: JSON.parse(data) });
  }

  async function onWasm() {
    const wasm = await initWasm();
    const iv = hexToUint8Array(IV_HEX);
    const id = uuid.v4();
    const currentTimestamp = getCurrentTimestamp();
    const expiredTimestamp = currentTimestamp + 15 * 60;
    const _key = wasm.create_key(ENCRYPT_KEY, iv, expiredTimestamp.toString(), id);

    const decryptedKey = decryptText(ENCRYPT_KEY, IV_HEX, _key);

    const enc = encryptText(_key, IV_HEX, JSON.stringify(exampleJson));
    const dec = wasm.decrypt(_key, iv, enc);
    setWasmData({ decryptedKey, encryptedData: enc, decryptedData: JSON.parse(dec) });
  }

  async function getRandomData() {
    try {
      const wasm = await initWasm();
      const iv = hexToUint8Array(IV_HEX);
      const id = uuid.v4();
      const currentTimestamp = getCurrentTimestamp();
      const expiredTimestamp = currentTimestamp + 15 * 60;
      const _key = wasm.create_key(ENCRYPT_KEY, iv, expiredTimestamp.toString(), id);
      const res = await fetch('/api/random-user', {
        headers: {
          'x-client-id': _key,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!data.status) throw Error(data.message);
      const decryptedData = wasm.decrypt(_key, iv, data.data);
      setRandomData(JSON.parse(decryptedData));
      setError('');
    } catch (error) {
      setError(String(error));
    }
  }

  return (
    <>
      <Button onClick={onReset}>Reset</Button>
      <div className="border-sidebar-border mt-4 rounded-xl border p-4">
        <Button onClick={onHello}>Hello</Button>
        <DynamicReactJson src={hello} rootProps={{ className: 'mt-2' }} />
      </div>
      <div className="border-sidebar-border mt-4 rounded-xl border p-4">
        <Button onClick={onEncrypt}>Encrypt</Button>
        <DynamicReactJson src={encryptData} rootProps={{ className: 'mt-2' }} />
      </div>
      <div className="border-sidebar-border mt-4 rounded-xl border p-4">
        <Button onClick={onWasm}>WASM</Button>
        <DynamicReactJson src={wasmData} rootProps={{ className: 'mt-2' }} />
      </div>
      <div className="border-sidebar-border mt-4 rounded-xl border p-4">
        <Button onClick={getRandomData}>Random data</Button>
        <DynamicReactJson src={randomData} rootProps={{ className: 'mt-2' }} />
        {error && <p className="text-destructive">{error}</p>}
      </div>
    </>
  );
}
