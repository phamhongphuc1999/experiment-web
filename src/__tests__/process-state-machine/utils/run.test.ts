import { describe, it, vi } from 'vitest';

vi.mock('src/states/process.state', () => {
  return {
    useProcessStore: {
      getState: vi.fn(() => ({
        fn: { updateProcess: vi.fn() },
      })),
    },
  };
});

describe('/process-state-machine/utils/run.test.ts', () => {
  it('runProcessEntry', () => {});
});
