import { Badge } from 'src/components/shadcn-ui/badge';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { useProcessStore } from 'src/states/process.state';
import SettingDialog from '../dialogs/SettingDialog';

export default function SettingSpot() {
  const { status } = useProcessStore();
  const [state] = useProcessStateMachine();

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 md:flex">
        <Badge
          variant="outline"
          className="rounded-none border-blue-500/20 bg-blue-500/5 px-2 text-[9px] font-black tracking-widest text-blue-600 uppercase dark:text-blue-400"
        >
          STORE: {status}
        </Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 ring-primary/20 rounded-none px-2 text-[9px] font-black tracking-widest uppercase shadow-none ring-1">
          FSM: {state.value.toString()}
        </Badge>
      </div>
      <div className="bg-border h-6 w-px" />
      <SettingDialog />
    </div>
  );
}
