'use strict';

const test = require('ava').test;

const toXmlString = require('../../src/to-xml-string');

test('should convert an array of objects to a flat array', (t) => {
    let xml = toXmlString({
        foo: 'bar',
        blork: ['a', 'b', 'c']
    });

    t.is(xml, '<comet xmlns:comet="http://www.denvog.com/comet/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.denvog.com http://www.denvog.com/comet/comet.xsd"><foo>bar</foo><blork>a,b,c</blork></comet>');
	t.pass();
});
