interface Props {
  counter: number;
}

export default function TimeSliceCounter({ counter }: Props) {
  return (
    <div className="bg-primary/5 border-primary/10 flex items-baseline gap-1.5 border px-2 py-0.5 shadow-xs transition-all hover:scale-105">
      <span className="font-mono text-xl font-black tracking-tighter text-blue-600 tabular-nums dark:text-blue-400">
        {counter.toString().padStart(4, '0')}
      </span>
      <span className="text-muted-foreground font-mono text-[9px] font-black tracking-widest uppercase opacity-70">
        ms
      </span>
    </div>
  );
}
