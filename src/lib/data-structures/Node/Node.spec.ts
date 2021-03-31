import test from 'ava';

import { Node } from './index';

test('constructor', (t) => {
	const node = new Node(7);
	t.is(node.value, 7);
	t.is(node.next, null);
	t.is(node.prev, null);
	t.truthy(node);
});

test('value', (t) => {
	const node = new Node(7);
	t.is(node.value, 7);
	node.value = 1;
	t.is(node.value, 1);
});

test('next', (t) => {
	const node = new Node(7);
	const nextNode = new Node(8);
	node.next = nextNode;
	t.is(node.next, nextNode);
	t.is((node.next as Node<number>).value, nextNode.value);
});

test('prev', (t) => {
	const node = new Node(7);
	const prevNode = new Node(6);
	node.prev = prevNode;
	t.is(node.prev, prevNode);
	t.is((node.prev as Node<number>).value, prevNode.value);
});
