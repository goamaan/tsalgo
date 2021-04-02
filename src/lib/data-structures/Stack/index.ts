import { DoublyNode } from '../Node';

export interface IStack<T> {
	push(element: T): number;
	pop(): T | undefined;
	isEmpty(): boolean;
	peek(): T | undefined;
	toArray(): T[];
}

export default class Stack<T> implements IStack<T> {
	private head: DoublyNode<T> | null;
	private _size: number;

	/**
	 * Stack implementation using single head pointer
	 */
	constructor() {
		this._size = 0;
		this.head = null;
	}

	/**
	 * @return {number} The size of the Stack
	 */
	get size(): number {
		return this._size;
	}

	/**
	 * Adds an element to the top of the Stack
	 * @param {*} element
	 * @return {number} The new size of the Stack
	 */
	push(element: T): number {
		const node = new DoublyNode(element);
		node.next = this.head;
		this.head = node;
		this._size++;
		return this._size;
	}

	/**
	 * Removes the element at the top of the Stack
	 * @return {*} The removed element
	 */
	pop(): T | undefined {
		if (this.isEmpty() || !this.head) {
			return undefined;
		}
		const currHead = this.head;
		this.head = currHead.next as DoublyNode<T>;
		currHead.next = null;
		this._size--;
		return currHead.value;
	}

	/**
	 * Returns true if the Stack is empty
	 * @return {boolean}
	 */
	isEmpty(): boolean {
		return this._size === 0;
	}

	/**
	 * Returns the element at the top of the Stack without removing it
	 * @return {*} The element at the top of the Stack
	 */
	peek(): T | undefined {
		return this.isEmpty() || !this.head
			? undefined
			: (this.head as DoublyNode<T>).value;
	}

	/**
	 * Transforms the Stack to an Array traversing from top to bottom
	 * @return {Array<T>} An array of elements
	 */
	toArray(): T[] {
		let curr = this.head as DoublyNode<T>;
		const ret = [];
		for (let i = 0; i < this._size; i++) {
			ret.push(curr.value);
			curr = curr.next as DoublyNode<T>;
		}
		return ret;
	}

	/**
	 * Creates a Stack from an Array of elements
	 * @param {Array<T>} arr
	 * @return {Stack} A new Stack
	 */
	static from<T>(arr: Array<T>): Stack<T> {
		const ret = new Stack<T>();
		arr.forEach((e) => ret.push(e));
		return ret;
	}
}
