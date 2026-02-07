import { DialogProps } from '@radix-ui/react-dialog';
import { Setting } from 'iconsax-reactjs';
import { Button } from 'src/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import { ProcessSchedulerConfigs } from 'src/configs/constance';
import { useProcessStore } from 'src/states/process.state';

export default function SettingDialog(props: DialogProps) {
  const {
    mode,
    fn: { setMetadata },
  } = useProcessStore();

  return (
    <Dialog {...props}>
      <DialogTrigger>
        <Setting size={14} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-none p-4">
        <DialogHeader className="border-b pb-1">
          <DialogTitle>Process Setting</DialogTitle>
        </DialogHeader>
        <p className="text-lg font-semibold">Scheduler Mode</p>
        <div className="flex flex-wrap items-center gap-1">
          {Object.values(ProcessSchedulerConfigs).map((item) => {
            return (
              <Button
                key={item.id}
                variant={mode == item.id ? 'default' : 'outline'}
                onClick={() => setMetadata({ mode: item.id })}
                className="rounded-none"
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
