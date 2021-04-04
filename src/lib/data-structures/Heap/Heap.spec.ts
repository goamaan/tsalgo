import anyTest, { TestInterface } from 'ava';

import Heap from './index';

const numberTest = anyTest as TestInterface<Heap<number>>;
const stringTest = anyTest as TestInterface<Heap<string>>;

numberTest.beforeEach((t) => {
	t.context = new Heap<number>();
});

numberTest('numHeap constructor', (t) => {
	const heap = t.context;
	t.truthy(heap);
	t.is(heap.size, 0);
});

numberTest('push', (t) => {
	const heap = t.context;
	heap.push(1);
	t.is(heap.size, 1);
	heap.push(2);
	t.is(heap.size, 2);
});

numberTest('pop', (t) => {
	const heap = t.context;
	heap.push(-1);
	t.is(heap.size, 1);
	heap.push(-2);
	t.is(heap.size, 2);
	t.is(heap.pop(), -2);
	t.is(heap.size, 1);
	heap.push(-10);
	heap.push(-4);
	t.is(heap.size, 3);
	t.is(heap.pop(), -10);
	t.is(heap.pop(), -4);
	t.is(heap.size, 1);
	t.is(heap.pop(), -1);
	t.is(heap.size, 0);
	t.is(heap.pop(), undefined);
});

numberTest('peek', (t) => {
	const heap = t.context;
	heap.push(2);
	t.is(heap.size, 1);
	t.is(heap.peek(), 2);
	t.is(heap.size, 1);
	heap.push(3);
	t.is(heap.peek(), 2);
	heap.push(4);
	t.is(heap.peek(), 2);
	heap.push(0);
	heap.push(-1);
	t.is(heap.peek(), -1);
	heap.pop();
	t.is(heap.peek(), 0);
	heap.pop();
	t.is(heap.peek(), 2);
	heap.pop();
	t.is(heap.peek(), 3);
	heap.pop();
	t.is(heap.peek(), 4);
	heap.pop();
	t.is(heap.peek(), undefined);
});

numberTest('toArray', (t) => {
	const heap = t.context;
	heap.push(6);
	heap.push(2);
	heap.push(5);
	heap.push(4);
	heap.push(3);
	t.deepEqual(heap.asArray(), [2, 3, 5, 6, 4]);
});

numberTest('from', (t) => {
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

stringTest.beforeEach((t) => {
	t.context = new Heap<string>();
});

stringTest('stringHeap constructor', (t) => {
	const heap = t.context;
	t.truthy(heap);
	t.is(heap.size, 0);
});

stringTest('string push', (t) => {
	const heap = t.context;
	heap.push('a');
	t.is(heap.size, 1);
	heap.push('b');
	t.is(heap.size, 2);
});

stringTest('string pop', (t) => {
	const heap = t.context;
	heap.push('z');
	t.is(heap.size, 1);
	heap.push('x');
	t.is(heap.size, 2);
	t.is(heap.pop(), 'x');
	t.is(heap.size, 1);
	heap.push('a');
	heap.push('b');
	t.is(heap.size, 3);
	t.is(heap.pop(), 'a');
	t.is(heap.pop(), 'b');
	t.is(heap.size, 1);
	t.is(heap.pop(), 'z');
	t.is(heap.size, 0);
	t.is(heap.pop(), undefined);
});

stringTest('string peek', (t) => {
	const heap = t.context;
	heap.push('c');
	t.is(heap.size, 1);
	t.is(heap.peek(), 'c');
	t.is(heap.size, 1);
	heap.push('f');
	t.is(heap.peek(), 'c');
	heap.push('a');
	t.is(heap.peek(), 'a');
	heap.push('0');
	heap.push('g');
	t.is(heap.peek(), '0');
	heap.pop();
	t.is(heap.peek(), 'a');
	heap.pop();
	t.is(heap.peek(), 'c');
	heap.pop();
	t.is(heap.peek(), 'f');
	heap.pop();
	t.is(heap.peek(), 'g');
	heap.pop();
	t.is(heap.peek(), undefined);
});

stringTest('string toArray', (t) => {
	const heap = t.context;
	heap.push('v');
	heap.push('b');
	heap.push('ab');
	heap.push('s');
	heap.push('a');
	t.deepEqual(heap.asArray(), ['a', 'ab', 'b', 'v', 's']);
});

stringTest('string from', (t) => {
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
