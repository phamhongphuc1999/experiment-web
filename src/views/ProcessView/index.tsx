'use client';

import { ListEmpty } from 'src/components/Empty';
import ViewProcessItem from 'src/components/ProcessItem/ViewProcessItem';
import { useProcessStore } from 'src/states/process.state';
import ProcessHeader from './ProcessHeader';

export default function ProcessView() {
  const { processes } = useProcessStore();

  return (
    <div>
      <ProcessHeader />
      {Object.values(processes).length == 0 && (
        <ListEmpty
          title="No processes created yet."
          rootprops={{ className: 'mt-2 cols-span-2' }}
        />
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.values(processes)
          .sort((p1, p2) => {
            return p1.arrivalTime - p2.arrivalTime;
          })
          .map((process) => {
            return <ViewProcessItem key={process.pid} data={process} />;
          })}
      </div>
    </div>
  );
}
