import {
	defaultCompareFn,
	ICompareFn,
	reverseCompareFn,
	swapElements,
} from '../../utils';

export interface IHeap<T> {
	push(...element: Array<T>): number;
	pop(): T | undefined;
	isEmpty(): boolean;
	peek(): T | undefined;
	asArray(): T[];
}

const rootIndex = 0;
const parentIndex = (i: number) => ((i + 1) >>> 1) - 1;
const leftIndex = (i: number) => (i << 1) + 1;
const rightIndex = (i: number) => (i + 1) << 1;

export default class Heap<T> implements IHeap<T> {
	protected compareFn: ICompareFn<T>;
	private heap: Array<T> = [];

	/**
	 * Creates a Heap (MinHeap by default)
	 * Takes an optional comparison function to assign priorities to the elements
	 * Uses default comparison with equality operators otherwise
	 * @param {ICompareFn<T>} compareFn
	 */
	constructor(compareFn: ICompareFn<T> = defaultCompareFn) {
		this.compareFn = compareFn;
	}

	/**
	 * @return {number} The size of the Heap
	 */
	get size(): number {
		return this.heap.length;
	}

	/**
	 * Adds an arbitraty number of elements to the the Heap
	 * @param {*} element
	 * @return {number} The new size of the Heap
	 */
	push(...elements: Array<T>): number {
		elements.forEach((element) => {
			if (!(typeof element === 'undefined' || element === null)) {
				this.heap.push(element);
				this.bubbleUp();
			}
		});
		return this.size;
	}

	/**
	 * Removes the element at the end of the Heap
	 * @return {*} The removed element
	 */
	pop(): T | undefined {
		if (this.isEmpty()) {
			return undefined;
		}
		const popped = this.heap[0];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap.pop();
		if (this.heap.length > 0) {
			this.sinkDown();
		}
		return popped;
	}

	/**
	 * Returns true if the Heap is empty
	 * @return {boolean}
	 */
	isEmpty(): boolean {
		return this.size === 0;
	}

	/**
	 * Returns the element at the front of the Heap without removing it
	 * @return {*} The element at the front of the Heap
	 */
	peek(): T | undefined {
		return this.isEmpty() ? undefined : this.heap[0];
	}

	/**
	 * Returns the heap as an array
	 * @return {Array<T>} An array of elements
	 */
	asArray(): T[] {
		return this.heap;
	}

	/**
	 * Creates a Heap from an Array of elements
	 * @param {Array<T>} arr
	 * @return {Heap} A new Heap
	 */
	static from<T>(arr: Array<T>): Heap<T> {
		const ret = new Heap<T>();
		arr.forEach((e) => ret.push(e));
		return ret;
	}

	private bubbleUp(index: number = this.size - 1): void {
		let parent = parentIndex(index);
		while (
			index > 0 &&
			this.compareFn(this.heap[parent], this.heap[index]) > 0
		) {
			swapElements(this.heap, index, parent);
			index = parent;
			parent = parentIndex(index);
		}
	}

	private sinkDown(index: number = rootIndex): void {
		const rightChild = rightIndex(index);
		const leftChild = leftIndex(index);
		let indexToBubble = this.findIndexToBubble(leftChild, rightChild);

		while (
			indexToBubble >= 0 &&
			this.compareFn(this.heap[index], this.heap[indexToBubble]) > 0
		) {
			swapElements(this.heap, index, indexToBubble);
			index = indexToBubble;
			indexToBubble = this.findIndexToBubble(
				leftIndex(index),
				rightIndex(index)
			);
		}
	}

	private findIndexToBubble(leftChild: number, rightChild: number): number {
		if (rightChild >= this.heap.length && leftChild >= this.heap.length) {
			return -1;
		} else if (rightChild >= this.heap.length) {
			return leftChild;
		} else if (leftChild >= this.heap.length) {
			return rightChild;
		} else {
			if (
				this.compareFn(this.heap[leftChild], this.heap[rightChild]) <= 0
			) {
				return leftChild;
			} else {
				return rightChild;
			}
		}
	}
}

export class MaxHeap<T> extends Heap<T> implements IHeap<T> {
	constructor(compareFn: ICompareFn<T> = defaultCompareFn) {
		super(compareFn);
		this.compareFn = reverseCompareFn(compareFn);
	}
}
