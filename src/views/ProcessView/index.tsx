'use client';

import { ListEmpty } from 'src/components/Empty';
import { Button } from 'src/components/shadcn-ui/button';
import { ProcessMachineContext } from 'src/state-machine/process.state-machine';
import { useProcessStore } from 'src/states/process.state';
import ExportImportData from './ExportImportData';
import ProcessHeader from './ProcessHeader';
import ProcessQueueView from './ProcessQueueView';

function ProcessViewLayout() {
  const { processes } = useProcessStore();

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
        <ProcessQueueView />
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
