'use strict';

const test = require('ava').test;

const validate = require('../../src/validate-obj');

test('should validate "title" as required', (t) => {
    let validated = validate({
        foo: 'bar'
    });

    t.is(validated.error.toString(), 'ValidationError: child "title" fails because ["title" is required]');
    t.pass();
});

// We don't test everything here as were essentially just testing Joi, which is already pretty extensivley tested
