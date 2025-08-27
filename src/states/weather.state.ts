import { LocationType } from 'src/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type WeatherStateType = {
  locations: Array<LocationType>;
  enqueueLocation: (location: LocationType) => void;
};

export const useWeatherStore = create<
  WeatherStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        locations: [],
        enqueueLocation: (location) => {
          set((state) => {
            let _remove = [...state.locations];
            _remove = _remove.filter((item) => item.id != location.id);
            const updated = [location, ..._remove];
            state.locations = updated.slice(0, 5);
          });
        },
      };
    }),
    {
      name: 'experiment.weather',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) {
          return {
            ...(persistedState as WeatherStateType),
          };
        }
        return persistedState;
      },
    }
  )
);
