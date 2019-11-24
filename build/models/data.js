"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redflags = exports.users = void 0;

var _user = _interopRequireDefault(require("./user.model"));

var _redflag = _interopRequireDefault(require("./redflag.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = [new _user["default"](1234567890123456, 'Muhire', 'Roger', 'rogermuhire@gmail.com', 'muhireroger', '0781870110', 'rogerjw', 'admin'), new _user["default"](1199880158239529, 'Uwitonze', 'Naice', 'unaice@gmail.com', 'uwinaice', '0788347151', 'thineorb', 'citizen')];
exports.users = users;
var redflags = [new _redflag["default"](1, '12/12/09', '1234567890123456', 'Corruption', 'Redflag', 'Latitude:-1.9570688 Longitude:30.101504', 'draft', 'image.png', 'video.mp4', 'last night,i was asked to bribe a police off...'), new _redflag["default"](2, '12/12/19', '1199880158029539', 'Corruption', 'Redflag', 'Latitude:-1.9570688 Longitude:30.101504', 'draft', 'image.png', 'video.mp4', 'i was denied a driving license,just because i didnt have enough cash...')];
exports.redflags = redflags;
//# sourceMappingURL=data.js.map