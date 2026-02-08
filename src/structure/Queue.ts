export default class Queue<T> {
  private items: T[] = [];
  private priority = 0;

  enqueue(item: T): number {
    this.items.push(item);
    return this.priority++;
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
    this.priority = 0;
  }

  clone(): Queue<T> {
    const newQueue = new Queue<T>();
    newQueue.items = [...this.items];
    return newQueue;
  }
}
