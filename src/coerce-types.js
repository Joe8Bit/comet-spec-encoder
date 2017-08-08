'use strict';

const fromIntermediateObj = (intermediate) => {
    if (intermediate.issue) intermediate.issue = parseInt(intermediate.issue, 10);
    if (intermediate.volume) intermediate.volume = parseInt(intermediate.volume, 10);
    if (intermediate.date) intermediate.date = new Date(intermediate.date);
    if (intermediate.price) intermediate.price = parseFloat(intermediate.price, 10);
    if (intermediate.pages) intermediate.pages = parseInt(intermediate.pages, 10);
    if (intermediate.lastMark) intermediate.lastMark = parseInt(intermediate.lastMark, 10);

    // This list of properties (for some reason in the spec) can have multiple defined with XML fields as CSV's
    ['genre', 'character', 'creator', 'writer', 'penciller', 'editor', 'letterer', 'inker', 'colorist'].forEach((field) => {
        if (intermediate[field]) {
            intermediate[field] = intermediate[field].split(',').map((genre) => {
                return genre.trim();
            });
        }
    });

    return intermediate;
};

module.exports = fromIntermediateObj;
