"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _data = require("../models/data");

var _redflag = _interopRequireDefault(require("../models/redflag.model"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RedflagsController =
/*#__PURE__*/
function () {
  function RedflagsController() {
    _classCallCheck(this, RedflagsController);
  }

  _createClass(RedflagsController, [{
    key: "fetchAllRedFlags",
    value: function fetchAllRedFlags(req, res) {
      return res.status(200).send({
        status: 200,
        data: _data.redflags
      });
    }
  }, {
    key: "getSpecificRedflag",
    value: function getSpecificRedflag(req, res) {
      var redflag = _data.redflags.find(function (item) {
        return item.id.toString() === req.params.id;
      });

      if (!redflag) {
        return res.status(404).send({
          success: 404,
          message: 'The red-flag does not exist, please check well the entered id'
        });
      }

      return res.status(200).send({
        status: 200,
        data: redflag
      });
    }
  }, {
    key: "createRedflag",
    value: function createRedflag(req, res) {
      var schema = _joi["default"].object({
        title: _joi["default"].string().min(4).required(),
        type: _joi["default"].string().min(4).required(),
        comment: _joi["default"].string().min(10).required(),
        location: _joi["default"].string().min(10).required(),
        status: _joi["default"].string().min(3).required(),
        images: _joi["default"].array().required(),
        videos: _joi["default"].array().required()
      });

      var result = schema.validate(req.body);

      if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
      }

      var redflag = new _redflag["default"](_data.redflags.length + 1, req.body.createdOn, _data.users.find(function (user) {
        return user.email === _jsonwebtoken["default"].verify(req.header('token'), 'jwtPrivateKey').email;
      }).id, req.body.title, req.body.type, req.body.location, req.body.status, req.body.images, req.body.videos, req.body.comment);

      _data.redflags.push(redflag);

      return res.status(201).send({
        status: 201,
        data: {
          id: redflag.id,
          message: 'Created redflag record'
        }
      });
    }
  }, {
    key: "editLocation",
    value: function editLocation(req, res) {
      var user = _data.users.find(function (user) {
        return user.email === _jsonwebtoken["default"].verify(req.header('token'), 'jwtPrivateKey').email;
      });

      if (user.type === 'citizen') {
        var redflag = _data.redflags.find(function (item) {
          return item.id.toString() === req.params.id;
        });

        if (redflag) {
          if (redflag.status != 'draft') {
            return res.status(401).json({
              status: 401,
              data: {
                message: 'you are not allowed to edit a red-flag which is under-investigation'
              }
            });
          }

          redflag.location = req.body.location;
          return res.status(200).json({
            status: 200,
            data: {
              id: redflag.id,
              message: 'Updated red-flag record’s location'
            }
          });
        }

        return res.status(404).json({
          status: 404,
          data: {
            message: 'red-flag not found'
          }
        });
      }

      return res.status(401).json({
        status: 401,
        data: {
          message: 'you must be a citizen to edit the location'
        }
      });
    }
  }, {
    key: "editComment",
    value: function editComment(req, res) {
      var user = _data.users.find(function (user) {
        return user.email === _jsonwebtoken["default"].verify(req.header('token'), 'jwtPrivateKey').email;
      });

      if (user.type === 'citizen') {
        var redflag = _data.redflags.find(function (item) {
          return item.id.toString() === req.params.id;
        });

        if (redflag) {
          if (redflag.status != 'draft') {
            return res.status(401).json({
              status: 401,
              data: {
                message: 'you are not allowed to edit a red-flag which is under-investigation'
              }
            });
          }

          redflag.title = req.body.title;
          redflag.type = req.body.type;
          redflag.comment = req.body.comment;
          redflag.location = req.body.location;
          return res.status(200).json({
            status: 200,
            data: {
              id: redflag.id,
              message: 'Updated red-flag record’s comment'
            }
          });
        }

        return res.status(404).json({
          status: 404,
          data: {
            message: 'red-flag not found'
          }
        });
      }

      return res.status(401).json({
        status: 401,
        data: {
          message: 'you must be a citizen to edit the comment'
        }
      });
    }
  }, {
    key: "deleteRedflag",
    value: function deleteRedflag(req, res) {
      var user = _data.users.find(function (user) {
        return user.email === _jsonwebtoken["default"].verify(req.header('token'), 'jwtPrivateKey').email;
      });

      if (user.type === 'citizen') {
        var redflag = _data.redflags.find(function (item) {
          return item.id.toString() === req.params.id;
        });

        if (redflag) {
          if (redflag.status != 'draft') {
            return res.status(401).json({
              status: 401,
              data: {
                message: 'you are not allowed to delete a red-flag which is under-investigation'
              }
            });
          }

          _data.redflags.splice(redflag, 1);

          return res.status(200).json({
            status: 200,
            data: {
              id: redflag.id,
              message: 'red-flag record has been deleted',
              data: _data.redflags
            }
          });
        }

        return res.status(404).json({
          status: 404,
          data: {
            message: 'red-flag not found'
          }
        });
      }

      return res.status(401).json({
        status: 401,
        data: {
          message: 'you must be a citizen to delete a redflag record'
        }
      });
    }
  }]);

  return RedflagsController;
}();

var redflagsController = new RedflagsController();
var _default = redflagsController;
exports["default"] = _default;
//# sourceMappingURL=redflags.controller.js.map