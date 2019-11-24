"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(id, firstname, lastname, email, password, PhoneNumber, username) {
  var type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'citizen';

  _classCallCheck(this, User);

  this.id = id;
  this.firstname = firstname;
  this.lastname = lastname;
  this.email = email;
  this.password = password;
  this.PhoneNumber = PhoneNumber;
  this.username = username;
  this.type = type;
};

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.model.js.map