"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users.controller"));

var _auth = require("../middlewares/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/api/v1/auth/signup', _auth.ifEmailExist, _users["default"].createUser);
router.post('/api/v1/auth/signin', _users["default"].loginUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.route.js.map