import test from 'ava';

import Stack from './index';

test('Stack constructor', (t) => {
	const ll = new Stack<number>();
	t.truthy(ll);
	t.is(ll.size, 0);
});

test('push', (t) => {
	const ll = new Stack<number>();
	ll.push(1);
	t.is(ll.size, 1);
	ll.push(2);
	t.is(ll.size, 2);
});

test('pop', (t) => {
	const ll = new Stack<number>();
	ll.push(-1);
	t.is(ll.size, 1);
	ll.push(-2);
	t.is(ll.size, 2);
	t.is(ll.pop(), -2);
	t.is(ll.size, 1);
	ll.push(-3);
	ll.push(-4);
	t.is(ll.size, 3);
	t.is(ll.pop(), -4);
	t.is(ll.pop(), -3);
	t.is(ll.size, 1);
	t.is(ll.pop(), -1);
	t.is(ll.size, 0);
	t.is(ll.pop(), undefined);
});

test('isEmpty', (t) => {
	const ll = new Stack<number>();
	t.true(ll.isEmpty());
	ll.push(1);
	t.false(ll.isEmpty());
	ll.pop();
	t.true(ll.isEmpty());
});

test('peek', (t) => {
	const ll = new Stack<number>();
	ll.push(2);
	t.is(ll.size, 1);
	t.is(ll.peek(), 2);
	t.is(ll.size, 1);
	ll.push(3);
	t.is(ll.peek(), 3);
	ll.push(4);
	t.is(ll.peek(), 4);
	ll.pop();
	ll.pop();
	ll.pop();
	t.is(ll.peek(), undefined);
	t.is(ll.peek(), undefined);
});

test('toArray', (t) => {
	const ll = new Stack<number>();
	ll.push(2);
	ll.push(3);
	ll.push(4);
	t.deepEqual(ll.toArray(), [4, 3, 2]);
});

test('from', (t) => {
	const arr = [4, 3, 2, 1];
	const ll = Stack.from(arr);
	t.is(ll.size, 4);
	t.is(ll.peek(), 1);
	ll.pop();
	t.is(ll.peek(), 2);
	ll.pop();
	t.is(ll.peek(), 3);
	ll.pop();
	t.is(ll.peek(), 4);
});
