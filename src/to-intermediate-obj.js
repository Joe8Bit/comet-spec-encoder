'use strict';

const _ = require('lodash');

module.exports = (rawObj) => {
    return _.extend.apply(_, raw.root.children.map((child) => {
        let obj = {};
        obj[child.name] = child.content
        return obj;
    }));
};
