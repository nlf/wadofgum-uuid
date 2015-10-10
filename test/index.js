'use strict';

const Wadofgum = require('wadofgum');
const Events = require('wadofgum-events');
const Validation = require('wadofgum-validation');
const UUID = require('..');
const Joi = require('joi');
const UUIDMod = require('uuid');

let lab = exports.lab = require('lab').script();
let expect = require('code').expect;

lab.test('does nothing if validation is not available', function (done) {

    class User extends Wadofgum.mixin(UUID) {};
    expect(User).to.exist();
    expect(User.capabilities.has('uuid')).to.equal(false);
    done();
});

lab.describe('when using only validation mixin', function () {

    lab.test('extends the class schema when passing a joi schema', function (done) {

        class User extends Wadofgum.mixin(Validation, UUID) {};
        expect(User.capabilities.has('uuid')).to.equal(true);
        User.schema = Joi.object({ name: Joi.string() });
        expect(User.meta.get('keys')).to.contain('id');
        done();
    });

    lab.test('extends the class schema when passing a plain object', function (done) {

        class User extends Wadofgum.mixin(Validation, UUID) {};
        expect(User.capabilities.has('uuid')).to.equal(true);
        User.schema = { name: Joi.string() };
        expect(User.meta.get('keys')).to.contain('id');
        done();
    });
});

lab.describe('when using events and validation mixins', function () {

    lab.test('sets a uuid when none is defined', function (done) {

        class User extends Wadofgum.mixin(Events, Validation, UUID) {};
        expect(User.capabilities.has('uuid')).to.equal(true);
        User.schema = Joi.object({ name: Joi.string() });
        let user = new User({ name: 'test' });
        user.validate().then(function () {

            expect(user.id).to.exist();
            done();
        });
    });

    lab.test('does not set a uuid when id is already defined', function (done) {

        class User extends Wadofgum.mixin(Events, Validation, UUID) {};
        expect(User.capabilities.has('uuid')).to.equal(true);
        User.schema = Joi.object({ name: Joi.string() });
        let id = UUIDMod.v4();
        let user = new User({ name: 'test', id: id });
        user.validate().then(function () {

            expect(user.id).to.equal(id);
            done();
        });
    });
});

/*
lab.test('does not set a uuid when id is already defined', function (done) {

    var User = new WOG({
        name: 'user',
        schema: {
            name: Joi.string()
        }
    });

    User.use(UUID);

    var user = new User({
        id: 'abcd-abcd-abcd-abcd',
        name: 'test'
    });

    user.validate();
    expect(user.id).to.equal('abcd-abcd-abcd-abcd');
    done();
});
*/
