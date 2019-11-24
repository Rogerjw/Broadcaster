"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _redflags = _interopRequireDefault(require("../controllers/redflags.controller"));

var _token = _interopRequireDefault(require("../middlewares/token.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/api/v1/redflags', _token["default"], _redflags["default"].fetchAllRedFlags);
router.get('/api/v1/redflags/:id', _token["default"], _redflags["default"].getSpecificRedflag);
router.post('/api/v1/redflags', _token["default"], _redflags["default"].createRedflag);
router.patch('/api/v1/redflags/:id/location', _token["default"], _redflags["default"].editLocation);
router.patch('/api/v1/redflags/:id/comment', _token["default"], _redflags["default"].editComment);
router["delete"]('/api/v1/redflags/:id', _token["default"], _redflags["default"].deleteRedflag);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=redflags.route.js.map