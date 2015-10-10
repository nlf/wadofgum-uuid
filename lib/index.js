'use strict';

const Joi = require('joi');
const UUID = require('uuid');

module.exports = function (baseClass) {

    if (!baseClass.capabilities.has('validation')) {
        return baseClass;
    }

    class Model extends baseClass {
        static set schema (val) {

            if (val.isJoi) {
                val = val.concat(Joi.object({ id: Joi.string().guid() }));
            }
            else {
                val.id = Joi.string().guid();
            }

            super.schema = val;
        };

        validate () {

            this.id = this.id || UUID.v4();
            return super.validate();
        };
    };

    Model.capabilities.add('uuid');

    return Model;
};
