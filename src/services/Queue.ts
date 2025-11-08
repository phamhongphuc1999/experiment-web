export default class Queue<T> {
  private items: T[] = [];
  private head = 0;
  private tail = 0;

  enqueue(item: T) {
    this.items[this.tail++] = item;
  }

  dequeue(): T {
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}
