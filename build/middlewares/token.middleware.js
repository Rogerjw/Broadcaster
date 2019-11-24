"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _data = require("../models/data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var token = req.header('token');

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Please sign in first.'
    });
  }

  try {
    var verified = _jsonwebtoken["default"].verify(token, 'jwtPrivateKey');

    var isUserValid = _data.users.find(function (user) {
      return user.email === verified.email;
    });

    if (!isUserValid) {
      return res.status(400).send({
        status: 400,
        message: 'Invalid token!'
      });
    }

    req.user = isUserValid;
    next();
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error.message
    });
  }

  return 0;
};

var _default = verifyToken;
exports["default"] = _default;
//# sourceMappingURL=token.middleware.js.map