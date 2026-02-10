import SettingDialog from 'src/components/process-ui/dialogs/SettingDialog';
import { Badge } from 'src/components/shadcn-ui/badge';
import { useProcessStore } from 'src/states/process.state';

export default function SettingSpot() {
  const { status } = useProcessStore();

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className="rounded-none border-blue-500/20 bg-blue-500/5 px-2 text-[9px] font-black tracking-widest text-blue-600 uppercase dark:text-blue-400"
      >
        STATUS: {status}
      </Badge>
      <div className="bg-border h-6 w-px" />
      <SettingDialog />
    </div>
  );
}
