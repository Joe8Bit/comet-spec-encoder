'use strict';

const builder = require('xmlbuilder');

module.exports = (intermediate) => {
    let comet = builder.create({
        comet: {
            '@xmlns:comet': 'http://www.denvog.com/comet/',
            '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '@xsi:schemaLocation': 'http://www.denvog.com http://www.denvog.com/comet/comet.xsd'
        }
    });

    Object.keys(intermediate).forEach((key) => {
        let val = (Array.isArray(intermediate[key])) ? intermediate[key].join() : intermediate[key];
        let item = comet.ele(key, val).up();
    });

    return comet.toString();
};