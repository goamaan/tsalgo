import anyTest, { TestInterface } from 'ava';

import PriorityQueue from './index';

const test = anyTest as TestInterface<PriorityQueue<number>>;

test.beforeEach((t) => {
	t.context = new PriorityQueue<number>();
});

test('numHeap constructor', (t) => {
	const pQueue = t.context;
	t.truthy(pQueue);
	t.is(pQueue.size, 0);
});

test('push', (t) => {
	const pQueue = t.context;
	pQueue.enqueue(1);
	t.is(pQueue.size, 1);
	pQueue.enqueue(2);
	t.is(pQueue.size, 2);
});

test('pop', (t) => {
	const pQueue = t.context;
	pQueue.enqueue(1);
	t.is(pQueue.size, 1);
	pQueue.enqueue(2);
	t.is(pQueue.size, 2);
	t.is(pQueue.dequeue(), 2);
	t.is(pQueue.size, 1);
	pQueue.enqueue(10);
	pQueue.enqueue(4);
	t.is(pQueue.size, 3);
	t.is(pQueue.dequeue(), 10);
	t.is(pQueue.dequeue(), 4);
	t.is(pQueue.size, 1);
	t.is(pQueue.dequeue(), 1);
	t.is(pQueue.size, 0);
	t.is(pQueue.dequeue(), undefined);
});

test('peek', (t) => {
	const pQueue = t.context;
	pQueue.enqueue(2);
	t.is(pQueue.size, 1);
	t.is(pQueue.peek(), 2);
	t.is(pQueue.size, 1);
	pQueue.enqueue(3);
	t.is(pQueue.peek(), 3);
	pQueue.enqueue(4);
	t.is(pQueue.peek(), 4);
	pQueue.enqueue(0);
	pQueue.enqueue(-1);
	t.is(pQueue.peek(), 4);
	pQueue.dequeue();
	t.is(pQueue.peek(), 3);
	pQueue.dequeue();
	t.is(pQueue.peek(), 2);
	pQueue.dequeue();
	t.is(pQueue.peek(), 0);
	pQueue.dequeue();
	t.is(pQueue.peek(), -1);
	pQueue.dequeue();
	t.is(pQueue.peek(), undefined);
});

test('isEmpty', (t) => {
	const pQueue = t.context;
	t.true(pQueue.isEmpty());
	pQueue.enqueue(2);
	t.false(pQueue.isEmpty());
});

test('toArray', (t) => {
	const pQueue = t.context;
	pQueue.enqueue(6);
	pQueue.enqueue(2);
	pQueue.enqueue(5);
	pQueue.enqueue(4);
	pQueue.enqueue(3);
	t.deepEqual(pQueue.asArray(), [6, 4, 5, 2, 3]);
});

test('from', (t) => {
	const arr = [4, 3, 2, 1, 0];
	const pQueue = PriorityQueue.from(arr);
	t.is(pQueue.size, 5);
	t.is(pQueue.peek(), 4);
	pQueue.dequeue();
	t.is(pQueue.peek(), 3);
	pQueue.dequeue();
	t.is(pQueue.peek(), 2);
	pQueue.dequeue();
	t.is(pQueue.peek(), 1);
	pQueue.dequeue();
	t.is(pQueue.peek(), 0);
	pQueue.dequeue();
	t.is(pQueue.peek(), undefined);
});

test('clear', (t) => {
	const arr = [4, 3, 2, 1, 0];
	const pQueue = PriorityQueue.from(arr);
	pQueue.clear();
	t.is(pQueue.size, 0);
});
