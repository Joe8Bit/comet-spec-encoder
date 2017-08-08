'use strict';

const test = require('ava').test;

const fromXmlString = require('../../src/from-xml-string');

const fixture = `
<note>
  <to>Tobi</to>
</note>
`;

test('fromXmlString should convert XML to a JSON string', (t) => {
    let obj = fromXmlString(fixture);

    t.deepEqual(obj, {
        declaration: undefined,
        root: {
            name: 'note',
            attributes: {},
            children: [{
                name: 'to',
                attributes: {},
                children: [],
                content: 'Tobi'
            }],
            content: ''
        }
    });
});
