import anyTest, { TestInterface } from 'ava';

import { ICompareFn } from '../../utils';

import PriorityQueue from './index';

const customCompareFn: ICompareFn<customShape> = (
	a: customShape,
	b: customShape
) => {
	return a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
};

type customShape = {
	id: number;
	priority: number;
};

const customTest = anyTest as TestInterface<PriorityQueue<customShape>>;

customTest.beforeEach((t) => {
	t.context = new PriorityQueue<customShape>(customCompareFn);
});

customTest('custom constructor', (t) => {
	const pQueue = t.context;
	t.truthy(pQueue);
	t.is(pQueue.size, 0);
});

customTest('custom push', (t) => {
	const pQueue = t.context;
	pQueue.enqueue({ id: 1, priority: 1 });
	t.is(pQueue.size, 1);
	pQueue.enqueue({ id: 2, priority: 3 });
	t.is(pQueue.size, 2);
});

customTest('custom pop', (t) => {
	const pQueue = t.context;
	pQueue.enqueue({ id: 1, priority: 1 });
	t.is(pQueue.size, 1);
	pQueue.enqueue({ id: 1, priority: 2 });
	t.is(pQueue.size, 2);
	t.deepEqual(pQueue.dequeue(), { id: 1, priority: 2 });
	t.is(pQueue.size, 1);
	pQueue.enqueue({ id: 1, priority: 100 });
	pQueue.enqueue({ id: 1, priority: 5 });
	t.is(pQueue.size, 3);
	t.deepEqual(pQueue.dequeue(), { id: 1, priority: 100 });
	t.deepEqual(pQueue.dequeue(), { id: 1, priority: 5 });
	t.is(pQueue.size, 1);
	t.deepEqual(pQueue.dequeue(), { id: 1, priority: 1 });
	t.is(pQueue.size, 0);
	t.deepEqual(pQueue.dequeue(), undefined);
});

customTest('custom peek', (t) => {
	const pQueue = t.context;
	pQueue.enqueue({ id: 1, priority: 1 });
	t.is(pQueue.size, 1);
	t.deepEqual(pQueue.peek(), { id: 1, priority: 1 });
	t.is(pQueue.size, 1);
	pQueue.enqueue({ id: 1, priority: 1 });
	t.deepEqual(pQueue.peek(), { id: 1, priority: 1 });
	pQueue.enqueue({ id: 1, priority: 2 });
	t.deepEqual(pQueue.peek(), { id: 1, priority: 2 });
	pQueue.enqueue({ id: 1, priority: 3 });
	pQueue.enqueue({ id: 1, priority: 1 });
	t.deepEqual(pQueue.peek(), { id: 1, priority: 3 });
	pQueue.dequeue();
	t.deepEqual(pQueue.peek(), { id: 1, priority: 2 });
	pQueue.dequeue();
	t.deepEqual(pQueue.peek(), { id: 1, priority: 1 });
	pQueue.dequeue();
	t.deepEqual(pQueue.peek(), { id: 1, priority: 1 });
	pQueue.dequeue();
	t.deepEqual(pQueue.peek(), { id: 1, priority: 1 });
	pQueue.dequeue();
	t.deepEqual(pQueue.peek(), undefined);
});

customTest('custom toArray', (t) => {
	const pQueue = t.context;
	pQueue.enqueue({ id: 1, priority: 4 });
	pQueue.enqueue({ id: 1, priority: 5 });
	pQueue.enqueue({ id: 1, priority: 1 });
	pQueue.enqueue({ id: 1, priority: 3 });
	pQueue.enqueue({ id: 1, priority: 2 });
	t.deepEqual(pQueue.asArray(), [
		{ id: 1, priority: 5 },
		{ id: 1, priority: 4 },
		{ id: 1, priority: 1 },
		{ id: 1, priority: 3 },
		{ id: 1, priority: 2 },
	]);
});
