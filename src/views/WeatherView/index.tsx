import CommonContainer from 'src/components/box/CommonContainer';
import BaseInput from 'src/components/input/BaseInput';
import SearchLocationDialog from './SearchLocaltionDialog';

export default function WeatherView() {
  return (
    <CommonContainer>
      <form>
        <div className="flex items-center justify-between gap-2">
          <div className="flex w-full items-center gap-2">
            <BaseInput
              placeholder="Latitude"
              type="number"
              rootProps={{ className: 'md:w-1/4 w-1/3' }}
            />
            <BaseInput
              placeholder="Longitude"
              type="number"
              rootProps={{ className: 'md:w-1/4 w-1/3' }}
            />
          </div>
          <SearchLocationDialog />
        </div>
      </form>
    </CommonContainer>
  );
}
