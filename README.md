## wadofgum-uuid [![Build Status](https://travis-ci.org/nlf/wadofgum-uuid.svg)](https://travis-ci.org/nlf/wadofgum-uuid)

A mixin to make sure your models have an 'id' field configured to be a uuid string. This mixin does nothing if you don't have a validation mixin loaded.

###

When using this mixin an `id` property will be added to your class schema and defined as `Joi.string().guid()`. When calling validate if the instance's `id` property is blank, a uuid will be assigned for you.

```js
const Wadofgum = require('wadofgum');
const Validation = require('wadofgum-validation');
const UUID = require('wadofgum-uuid');
const Joi = require('joi');

class Model extends Wadofgum.mixin(Validation, UUID) {};
Model.schema = { name: Joi.string() };

let model = new Model({ name: 'test' });
model.id; // undefined
model.validate().then(function () {
  model.id; // some randomly generated uuid
});
