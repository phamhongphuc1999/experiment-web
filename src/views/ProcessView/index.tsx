'use client';

import { ListEmpty } from 'src/components/Empty';
import { Button } from 'src/components/shadcn/button';
import { ProcessMachineContext } from 'src/state-machine/process.state-machine';
import { useProcessStore } from 'src/states/process.state';
import ExportImportData from './ExportImportData';
import ProcessHeader from './ProcessHeader';
import ProcessQueueView from './ProcessQueueView';
import TimelineChart from './TimelineChart';

function ProcessViewLayout() {
  const { processes, displayMode } = useProcessStore();

  return (
    <div>
      <ProcessHeader />
      {Object.values(processes).length == 0 ? (
        <ListEmpty
          title="No processes created yet."
          rootprops={{ className: 'cols-span-2 flex-col rounded-none mt-2' }}
          component={
            <div className="mt-2 flex items-center gap-2">
              <ExportImportData
                isShowExport={false}
                components={{ import: <Button className="rounded-none">Import</Button> }}
              />
            </div>
          }
        />
      ) : (
        <>
          {displayMode == 'column' && <ProcessQueueView />}
          {displayMode == 'chart' && (
            <div className="h-[calc(100vh-100px)] border p-1 shadow-sm transition-all duration-300">
              <TimelineChart />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ProcessView() {
  return (
    <ProcessMachineContext.Provider>
      <ProcessViewLayout />
    </ProcessMachineContext.Provider>
  );
}
