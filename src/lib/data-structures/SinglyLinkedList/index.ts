import { Node } from '../Node';

export interface ISinglyLinkedList<T> {
	push(element: T): number;
	unshift(element: T): number;
	pop(): T | undefined;
	shift(): T | undefined;
	isEmpty(): boolean;
	peek(): T | undefined;
}

export default class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
	private head: Node<T> | null;
	private _size: number;

	/**
	 * Creates a SinglyLinkedList (implementation using a single (head) pointer).
	 * Only has basic functionality -> Use LinkedList over this unless memory is limited.
	 */
	constructor() {
		this._size = 0;
		this.head = null;
	}

	/**
	 * @return {number} The size of the LinkedList
	 */
	get size(): number {
		return this._size;
	}

	/**
	 * Adds an element to the end of the LinkedList
	 * @param {*} element
	 * @return {number} The new size of the LinkedList
	 */
	push(element: T): number {
		const node = new Node(element);
		if (this.head == null) {
			this.head = node;
		} else if (this.head.next == null) {
			this.head.next = node;
		} else {
			let a: Node<T> | null = this.head.next;
			while (a.next) {
				a = a.next;
			}
			a.next = node;
		}
		this._size++;
		return this._size;
	}

	/**
	 * Adds an element to the front (head) of the LinkedList
	 * @param {*} element
	 * @return {number} The new size of the LinkedList
	 */
	unshift(element: T): number {
		const node = new Node(element);
		if (!this.head) {
			this.head = node;
		}
		const prevHead = this.head;
		node.next = prevHead;
		this.head = node;
		this._size++;
		return this._size;
	}

	/**
	 * Removes the element at the end of the LinkedList
	 * @return {*} The removed element
	 */
	pop(): T | undefined {
		if (!this.head) {
			return undefined;
		}

		if (this._size === 1) {
			const node = this.head;
			this.head = null;
			this._size--;
			return node.value;
		}
		let current = this.head;
		let prevNode = null;

		while (current.next) {
			prevNode = current;
			current = current.next;
		}
		const removed = prevNode?.next;
		if (prevNode) prevNode.next = null;

		this._size--;
		return removed?.value;
	}

	/**
	 * Removes the element at the front of the LinkedList
	 * @return {*} The removed element
	 */
	shift(): T | undefined {
		if (!this.head) {
			return undefined;
		}

		const prevHead = this.head;
		this.head = prevHead.next;

		prevHead.next = null;
		this._size--;
		return prevHead.value;
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
		return this.isEmpty() || !this.head ? undefined : this.head.value;
	}
}
