'use client';

import { ChangeEvent, useState } from 'react';
import { TitleBaseInput } from 'src/components/input/BaseInput';
import { ProcessType } from 'src/types/process-demo.type';
import z from 'zod';

const schema = z.number().min(1, 'Must be at least 1').max(60, 'Must be at most 60');

interface Props {
  data: ProcessType;
  type?: 'read' | 'write';
  events?: {
    onDataChange: (executionTime: number) => void;
  };
}

export default function ProcessItem({ data, type = 'write', events }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | undefined>(undefined);

  function _onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const result = schema.safeParse(value);
    if (!result.success) {
      //
    }
    if (events?.onDataChange) events.onDataChange(parseInt(value));
  }

  return (
    <div>
      <TitleBaseInput
        readOnly={type == 'read' ? true : false}
        name="execution-time"
        titleInput="Execution time"
        type="number"
        value={data.executionTime}
        onChange={_onChange}
        error={error}
      />
    </div>
  );
}
