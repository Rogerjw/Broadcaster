"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./routes/auth.route"));

var _redflags = _interopRequireDefault(require("./routes/redflags.route"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 5000;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_auth["default"]);
app.use(_redflags["default"]);
app.listen(PORT, function () {
  return console.log("listening on ".concat(PORT, "..."));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=server.js.map