import { DoublyNode, DummyNode, IDoubleNode } from '../Node';

export interface ILinkedList<T> {
	push(element: T): number;
	unshift(element: T): number;
	pop(): T | undefined;
	shift(): T | undefined;
	isEmpty(): boolean;
	peek(): T | undefined;
	peekFirst(): T | undefined;
	peekLast(): T | undefined;
	toArray(): T[];
}

export default class LinkedList<T> implements ILinkedList<T> {
	private head: DummyNode;
	private tail: DummyNode;
	private _size: number;

	constructor() {
		this._size = 0;
		this.head = new DummyNode();
		this.tail = new DummyNode();
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	get size(): number {
		return this._size;
	}

	push(element: T): number {
		const node = new DoublyNode(element);
		const currTail = this.tail.prev as IDoubleNode;
		node.next = this.tail;
		node.prev = currTail;
		currTail.next = node;
		this.tail.prev = node;
		this._size++;
		return this._size;
	}

	unshift(element: T): number {
		const node = new DoublyNode(element);
		const currHead = this.head.next as IDoubleNode;
		node.next = currHead;
		currHead.prev = node;
		this.head.next = node;
		node.prev = this.head;
		this._size++;
		return this._size;
	}

	pop(): T | undefined {
		if (this.isEmpty()) {
			return undefined;
		}
		const oldTail = this.tail.prev as DoublyNode<T>;
		const newTail = oldTail.prev as IDoubleNode;
		this.tail.prev = newTail;
		newTail.next = this.tail;
		oldTail.next = null;
		oldTail.prev = null;
		this._size--;
		return oldTail.value;
	}

	shift(): T | undefined {
		if (this.isEmpty()) {
			return undefined;
		}
		const oldHead = this.head.next as DoublyNode<T>;
		const newHead = oldHead.next as IDoubleNode;
		this.head.next = newHead;
		newHead.prev = this.head;
		oldHead.next = null;
		oldHead.prev = null;
		this._size--;
		return oldHead.value;
	}

	isEmpty(): boolean {
		return this._size === 0;
	}

	peek(): T | undefined {
		return this.isEmpty()
			? undefined
			: (this.head.next as DoublyNode<T>).value;
	}

	peekFirst(): T | undefined {
		return this.isEmpty()
			? undefined
			: (this.head.next as DoublyNode<T>).value;
	}

	peekLast(): T | undefined {
		return this.isEmpty()
			? undefined
			: (this.tail.prev as DoublyNode<T>).value;
	}

	toArray(): T[] {
		let curr = this.head.next as DoublyNode<T>;
		const ret = [];
		for (let i = 0; i < this._size; i++) {
			ret.push(curr.value);
			curr = curr.next as DoublyNode<T>;
		}
		return ret;
	}

	static from<T>(arr: T[]): LinkedList<T> {
		const ret = new LinkedList<T>();
		arr.forEach((e) => ret.push(e));
		return ret;
	}
}
