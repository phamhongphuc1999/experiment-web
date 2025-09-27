import BaseInput from 'src/components/input/BaseInput';
import { Button } from 'src/components/shadcn-ui/button';
import { useCaroConfigContext } from './caroConfig.context';
import AppTooltip from 'src/components/AppTooltip';
import { InfoCircle } from 'iconsax-reactjs';

export default function GameTypeConfig() {
  const {
    gameType,
    isOverride,
    maxError,
    events: { setGameType, setIsOverride, setMaxError },
  } = useCaroConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Game type</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button
          variant={gameType == 'normal' ? 'default' : 'outline'}
          onClick={() => setGameType('normal')}
        >
          Normal
        </Button>
        <Button
          variant={isOverride ? 'default' : 'outline'}
          onClick={() => setIsOverride((preValue) => !preValue)}
        >
          Override
        </Button>
        <Button
          variant={gameType == 'blind' ? 'default' : 'outline'}
          onClick={() => setGameType('blind')}
        >
          Blind
        </Button>
      </div>
      {gameType == 'blind' && (
        <div className="mt-2">
          <BaseInput
            name="maximum-errors"
            placeholder="Maximum number of errors"
            type="number"
            value={maxError}
            onChange={(event) => setMaxError(parseInt(event.target.value))}
            icon={{
              end: (
                <AppTooltip tooltipContent="The maximum move that player can make in blind mode">
                  <InfoCircle size={14} />
                </AppTooltip>
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}
