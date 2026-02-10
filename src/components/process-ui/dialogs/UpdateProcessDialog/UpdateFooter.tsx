import { Trash } from 'iconsax-reactjs';
import { Button } from 'src/components/shadcn-ui/button';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { useProcessStore } from 'src/states/process.state';
import { ProcessMachineEvent } from 'src/types/process.type';

interface Props {
  onSave(): void;
  onOpenChange?: (open: boolean) => void;
}

export default function UpdateFooter({ onSave, onOpenChange }: Props) {
  const { status } = useProcessStore();
  const { send } = useProcessStateMachine();

  function onClear() {
    send({ type: ProcessMachineEvent.CLEAR });
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={status === 'running'}
        className="text-destructive hover:text-destructive/50 border-destructive! hover:border-destructive/50 rounded-none"
        onClick={onClear}
        contentprops={{ className: 'flex items-center gap-1' }}
      >
        <Trash size={10} />
        <span className="text-[11px] font-medium tracking-tight uppercase">Clear all</span>
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => onOpenChange?.(false)}
          type="button"
          className="rounded-none"
        >
          Cancel
        </Button>
        <Button onClick={onSave} type="button" className="rounded-none">
          Save changes
        </Button>
      </div>
    </div>
  );
}
