import { defaultCompareFn, ICompareFn } from '../../utils';
import { MaxHeap } from '../Heap';

export interface IPriorityQueue<T> {
	enqueue(...elements: Array<T>): number;
	dequeue(): T | undefined;
	isEmpty(): boolean;
	peek(): T | undefined;
	asArray(): T[];
	clear(): void;
}

export default class PriorityQueue<T> implements IPriorityQueue<T> {
	private heap: MaxHeap<T>;

	/**
	 * Creates an empty PriorityQueue
	 * Takes an optional comparison function to assign priorities to the elements
	 * Uses default comparison with equality operators otherwise
	 * @param {ICompareFn<T>} compareFn Must return a positive integer, negative integer,
	 * or 0 after comparing 2 elements based on their priorities.
	 */
	constructor(compareFn: ICompareFn<T> = defaultCompareFn) {
		this.heap = new MaxHeap<T>(compareFn);
	}

	/**
	 * Adds any number of elements to the the PriorityQueue
	 * @param {*} element
	 * @return {number} The new size of the PriorityQueue
	 */
	enqueue(...elements: Array<T>) {
		return this.heap.push(...elements);
	}

	/**
	 * Removes the element with the highest priority
	 * @return {*} The removed element
	 */
	dequeue(): T | undefined {
		return this.heap.pop();
	}

	/**
	 * Returns the element with the highest priority without removing it
	 * @return {*} The element with the highest priority
	 */
	peek(): T | undefined {
		return this.heap.peek();
	}

	/**
	 * Returns true if the PriorityQueue is empty
	 * @return {boolean}
	 */
	isEmpty(): boolean {
		return this.heap.isEmpty();
	}

	/**
	 * Returns the PriorityQueue as an array
	 * @return {Array<T>} An array of elements
	 */
	asArray(): Array<T> {
		return this.heap.asArray();
	}

	/**
	 * @return {number} The size of the PriorityQueue
	 */
	get size(): number {
		return this.heap.size;
	}

	/**
	 * Clears the PriorityQueue
	 */
	clear(): void {
		return this.heap.clear();
	}

	/**
	 * Creates a PriorityQueue from an Array of elements
	 * @param {Array<T>} arr
	 * @return {Heap} A new PriorityQueue
	 */
	static from<T>(
		arr: Array<T>,
		compareFn: ICompareFn<T> = defaultCompareFn
	): PriorityQueue<T> {
		const ret = new PriorityQueue<T>(compareFn);
		arr.forEach((element) => ret.enqueue(element));
		return ret;
	}
}
