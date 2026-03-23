'use client';

import TitleBox from 'src/components/box/TitleBox';
import { useGetMe } from 'src/queries/papp/user.query';

export default function Overview() {
  const { data } = useGetMe();

  return (
    <div className="flex flex-wrap items-center gap-10">
      <TitleBox title="Name" value={data?.name} />
      <TitleBox title="Email" value={data?.email} />
      <TitleBox title="Role" value={data?.role} />
    </div>
  );
}
