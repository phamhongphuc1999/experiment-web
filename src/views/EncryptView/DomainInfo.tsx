'use client';

import { Dispatch, SetStateAction } from 'react';
import DynamicReactJson from 'src/components/DynamicReactJson';
import { Button } from 'src/components/shadcn-ui/button';
import { initWasm } from 'src/services/wasm';

export type DomainInfoType = {
  hostname: string;
  host: string;
  origin: string;
  href: string;
};

interface Props {
  data: DomainInfoType | undefined;
  setData: Dispatch<SetStateAction<DomainInfoType | undefined>>;
}

export default function DomainInfo({ data, setData }: Props) {
  async function onGetDomain() {
    const wasm = await initWasm();
    const hostname = wasm.get_hostname();
    const host = wasm.get_host();
    const origin = wasm.get_origin();
    const href = wasm.get_href();
    setData({ hostname, host, origin, href });
  }
  return (
    <div className="border-sidebar-border mt-4 rounded-xl border p-4">
      <Button onClick={onGetDomain}>Get domain</Button>
      {data && <DynamicReactJson src={data} rootProps={{ className: 'mt-2' }} />}
    </div>
  );
}
