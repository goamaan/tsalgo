import { DoublyNode, DummyNode, IDoubleNode } from '../Node';
export interface IQueue<T> {
	enqueue(element: T): number;
	dequeue(): T | undefined;
	isEmpty(): boolean;
	front(): T | undefined;
	front(): T | undefined;
	back(): T | undefined;
	toArray(): T[];
}

export default class Queue<T> implements IQueue<T> {
	private head: DummyNode;
	private tail: DummyNode;
	private _size: number;

	/**
	 * Default LinkedList implementation using double pointers.
	 * Use this over SinglyLinkedList unless memory is very limited.
	 */
	constructor() {
		this._size = 0;
		this.head = new DummyNode();
		this.tail = new DummyNode();
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	/**
	 * @return {number} The size of the LinkedList
	 */
	get size(): number {
		return this._size;
	}

	/**
	 * Adds an element to the end (tail) of the LinkedList
	 * @param {*} element
	 * @return {number} The new size of the LinkedList
	 */
	enqueue(element: T): number {
		const node = new DoublyNode(element);
		const currTail = this.tail.prev as IDoubleNode;
		node.next = this.tail;
		node.prev = currTail;
		currTail.next = node;
		this.tail.prev = node;
		this._size++;
		return this._size;
	}

	/**
	 * Removes the element at the front of the LinkedList
	 * @return {*} The removed element
	 */
	dequeue(): T | undefined {
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

	/**
	 * Returns true if the LinkedList is empty
	 * @return {boolean}
	 */
	isEmpty(): boolean {
		return this._size === 0;
	}

	/**
	 * Returns the element at the front of the LinkedList without removing it
	 * @return {*} The element at the front of the LinkedList
	 */
	front(): T | undefined {
		return this.isEmpty()
			? undefined
			: (this.head.next as DoublyNode<T>).value;
	}

	/**
	 * Returns the element at the end of the LinkedList without removing it
	 * @return {*} The element at the end of the LinkedList
	 */
	back(): T | undefined {
		return this.isEmpty()
			? undefined
			: (this.tail.prev as DoublyNode<T>).value;
	}

	/**
	 * Transforms the LinkedList to an Array
	 * @return {Array<T>} An array of elements
	 */
	toArray(): T[] {
		let curr = this.head.next as DoublyNode<T>;
		const ret = [];
		for (let i = 0; i < this._size; i++) {
			ret.push(curr.value);
			curr = curr.next as DoublyNode<T>;
		}
		return ret;
	}

	/**
	 * Creates a LinkedList from an Array of elements
	 * @param {Array<T>} arr
	 * @return {LinkedList} A new LinkedList
	 */
	static from<T>(arr: Array<T>): Queue<T> {
		const ret = new Queue<T>();
		arr.forEach((e) => ret.enqueue(e));
		return ret;
	}
}
