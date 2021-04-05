import anyTest, { TestInterface } from 'ava';

import { ICompareFn } from '../../utils';

import Heap from './index';

const customCompareFn: ICompareFn<customShape> = (
	a: customShape,
	b: customShape
) => {
	return a.priority > b.priority ? -1 : b.priority > a.priority ? 1 : 0;
};

type customShape = {
	id: number;
	priority: number;
};

const customTest = anyTest as TestInterface<Heap<customShape>>;

customTest.beforeEach((t) => {
	t.context = new Heap<customShape>(customCompareFn);
});

customTest('custom constructor', (t) => {
	const heap = t.context;
	t.truthy(heap);
	t.is(heap.size, 0);
});

customTest('custom push', (t) => {
	const heap = t.context;
	heap.push({ id: 1, priority: 1 });
	t.is(heap.size, 1);
	heap.push({ id: 2, priority: 3 });
	t.is(heap.size, 2);
});

customTest('custom pop', (t) => {
	const heap = t.context;
	heap.push({ id: 1, priority: 1 });
	t.is(heap.size, 1);
	heap.push({ id: 1, priority: 2 });
	t.is(heap.size, 2);
	t.deepEqual(heap.pop(), { id: 1, priority: 2 });
	t.is(heap.size, 1);
	heap.push({ id: 1, priority: 100 });
	heap.push({ id: 1, priority: 5 });
	t.is(heap.size, 3);
	t.deepEqual(heap.pop(), { id: 1, priority: 100 });
	t.deepEqual(heap.pop(), { id: 1, priority: 5 });
	t.is(heap.size, 1);
	t.deepEqual(heap.pop(), { id: 1, priority: 1 });
	t.is(heap.size, 0);
	t.deepEqual(heap.pop(), undefined);
});

customTest('custom peek', (t) => {
	const heap = t.context;
	heap.push({ id: 1, priority: 1 });
	t.is(heap.size, 1);
	t.deepEqual(heap.peek(), { id: 1, priority: 1 });
	t.is(heap.size, 1);
	heap.push({ id: 1, priority: 1 });
	t.deepEqual(heap.peek(), { id: 1, priority: 1 });
	heap.push({ id: 1, priority: 2 });
	t.deepEqual(heap.peek(), { id: 1, priority: 2 });
	heap.push({ id: 1, priority: 3 });
	heap.push({ id: 1, priority: 1 });
	t.deepEqual(heap.peek(), { id: 1, priority: 3 });
	heap.pop();
	t.deepEqual(heap.peek(), { id: 1, priority: 2 });
	heap.pop();
	t.deepEqual(heap.peek(), { id: 1, priority: 1 });
	heap.pop();
	t.deepEqual(heap.peek(), { id: 1, priority: 1 });
	heap.pop();
	t.deepEqual(heap.peek(), { id: 1, priority: 1 });
	heap.pop();
	t.deepEqual(heap.peek(), undefined);
});

customTest('custom toArray', (t) => {
	const heap = t.context;
	heap.push({ id: 1, priority: 4 });
	heap.push({ id: 1, priority: 5 });
	heap.push({ id: 1, priority: 1 });
	heap.push({ id: 1, priority: 3 });
	heap.push({ id: 1, priority: 2 });
	t.deepEqual(heap.asArray(), [
		{ id: 1, priority: 5 },
		{ id: 1, priority: 4 },
		{ id: 1, priority: 1 },
		{ id: 1, priority: 3 },
		{ id: 1, priority: 2 },
	]);
});

customTest('custom from', (t) => {
	const arr = [4, 3, 2, 1, 0];
	const heap = Heap.from(arr);
	t.is(heap.size, 5);
	t.is(heap.peek(), 0);
	heap.pop();
	t.is(heap.peek(), 1);
	heap.pop();
	t.is(heap.peek(), 2);
	heap.pop();
	t.is(heap.peek(), 3);
	heap.pop();
	t.is(heap.peek(), 4);
	heap.pop();
	t.is(heap.peek(), undefined);
});
