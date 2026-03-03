'use client';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts-gantt';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { ProcessMonitoringStatusType } from 'src/types/process.type';

export default function TimelineChart() {
  const { state } = useProcessStateMachine();

  const processes = state.context.monitorData;
  const categories = Array.from(
    new Set(processes.map((p) => (p.index !== undefined ? `P${p.index}` : p.pid)))
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'xrange',
      backgroundColor: 'transparent',
      animation: true,
      height: '50%',
      style: {
        fontFamily: 'inherit',
      },
    },
    title: {
      text: 'Realtime Process Scheduling',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: '700',
        color: 'var(--foreground, #000)',
      },
    },
    credits: { enabled: false },
    xAxis: {
      type: 'linear',
      title: {
        text: 'Time (Units)',
        style: { color: 'var(--muted-foreground, #666)' },
      },
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)',
      labels: {
        style: { color: 'var(--muted-foreground, #666)' },
      },
    },
    yAxis: {
      title: { text: '' },
      categories,
      reversed: true,
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.05)',
      labels: {
        style: {
          color: 'var(--foreground, #000)',
          fontWeight: '600',
        },
      },
    },
    legend: { enabled: false },
    tooltip: {
      borderRadius: 8,
      borderWidth: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      shadow: true,
      shared: false,
      useHTML: true,
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.x} - {point.x2}</b><br/>Status: <b>{point.statusText}</b>',
    },
    series: [
      {
        type: 'xrange',
        name: 'Execution',
        borderColor: 'transparent',
        borderRadius: 4,
        pointWidth: 24,
        data: processes.map((p) => {
          const key = p.index !== undefined ? `P${p.index}` : p.pid;
          const isRunning = p.state === ProcessMonitoringStatusType.RUNNING;

          return {
            x: p.start,
            x2: p.end,
            y: categories.indexOf(key),
            color: isRunning ? '#2ecc71' : '#e74c3c',
            statusText: isRunning ? 'Running' : 'I/O Blocked',
          };
        }),
      },
    ],
    plotOptions: {
      xrange: {
        grouping: false,
        dataLabels: {
          enabled: false,
        },
      },
    },
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 w-full duration-500">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
