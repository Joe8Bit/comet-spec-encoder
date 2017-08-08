'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    series: Joi.string(),
    issue: Joi.number().greater(-1),
    volume: Joi.number().greater(-1),
    publisher: Joi.string(),
    date: Joi.date().iso(),
    genre: Joi.array().items(Joi.string()),
    character: Joi.array().items(Joi.string()),
    isVersionOf: Joi.string(),
    price: Joi.number().precision(2),
    format: Joi.string(),
    language: Joi.string(),
    rating: Joi.string(),
    rights: Joi.string(),
    identifier: Joi.string(),
    pages: Joi.number(),
    creator: Joi.array().items(Joi.string()),
    writer: Joi.array().items(Joi.string()),
    penciller: Joi.array().items(Joi.string()),
    editor: Joi.array().items(Joi.string()),
    coverDesigner: Joi.string(),
    letterer: Joi.array().items(Joi.string()),
    inker: Joi.array().items(Joi.string()),
    colorist: Joi.array().items(Joi.string()),
    coverImage: Joi.string().uri(),
    lastMark: Joi.number().greater(-1),
    readingDirection: Joi.string().allow('ltr', 'rtl'),
});

module.exports = (toValidate) => {
    return Joi.validate(toValidate, schema);
};
