"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifEmailExist = void 0;

var _data = require("../models/data");

var ifEmailExist = function ifEmailExist(req, res, next) {
  var ExistingUser = _data.users.find(function (user) {
    return user.email === req.body.email;
  });

  if (ExistingUser) {
    return res.status(409).send({
      status: 409,
      message: 'Email already exists'
    });
  }

  next();
};

exports.ifEmailExist = ifEmailExist;
//# sourceMappingURL=auth.middleware.js.map