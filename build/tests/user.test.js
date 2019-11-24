"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('BroadCaster Api', function () {
  // signUp test
  it('should be able to signUp', function (done) {
    var user = {
      id: 1234567890123456,
      firstname: 'muhire',
      lastname: 'roger',
      email: 'rogermuhi@gmail.com',
      password: 'ajkldfjla',
      PhoneNumber: 99305657657,
      username: 'rogerjw'
    };

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(user).end(function (error, res) {
      res.status.should.be.equal(201);
      res.body.message.should.be.equal('User created successfully');
    });

    done();
  });
});
//# sourceMappingURL=user.test.js.map