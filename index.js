'use strict';

const fromXmlString = require('./src/from-xml-string');
const toIntermediateObj = require('./src/to-intermediate-obj');
const coerceTypes = require('./src/coerce-types');
const validate = require('./src/validate-obj');
const toXmlString = require('./src/to-xml-string');

const deserialize = (str) => {
    return validate(coerceTypes(toIntermediateObj(fromXmlString(str))));
};

const serialize = (obj) => {
    return toXmlString(validate(obj));
};

module.exports = { serialize, deserialize };
