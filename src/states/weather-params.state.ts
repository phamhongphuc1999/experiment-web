import { WeatherParamsType } from 'src/global';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type WeatherParamsStateType = {
  state: Partial<WeatherParamsType>;
  setState: (state: Partial<WeatherParamsType>) => void;
};

export const useWeatherParamsStore = create<WeatherParamsStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      state: {},
      setState: (partialState) => {
        set((state) => {
          state.state = { ...state.state, ...partialState };
        });
      },
    };
  })
);
