import { PriorityQueue } from 'src/structure/PriorityQueue';
import Queue from 'src/structure/Queue';
import { assert, describe, it } from 'vitest';

describe('/structure/queue.test.ts', () => {
  it('queue', () => {
    const q = new Queue<number>();
    q.enqueue(1);
    q.enqueue(2);

    assert.equal(q.size(), 2);
    assert.isFalse(q.isEmpty());
    assert.equal(q.dequeue(), 1);
    assert.equal(q.dequeue(), 2);
    assert.isTrue(q.isEmpty());
  });

  it('priority queue', () => {
    const q = new PriorityQueue<number>((item1, item2) => (item1 < item2 ? 1 : -1));
    q.push(1);
    q.push(3);
    q.push(2);

    assert.equal(q.size(), 3);
    assert.isFalse(q.isEmpty());
    assert.equal(q.peek(), 3);
    q.pop();
    assert.equal(q.peek(), 2);
    q.pop();
    assert.equal(q.size(), 1);
    assert.isFalse(q.isEmpty());
  });
});
