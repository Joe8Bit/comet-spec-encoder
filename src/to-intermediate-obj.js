'use strict';

const _ = require('lodash');

module.exports = (rawObj) => {
    return _.extend.apply(_, rawObj.root.children.map((child) => {
        let obj = {};
        obj[child.name] = child.content
        return obj;
    }));
};
