'use client';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts-gantt';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { ProcessMonitoringStatusType } from 'src/types/process.type';

export default function TimelineChart() {
  const { state } = useProcessStateMachine();

  const processes = state.context.monitorData;
  const categories = Array.from(
    new Set(processes.map((p) => (p.index !== undefined ? `Process ${p.index}` : p.pid)))
  );

  const options: Highcharts.Options = {
    chart: { type: 'xrange' },
    title: { text: 'Realtime Process Scheduling' },
    xAxis: { title: { text: 'Time' } },
    yAxis: {
      categories,
      reversed: true,
    },
    series: [
      {
        type: 'xrange',
        data: processes.map((p) => {
          const key = p.index !== undefined ? `Process ${p.index}` : p.pid;
          return {
            x: p.start,
            x2: p.end,
            y: categories.indexOf(key),
            color: p.state === ProcessMonitoringStatusType.RUNNING ? '#2ecc71' : '#e74c3c',
          };
        }),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
