export interface INode {
	next?: INode | null;
	prev?: INode | null;
}

export class Node<T> implements INode {
	public value: T;

	public next: INode | null;

	public prev: INode | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

export class HeadNode implements INode {
	public next: INode | null;

	constructor() {
		this.next = null;
	}
}

export class TailNode implements INode {
	public readonly prev: INode | null;

	constructor() {
		this.prev = null;
	}
}

export default Node;
