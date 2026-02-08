'use client';

import { ListEmpty } from 'src/components/Empty';
import { useProcessStore } from 'src/states/process.state';
import ProcessHeader from './ProcessHeader';
import ProcessQueueView from './ProcessQueueView';

export default function ProcessView() {
  const { processes } = useProcessStore();

  return (
    <div>
      <ProcessHeader />
      {Object.values(processes).length == 0 ? (
        <ListEmpty
          title="No processes created yet."
          rootprops={{ className: 'cols-span-2 rounded-none' }}
        />
      ) : (
        <ProcessQueueView />
      )}
    </div>
  );
}
