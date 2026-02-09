/* eslint-disable @typescript-eslint/no-explicit-any */
import { Export, Import } from 'iconsax-reactjs';
import { useRef, useState } from 'react';
import AppTooltip from 'src/components/AppTooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import { useProcessStore } from 'src/states/process.state';
import { ProcessDataObjectType, ProcessStatusType } from 'src/types/process.type';

export default function ExportImportData() {
  const { processes, fn } = useProcessStore();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImport() {
    setOpen(true);
  }

  function onExport() {
    const jsonStr = JSON.stringify(processes, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);

        const result: ProcessDataObjectType = {};

        if (Array.isArray(json)) {
          json.forEach((item: Record<string, any>, index: number) => {
            const pid = (item.pid as string) || crypto.randomUUID();
            result[pid] = {
              ...(item as any),
              pid,
              index: (item.index as number) ?? index + 1,
              state: ProcessStatusType.NEW,
              runtime: 0,
              currentBlockTaskIndex: 0,
              readyPriority: -1,
              waitingPriority: -1,
              beginAt: -1,
              endAt: -1,
              blockTasks: item.blockTasks?.map((task: any) => ({
                ...task,
                runtime: 0,
              })),
            };
          });
        } else if (typeof json === 'object' && json !== null) {
          Object.entries(json).forEach(([key, item]: [string, any]) => {
            result[key] = {
              ...item,
              pid: (item.pid as string) || key,
              state: ProcessStatusType.NEW,
              runtime: 0,
              currentBlockTaskIndex: 0,
              readyPriority: -1,
              waitingPriority: -1,
              beginAt: -1,
              endAt: -1,
              blockTasks: item.blockTasks?.map((task: any) => ({
                ...task,
                runtime: 0,
              })),
            };
          });
        }
        fn.setProcesses(result);
        setOpen(false);
      } catch (error) {
        console.error(error);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <AppTooltip tooltipContent="Import">
            <Import onClick={onImport} size={14} className="cursor-pointer" />
          </AppTooltip>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import data</DialogTitle>
          </DialogHeader>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={onFileChange}
            className="block w-full"
          />
        </DialogContent>
      </Dialog>
      <AppTooltip tooltipContent="Export">
        <Export onClick={onExport} size={14} className="cursor-pointer" />
      </AppTooltip>
    </>
  );
}
