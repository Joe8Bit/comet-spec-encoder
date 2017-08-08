'use strict';

const test = require('ava').test;

const coerceTypes = require('../../src/coerce-types');

test('coerceTypes should convert direct types', (t) => {
    let types = coerceTypes({
        issue: '9',
        volume: '2',
        date: '2012-09-01',
        price: '22.02',
        pages: '22',
        lastMark: '1',
    });

    t.is(types.issue, 9);
    t.is(types.volume, 2);
    t.is(types.date.toString(), new Date('2012-09-01').toString());
    t.is(types.price, 22.02);
    t.is(types.pages, 22);
    t.is(types.lastMark, 1);
	t.pass();
});

test('coerceTypes should not convert other types', (t) => {
    let types = coerceTypes({
        title: 'Foobar'
    });

    t.is(types.title, 'Foobar');
	t.pass();
});

test('coerceTypes should parse explicit CSV types into arrays', (t) => {
    let types = coerceTypes({
        genre: 'foo, bar, baz',
        character: 'foo, bar, baz',
        creator: 'foo, bar, baz',
        writer: 'foo, bar, baz',
        penciller: 'foo, bar, baz',
        editor: 'foo, bar, baz',
        letterer: 'foo, bar, baz',
        inker: 'foo, bar, baz',
        colorist: 'foo, bar, baz'
    });

    t.deepEqual(types.genre, ['foo', 'bar', 'baz']);
    t.deepEqual(types.character, ['foo', 'bar', 'baz']);
    t.deepEqual(types.creator, ['foo', 'bar', 'baz']);
    t.deepEqual(types.writer, ['foo', 'bar', 'baz']);
    t.deepEqual(types.penciller, ['foo', 'bar', 'baz']);
    t.deepEqual(types.editor, ['foo', 'bar', 'baz']);
    t.deepEqual(types.letterer, ['foo', 'bar', 'baz']);
    t.deepEqual(types.inker, ['foo', 'bar', 'baz']);
    t.deepEqual(types.colorist, ['foo', 'bar', 'baz']);
	t.pass();
});
