import anyTest, { TestInterface } from 'ava';

import Queue from './index';

const test = anyTest as TestInterface<Queue<number>>;

test.beforeEach((t) => {
	t.context = new Queue<number>();
});

test('Queue constructor', (t) => {
	const queue = t.context;
	t.truthy(queue);
	t.is(queue.size, 0);
});

test('enqueue', (t) => {
	const queue = t.context;
	queue.enqueue(1);
	t.is(queue.size, 1);
	queue.enqueue(2);
	t.is(queue.size, 2);
});

test('dequeue', (t) => {
	const queue = t.context;
	queue.enqueue(-1);
	t.is(queue.size, 1);
	queue.enqueue(-2);
	t.is(queue.size, 2);
	t.is(queue.dequeue(), -1);
	t.is(queue.size, 1);
	queue.enqueue(-3);
	queue.enqueue(-4);
	t.is(queue.size, 3);
	t.is(queue.dequeue(), -2);
	t.is(queue.dequeue(), -3);
	t.is(queue.size, 1);
	t.is(queue.dequeue(), -4);
	t.is(queue.size, 0);
	t.is(queue.dequeue(), undefined);
});

test('isEmpty', (t) => {
	const queue = t.context;
	t.true(queue.isEmpty());
	queue.enqueue(1);
	t.false(queue.isEmpty());
	queue.dequeue();
	t.true(queue.isEmpty());
});

test('front', (t) => {
	const queue = t.context;
	queue.enqueue(2);
	t.is(queue.size, 1);
	t.is(queue.front(), 2);
	t.is(queue.size, 1);
	queue.enqueue(3);
	t.is(queue.front(), 2);
	queue.enqueue(4);
	t.is(queue.front(), 2);
	queue.dequeue();
	t.is(queue.front(), 3);
	queue.dequeue();
	t.is(queue.front(), 4);
	queue.dequeue();
	t.is(queue.front(), undefined);
});

test('back', (t) => {
	const queue = t.context;
	queue.enqueue(2);
	t.is(queue.size, 1);
	t.is(queue.back(), 2);
	t.is(queue.size, 1);
	queue.enqueue(3);
	t.is(queue.back(), 3);
	queue.enqueue(4);
	t.is(queue.back(), 4);
	queue.dequeue();
	t.is(queue.back(), 4);
	queue.dequeue();
	t.is(queue.back(), 4);
	queue.dequeue();
	t.is(queue.back(), undefined);
});

test('toArray', (t) => {
	const queue = t.context;
	queue.enqueue(2);
	queue.enqueue(3);
	queue.enqueue(4);
	t.deepEqual(queue.toArray(), [2, 3, 4]);
});

test('from', (t) => {
	const arr = [4, 3, 2, 1];
	const queue = Queue.from(arr);
	t.is(queue.size, 4);
	t.is(queue.front(), 4);
	t.is(queue.back(), 1);
	queue.dequeue();
	t.is(queue.front(), 3);
	t.is(queue.back(), 1);
	queue.dequeue();
	t.is(queue.front(), 2);
	t.is(queue.back(), 1);
});
