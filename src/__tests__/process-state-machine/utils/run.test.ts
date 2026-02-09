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

describe('run utils test', () => {
  it('runProcessEntry', () => {});
});
