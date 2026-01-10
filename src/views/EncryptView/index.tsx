'use client';

import { useState } from 'react';
import DynamicReactJson from 'src/components/DynamicReactJson';
import { Button } from 'src/components/shadcn-ui/button';
import { ENCRYPT_KEY, IV_HEX } from 'src/configs/constance';
import { useRandomNumber } from 'src/hooks/actions/crypt.action';
import { decryptText } from 'src/services/encrypt';
import DomainInfo, { DomainInfoType } from './DomainInfo';

export default function EncryptView() {
  const [hello, setHello] = useState<{ data: string }>({ data: '' });
  const [encryptData, setEncryptData] = useState<object>({});
  const [error, setError] = useState('');
  const [axiosError, setAxiosError] = useState('');
  const [axiosRandomData, setAxiosRandomData] = useState<object>({});
  const [data, setData] = useState<DomainInfoType | undefined>(undefined);

  const { mutate, isPending } = useRandomNumber({
    onSuccess: (data) => {
      setAxiosRandomData(data);
    },
    onError: (error) => {
      setAxiosRandomData(error);
    },
  });

  function onReset() {
    setHello({ data: '' });
    setEncryptData({});
    setError('');
    setAxiosError('');
    setAxiosRandomData({});
    setData(undefined);
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

  async function getAxiosRandomData() {
    mutate();
  }

  return (
    <div className="container">
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
        <Button onClick={getAxiosRandomData} disabled={isPending} isLoading={isPending}>
          Axios random data
        </Button>
        <DynamicReactJson src={axiosRandomData} rootProps={{ className: 'mt-2' }} />
        {axiosError && <p className="text-destructive">{error}</p>}
      </div>
      <DomainInfo data={data} setData={setData} />
    </div>
  );
}
