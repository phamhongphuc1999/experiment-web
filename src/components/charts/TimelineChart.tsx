'use client';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts-gantt';
import { useEffect, useState } from 'react';

export default function RealtimeChart() {
  const [processes, setProcesses] = useState([
    { pid: 'P1', start: 0, end: 5, state: 'RUNNING' },
    { pid: 'P2', start: 3, end: 10, state: 'BLOCKED' },
    { pid: 'P1', start: 9, end: 15, state: 'BLOCKED' },
  ]);

  const pids = Array.from(new Set(processes.map((p) => p.pid)));

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProcesses((prev) => [
  //       ...prev,
  //       {
  //         pid: 'P' + (prev.length + 1),
  //         start: prev.at(-1)?.end ?? 0,
  //         end: (prev.at(-1)?.end ?? 0) + 2,
  //         state: Math.random() > 0.5 ? 'RUNNING' : 'BLOCKED',
  //       },
  //     ]);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  const options: Highcharts.Options = {
    chart: { type: 'xrange' },
    title: { text: 'Realtime Process Scheduling' },

    xAxis: { title: { text: 'Time' } },
    yAxis: {
      categories: processes.map((p) => p.pid),
      reversed: true,
    },

    series: [
      {
        type: 'xrange',
        data: processes.map((p, i) => ({
          x: p.start,
          x2: p.end,
          y: pids.indexOf(p.pid),
          color: p.state === 'RUNNING' ? '#2ecc71' : '#e74c3c',
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
