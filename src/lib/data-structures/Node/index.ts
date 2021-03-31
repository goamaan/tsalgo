export interface ISingleNode {
	next?: ISingleNode | null;
}
export interface IDoubleNode {
	next?: IDoubleNode | null;
	prev?: IDoubleNode | null;
}

export class Node<T> implements ISingleNode {
	public value: T;

	public next: Node<T> | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
	}
}
export class DoublyNode<T> implements IDoubleNode {
	public value: T;

	public next: IDoubleNode | null;

	public prev: IDoubleNode | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}
export class DummyNode implements IDoubleNode {
	public next: IDoubleNode | null;
	public prev: IDoubleNode | null;

	constructor() {
		this.next = null;
		this.prev = null;
	}
}
