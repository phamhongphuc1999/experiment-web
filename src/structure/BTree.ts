export enum BTreeNodeType {
  INTERNAL = 0,
  LEAF = 1,
}

export abstract class BaseBTreeNode {
  public keys: number[] = [];
  public childPointers: number[] = [];

  constructor(public readonly type: BTreeNodeType) {}

  public abstract isFull(degree: number): boolean;
}

export class InternalNode extends BaseBTreeNode {
  public childrenHeap: BaseBTreeNode[] = [];
  public next: InternalNode | null = null;

  constructor() {
    super(BTreeNodeType.INTERNAL);
  }

  public isFull(degree: number): boolean {
    return this.keys.length >= degree;
  }
}

export class LeafNode<T extends { id: number }> extends BaseBTreeNode {
  public dataHeap: T[] = [];
  public next: LeafNode<T> | null = null;

  constructor() {
    super(BTreeNodeType.LEAF);
  }

  public isFull(degree: number): boolean {
    return this.keys.length >= degree;
  }
}
