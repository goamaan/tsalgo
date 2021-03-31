import test from 'ava';

import LinkedList from './index';

test('LinkedList constructor', (t) => {
	const ll = new LinkedList<number>();
	t.truthy(ll);
	t.is(ll.size, 0);
});

test('push', (t) => {
	const ll = new LinkedList<number>();
	ll.push(1);
	t.is(ll.size, 1);
	ll.push(2);
	t.is(ll.size, 2);
});

test('unshift', (t) => {
	const ll = new LinkedList<number>();
	ll.unshift(1);
	t.is(ll.size, 1);
	ll.unshift(2);
	t.is(ll.size, 2);
});

test('pop', (t) => {
	const ll = new LinkedList<number>();
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

test('shift', (t) => {
	const ll = new LinkedList<number>();
	ll.push(-1);
	t.is(ll.size, 1);
	ll.push(-2);
	t.is(ll.size, 2);
	t.is(ll.shift(), -1);
	t.is(ll.size, 1);
	ll.unshift(-3);
	ll.unshift(-4);
	t.is(ll.size, 3);
	t.is(ll.shift(), -4);
	t.is(ll.shift(), -3);
	t.is(ll.size, 1);
	t.is(ll.shift(), -2);
	t.is(ll.size, 0);
	t.is(ll.shift(), undefined);
});

test('isEmpty', (t) => {
	const ll = new LinkedList<number>();
	t.true(ll.isEmpty());
	ll.push(1);
	t.false(ll.isEmpty());
	ll.pop();
	t.true(ll.isEmpty());
});

test('peek and peekFirst', (t) => {
	const ll = new LinkedList<number>();
	ll.push(2);
	t.is(ll.size, 1);
	t.is(ll.peek(), 2);
	t.is(ll.size, 1);
	ll.push(3);
	t.is(ll.peekFirst(), 2);
	ll.unshift(4);
	t.is(ll.peekFirst(), 4);
	ll.shift();
	ll.shift();
	ll.shift();
	t.is(ll.peek(), undefined);
	t.is(ll.peekFirst(), undefined);
});

test('peekLast', (t) => {
	const ll = new LinkedList<number>();
	ll.push(2);
	t.is(ll.size, 1);
	t.is(ll.peekLast(), 2);
	t.is(ll.size, 1);
	ll.push(3);
	t.is(ll.peekLast(), 3);
	ll.unshift(4);
	t.is(ll.peekLast(), 3);
	ll.shift();
	ll.shift();
	ll.shift();
	t.is(ll.peekLast(), undefined);
});

test('toArray', (t) => {
	const ll = new LinkedList<number>();
	ll.push(2);
	ll.push(3);
	ll.unshift(4);
	t.deepEqual(ll.toArray(), [4, 2, 3]);
});

test('from', (t) => {
	const arr = [4, 3, 2, 1];
	const ll = LinkedList.from(arr);
	t.is(ll.size, 4);
	t.is(ll.peek(), 4);
	t.is(ll.peekLast(), 1);
	ll.pop();
	ll.shift();
	t.is(ll.peek(), 3);
	t.is(ll.peekLast(), 2);
});
