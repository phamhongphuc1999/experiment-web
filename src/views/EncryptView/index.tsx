'use client';

import { useState } from 'react';
import DynamicReactJson from 'src/components/DynamicReactJson';
import { Button } from 'src/components/shadcn-ui/button';
import { ENCRYPT_KEY, exampleJson, IV_HEX } from 'src/configs/constance';
import { hexToUint8Array } from 'src/services';
import { decryptText, encryptText } from 'src/services/encrypt';
import { initWasm } from 'src/services/wasm';

export default function EncryptView() {
  const [hello, setHello] = useState<{ data: string }>({ data: '' });
  const [encryptData, setEncryptData] = useState<object>({});
  const [wasmData, setWasmData] = useState<object>({});

  function onReset() {
    setHello({ data: '' });
    setEncryptData({});
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
    const enc = encryptText(ENCRYPT_KEY, IV_HEX, JSON.stringify(exampleJson));
    const dec = wasm.decrypt(ENCRYPT_KEY, iv, enc);
    setWasmData({ encryptedData: enc, decryptedData: JSON.parse(dec) });
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
    </>
  );
}
