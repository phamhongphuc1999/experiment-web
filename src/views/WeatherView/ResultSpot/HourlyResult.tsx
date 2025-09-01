/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import { ReactECharts } from 'src/components/DynamicEChart';
import { WeatherHourlyConfig } from 'src/configs/constance';
import { WeatherDailyVariableType, WeatherHourlyVariableType } from 'src/global';

interface Props {
  hourlyUnits: { time: string } & { [id in WeatherHourlyVariableType]: string };
  hourly: { time: Array<string> } & { [id in WeatherDailyVariableType]: Array<number> };
}

export default function HourlyResult({ hourlyUnits, hourly }: Props) {
  const series = useMemo(() => {
    return Object.entries(hourly)
      .filter(([key, _]) => key != 'time')
      .map(([key, value]) => {
        const _key = key as WeatherHourlyVariableType;
        const metadata = WeatherHourlyConfig[_key];

        return {
          id: _key,
          name: metadata.title,
          type: 'line',
          smooth: true,
          data: value,
          symbol: 'circle',
          symbolSize: 4,
        };
      });
  }, [hourly]);

  const option = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: hourly.time.map((item) => new Date(item).toISOString()),
        axisLabel: {
          interval: Math.floor(hourly.time.length / 5),
          rotate: 0,
          hideOverlap: true,
          fontSize: 14,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#a1a1aa',
            opacity: 0.1,
          },
        },
      },
      yAxis: {
        show: false,
        type: 'value',
        splitLine: {
          show: false,
        },
      },
      series,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#DD73CC',
            width: 0.5,
            type: 'dashed',
          },
        },
        className: 'bg-transparent border-none shadow-none p-0',
        extraCssText: 'background-color: transparent; border: none; box-shadow: none; padding: 0;',
        formatter: function (params: Array<any>) {
          const date = new Date(params[0].axisValue).toLocaleString();

          const _mainSpot = params.map((item) => {
            const name = item.seriesName;
            const value = item.value;
            const id = item.seriesId as WeatherHourlyVariableType;
            const unit = hourlyUnits[id];

            return `<div class="flex items-center gap-2">
                <p class="dark:text-content-2 text-gray-600">${name}</p>
                <p class="dark:text-content-1">${value} (${unit})</p>
              </div>`;
          });

          return `
            <div class="dark:bg-popup bg-gray-100 border dark:border-stroke-default border-gray-200 shadow-[inset_0px_-4px_4px_0px_#0000000a,_0px_14px_11px_-4px_#0000001f] p-2 rounded-lg">
              <span class="dark:text-content-1 text-gray-950">${date}</span>
              <div>${_mainSpot}</div>
            </div>
          `;
        },
      },
    };
  }, [hourly.time, hourlyUnits, series]);

  return (
    <div className="mt-4 h-[calc(100vh-200px)] w-full">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
