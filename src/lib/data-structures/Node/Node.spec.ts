import test from 'ava';

import { DoublyNode, Node } from './index';

test('Node constructor', (t) => {
	const node = new Node(7);
	t.is(node.value, 7);
	t.is(node.next, null);
	t.truthy(node);
});

test('Node value', (t) => {
	const node = new Node(7);
	t.is(node.value, 7);
	node.value = 1;
	t.is(node.value, 1);
});

test('Node next', (t) => {
	const node = new Node(7);
	const nextNode = new Node(8);
	node.next = nextNode;
	t.is(node.next, nextNode);
	t.is(node.next.value, nextNode.value);
});

test('DoublyNode constructor', (t) => {
	const node = new DoublyNode(7);
	t.is(node.value, 7);
	t.is(node.next, null);
	t.is(node.prev, null);
	t.truthy(node);
});

test('DoublyNode value', (t) => {
	const node = new DoublyNode(7);
	t.is(node.value, 7);
	node.value = 1;
	t.is(node.value, 1);
});

test('DoublyNode next', (t) => {
	const node = new DoublyNode(7);
	const nextNode = new DoublyNode(8);
	node.next = nextNode;
	t.is(node.next, nextNode);
	t.is((node.next as DoublyNode<number>).value, nextNode.value);
});

test('DoublyNode prev', (t) => {
	const node = new DoublyNode(7);
	const prevNode = new DoublyNode(6);
	node.prev = prevNode;
	t.is(node.prev, prevNode);
	t.is((node.prev as DoublyNode<number>).value, prevNode.value);
});
