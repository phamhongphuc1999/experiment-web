'use client';

import { useProcessStore } from 'src/states/process.state';
import ProcessHeader from './ProcessHeader';
import ProcessItem from './ProcessItem';

export default function ProcessView() {
  const { processes } = useProcessStore();

  return (
    <div>
      <ProcessHeader />
      <div className="grid grid-cols-3 gap-4">
        {Object.values(processes).map((process) => {
          return <ProcessItem key={process.pid} data={process} type="read" />;
        })}
      </div>
    </div>
  );
}
