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

	constructor(compareFn: ICompareFn<T> = defaultCompareFn) {
		this.heap = new MaxHeap<T>(compareFn);
	}

	enqueue(...elements: Array<T>) {
		return this.heap.push(...elements);
	}

	dequeue(): T | undefined {
		return this.heap.pop();
	}

	peek(): T | undefined {
		return this.heap.peek();
	}

	isEmpty(): boolean {
		return this.heap.isEmpty();
	}

	asArray(): Array<T> {
		return this.heap.asArray();
	}

	get size(): number {
		return this.heap.size;
	}

	clear(): void {
		return this.heap.clear();
	}

	static from<T>(
		arr: Array<T>,
		compareFn: ICompareFn<T> = defaultCompareFn
	): PriorityQueue<T> {
		const ret = new PriorityQueue<T>(compareFn);
		arr.forEach((element) => ret.enqueue(element));
		return ret;
	}
}
