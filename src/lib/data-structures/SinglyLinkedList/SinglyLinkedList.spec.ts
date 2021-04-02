import test from 'ava';

import SinglyLinkedList from './index';

test('SinglyLinkedList constructor', (t) => {
	const ll = new SinglyLinkedList<number>();
	t.truthy(ll);
	t.is(ll.size, 0);
});

test('push', (t) => {
	const ll = new SinglyLinkedList<number>();
	ll.push(1);
	t.is(ll.size, 1);
	ll.push(2);
	t.is(ll.size, 2);
});

test('unshift', (t) => {
	const ll = new SinglyLinkedList<number>();
	ll.unshift(1);
	t.is(ll.size, 1);
	ll.unshift(2);
	t.is(ll.size, 2);
});

test('pop', (t) => {
	const ll = new SinglyLinkedList<number>();
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
	const ll = new SinglyLinkedList<number>();
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
	const ll = new SinglyLinkedList<number>();
	t.true(ll.isEmpty());
	ll.push(1);
	t.false(ll.isEmpty());
	ll.pop();
	t.true(ll.isEmpty());
});

test('peek and peekFirst', (t) => {
	const ll = new SinglyLinkedList<number>();
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
