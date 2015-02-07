var Joi = require('joi');
var WOG = require('wadofgum');
var UUID = require('..');

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;

lab.test('can load the plugin', function (done) {

    var User = new WOG({
        name: 'user',
        schema: {
            name: Joi.string()
        }
    });

    expect(function () {

        User.use(UUID);
    }).to.not.throw();

    done();
});

lab.test('sets a uuid when id is undefined', function (done) {

    var User = new WOG({
        name: 'user',
        schema: {
            name: Joi.string()
        }
    });

    User.use(UUID);

    var user = new User({
        name: 'test'
    });

    user.validate();
    expect(user.id).to.exist();
    done();
});

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
