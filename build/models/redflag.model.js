"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Redflag = function Redflag(id, createdOn, createdBy, title) {
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'redflag';
  var location = arguments.length > 5 ? arguments[5] : undefined;
  var status = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'draft';
  var images = arguments.length > 7 ? arguments[7] : undefined;
  var videos = arguments.length > 8 ? arguments[8] : undefined;
  var comment = arguments.length > 9 ? arguments[9] : undefined;

  _classCallCheck(this, Redflag);

  this.id = id;
  this.createdOn = createdOn;
  this.createdBy = createdBy;
  this.title = title;
  this.type = type;
  this.location = location;
  this.status = status;
  this.images = images;
  this.videos = videos;
  this.comment = comment;
};

var _default = Redflag;
exports["default"] = _default;
//# sourceMappingURL=redflag.model.js.map