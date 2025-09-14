import { Diagram } from 'iconsax-reactjs';
import TitleBox from 'src/components/box/TitleBox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import { useWordPairsStore } from 'src/states/wordPairs.state';

export default function PairDetailResultDialog() {
  const { result, currentRound } = useWordPairsStore();

  return (
    <Dialog>
      <DialogTrigger>
        <Diagram size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail result</DialogTitle>
        </DialogHeader>
        {Array.from({ length: currentRound - 1 }, (_, i) => i + 1).map((round) => {
          const _result = result[round];
          return (
            <div key={round} className="rounded-sm border p-2">
              <TitleBox title="Round" value={round} />
              <TitleBox
                title="Number of correct"
                value={_result.numberOfOk}
                valueProps={{ className: 'text-green-400' }}
              />
              <TitleBox
                title="Number of error"
                value={_result.numberOfError}
                valueProps={{ className: 'text-destructive' }}
              />
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
