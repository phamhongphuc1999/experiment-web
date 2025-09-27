import { InfoCircle } from 'iconsax-reactjs';
import AppTooltip from 'src/components/AppTooltip';
import BaseInput from 'src/components/input/BaseInput';
import { useCaroConfigContext } from './caroConfig.context';

export default function BoardSizeConfig() {
  const {
    rows,
    columns,
    events: { setRows, setColumns },
  } = useCaroConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Caro board</p>
      <div className="flex items-center gap-2">
        <BaseInput
          type="number"
          placeholder="Number of rows"
          name="rows"
          value={rows}
          onChange={(event) => setRows(parseInt(event.target.value))}
          icon={{
            end: (
              <AppTooltip tooltipContent="30 >= number of rows >= 5">
                <InfoCircle size={14} />
              </AppTooltip>
            ),
          }}
        />
        <BaseInput
          type="number"
          placeholder="Number of columns"
          name="columns"
          value={columns}
          onChange={(event) => setColumns(parseInt(event.target.value))}
          icon={{
            end: (
              <AppTooltip tooltipContent="30 >= number of columns >= 5">
                <InfoCircle size={14} />
              </AppTooltip>
            ),
          }}
        />
      </div>
    </div>
  );
}
