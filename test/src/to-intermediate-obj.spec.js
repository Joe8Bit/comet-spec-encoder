'use strict';

const test = require('ava').test;

const toIntermediateObj = require('../../src/to-intermediate-obj');

test('should convert an array of objects to a flat array', (t) => {
    let obj = toIntermediateObj({
        root: {
            children: [{
                name: 'bar',
                content: 'baz'
            }, {
                name: 'lorp',
                content: 'blork'
            }]
        }
    });

    t.deepEqual(obj, {
        bar: 'baz',
        lorp: 'blork'
    });
	t.pass();
});
