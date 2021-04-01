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
	 * Adds an element to the front (head) of the LinkedList
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

	/**
	 * Adds an element to the front (head) of the LinkedList
	 * @param {*} element
	 * @return {number} The new size of the LinkedList
	 */
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

	/**
	 * Removes the element at the end of the LinkedList
	 * @return {*} The removed element
	 */
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

	/**
	 * Removes the element at the front of the LinkedList
	 * @return {*} The removed element
	 */
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
	peek(): T | undefined {
		return this.isEmpty()
			? undefined
			: (this.head.next as DoublyNode<T>).value;
	}

	/**
	 * Returns the element at the front of the LinkedList without removing it
	 * @return {*} The element at the front of the LinkedList
	 */
	peekFirst(): T | undefined {
		return this.isEmpty()
			? undefined
			: (this.head.next as DoublyNode<T>).value;
	}

	/**
	 * Returns the element at the end of the LinkedList without removing it
	 * @return {*} The element at the end of the LinkedList
	 */
	peekLast(): T | undefined {
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
	static from<T>(arr: Array<T>): LinkedList<T> {
		const ret = new LinkedList<T>();
		arr.forEach((e) => ret.push(e));
		return ret;
	}
}
