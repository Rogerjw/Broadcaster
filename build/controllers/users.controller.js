"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

var _data = require("../models/data");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "createUser",
    value: function createUser(req, res) {
      var schema = _joi["default"].object({
        id: _joi["default"].number().min(16).required(),
        firstname: _joi["default"].string().min(4).required(),
        lastname: _joi["default"].string().min(4).required(),
        email: _joi["default"].string().min(6).required().email(),
        password: _joi["default"].string().min(3).required(),
        PhoneNumber: _joi["default"].number().min(10).required(),
        username: _joi["default"].string().min(3).required()
      });

      var result = schema.validate(req.body);

      if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
      }

      var user = new _user["default"](req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.PhoneNumber, req.body.username);

      _data.users.push(user);

      var genToken = _jsonwebtoken["default"].sign({
        email: user.email
      }, 'jwtPrivateKey');

      return res.status(201).send({
        status: 201,
        message: 'User created successfully',
        token: genToken,
        data: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          PhoneNumber: user.PhoneNumber,
          username: user.username
        }
      });
    }
  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var schema = _joi["default"].object({
        email: _joi["default"].string().min(6).required().email(),
        password: _joi["default"].string().min(5).required()
      });

      var result = schema.validate(req.body);

      if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
      }

      var loggedUser = _data.users.find(function (user) {
        return user.email === req.body.email;
      });

      var isPasswordCorrect = function isPasswordCorrect() {
        if (req.body.password === loggedUser.password) return true;
      };

      if (loggedUser && isPasswordCorrect()) {
        var genToken = _jsonwebtoken["default"].sign({
          email: loggedUser.email
        }, 'jwtPrivateKey');

        return res.status(200).send({
          status: 200,
          message: 'User is successfully logged in',
          token: genToken,
          data: {
            id: loggedUser.id,
            firstname: loggedUser.firstname,
            lastname: loggedUser.lastname,
            email: loggedUser.email,
            PhoneNumber: loggedUser.PhoneNumber,
            username: loggedUser.username
          }
        });
      }

      return res.status(404).send({
        status: 404,
        message: 'incorrect email or password'
      });
    }
  }]);

  return UsersController;
}();

var usersController = new UsersController();
var _default = usersController;
exports["default"] = _default;
//# sourceMappingURL=users.controller.js.map