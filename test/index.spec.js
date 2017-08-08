'use strict';

const test = require('ava').test;
const fs = require('fs');

const deserialize = require('../').deserialize;
const serialize = require('../').serialize;

const fixtureXml = fs.readFileSync(__dirname + '/../examples/comet.xml').toString();
const fixtureJson = require('../examples/comet');

test('should deserialize to xml', (t) => {
    let deserialized = deserialize(fixtureXml);
    deserialized.value.date = deserialized.value.date.toString();
    t.deepEqual(deserialized, fixtureJson);
    t.pass();
});

test('should serialize to xml', (t) => {
    let serialized = serialize(fixtureJson);
    t.is(serialized, fixtureXml);
    t.pass();
});
