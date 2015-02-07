var Joi = require('joi');
var UUID = require('uuid');

var WOGUUID = function (collection, options) {

    collection.schema = collection.schema.concat(Joi.object().keys({
        id: Joi.string().guid()
    }));
};

WOGUUID.prototype.preValidate = function () {

    if (!this.id) {
        this.id = UUID.v4();
    }
};

module.exports = WOGUUID;
