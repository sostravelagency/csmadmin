"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _default = {
  /* Add user api start here................................*/index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, zipcode, name, status;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, zipcode = _req$body.zipcode, name = _req$body.name, status = _req$body.status;
            _models.db.location.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                return _models.db.location.update({
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              return _models.db.location.create({
                name: name,
                status: parseInt(status) ? 'active' : 'inactive'
              });
            }).then(function (location) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted location"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context.next = 8;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 5]]);
    }))();
  },
  List: function List(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _models.db.location.findAll().then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context2.next = 7;
            break;
          case 4:
            _context2.prev = 4;
            _context2.t0 = _context2["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 4]]);
    }))();
  },
  getLocationDelete: function getLocationDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _models.db.location.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (location) {
              if (location) {
                return _models.db.location.destroy({
                  where: {
                    id: location.id
                  }
                });
              }
              throw new RequestError('location is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted location Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context3.next = 7;
            break;
          case 4:
            _context3.prev = 4;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 4]]);
    }))();
  },
  getLocationUpdate: function getLocationUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$body2, id, zipcode, name, status;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, id = _req$body2.id, zipcode = _req$body2.zipcode, name = _req$body2.name, status = _req$body2.status;
            _models.db.location.findOne({
              where: {
                id: parseInt(id)
              }
            }).then(function (location) {
              if (location) {
                return _models.db.location.update({
                  id: id,
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                }, {
                  where: {
                    id: location.id
                  }
                });
              }
              throw new RequestError('No data found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "Update location Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context4.next = 8;
            break;
          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 5]]);
    }))();
  },
  //area list
  areaCreate: function areaCreate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body3, name, zipcode, locationId, status;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body3 = req.body, name = _req$body3.name, zipcode = _req$body3.zipcode, locationId = _req$body3.locationId, status = _req$body3.status;
            _models.db.area.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                return _models.db.area.update({
                  locationId: locationId,
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              return _models.db.area.create({
                locationId: locationId,
                zipcode: zipcode,
                name: name,
                status: parseInt(status) ? 'active' : 'inactive'
              });
            }).then(function (area) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted area"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 8;
            break;
          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 5]]);
    }))();
  },
  areaList: function areaList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _models.db.area.findAll({
              include: [{
                model: _models.db.location,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context6.next = 7;
            break;
          case 4:
            _context6.prev = 4;
            _context6.t0 = _context6["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 4]]);
    }))();
  },
  getAreaDeleteById: function getAreaDeleteById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.area.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (area) {
              if (area) {
                return _models.db.area.destroy({
                  where: {
                    id: area.id
                  }
                });
              }
              throw new RequestError('area is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted area Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context7.next = 7;
            break;
          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 4]]);
    }))();
  },
  getAreaUpdate: function getAreaUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var _req$body4, id, zipcode, name, locationId, status;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body4 = req.body, id = _req$body4.id, zipcode = _req$body4.zipcode, name = _req$body4.name, locationId = _req$body4.locationId, status = _req$body4.status;
            _models.db.area.findOne({
              where: {
                id: parseInt(id)
              }
            }).then(function (area) {
              if (area) {
                return _models.db.area.update({
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive',
                  locationId: locationId ? locationId : area.locationId
                }, {
                  where: {
                    id: area.id
                  }
                });
              }
              throw new RequestError('No data found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "Update area Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 8;
            break;
          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 5]]);
    }))();
  },
  getAreaList: function getAreaList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _models.db.area.findAll({
              where: {
                locationId: req.query.locationId
              },
              include: [{
                model: _models.db.location,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 7;
            break;
          case 4:
            _context9.prev = 4;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 4]]);
    }))();
  },
  getAreaListById: function getAreaListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _models.db.area.findAll({
              where: {
                locationId: req.query.id
              },
              include: [{
                model: _models.db.location,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 7;
            break;
          case 4:
            _context10.prev = 4;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 4]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9kZWZhdWx0IiwiaW5kZXgiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJ6aXBjb2RlIiwibmFtZSIsInN0YXR1cyIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJkYiIsImxvY2F0aW9uIiwiZmluZE9uZSIsIndoZXJlIiwidGhlbiIsImRhdGEiLCJ1cGRhdGUiLCJwYXJzZUludCIsImlkIiwiY3JlYXRlIiwianNvbiIsIm1zZyIsImVyciIsInQwIiwiUmVxdWVzdEVycm9yIiwic3RvcCIsIkxpc3QiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImZpbmRBbGwiLCJsaXN0IiwiZ2V0TG9jYXRpb25EZWxldGUiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInF1ZXJ5IiwiZGVzdHJveSIsInJlIiwiZ2V0TG9jYXRpb25VcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJhcmVhQ3JlYXRlIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwibG9jYXRpb25JZCIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImFyZWEiLCJhcmVhTGlzdCIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiaW5jbHVkZSIsIm1vZGVsIiwiYXR0cmlidXRlcyIsImdldEFyZWFEZWxldGVCeUlkIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJnZXRBcmVhVXBkYXRlIiwiX2NhbGxlZTgiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0QXJlYUxpc3QiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldEFyZWFMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2xvY2F0aW9uL2xvY2F0aW9uLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblxyXG4gICAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXHJcblxyXG4gICAgYXN5bmMgaW5kZXgocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHppcGNvZGUsIG5hbWUsIHN0YXR1cyB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLmxvY2F0aW9uLmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lOiBuYW1lIH0gfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5sb2NhdGlvbi51cGRhdGUoeyB6aXBjb2RlOiB6aXBjb2RlLCBuYW1lOm5hbWUgLHN0YXR1czpwYXJzZUludChzdGF0dXMpPydhY3RpdmUnOidpbmFjdGl2ZScgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5sb2NhdGlvbi5jcmVhdGUoeyBuYW1lOiBuYW1lLCBzdGF0dXM6cGFyc2VJbnQoc3RhdHVzKT8nYWN0aXZlJzonaW5hY3RpdmUnfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgbG9jYXRpb25cIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIExpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5sb2NhdGlvbi5maW5kQWxsKClcclxuICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSxkYXRhOmxpc3R9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIGFzeW5jIGdldExvY2F0aW9uRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIubG9jYXRpb24uZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcclxuICAgICAgICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmxvY2F0aW9uLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogbG9jYXRpb24uaWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignbG9jYXRpb24gaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsnbXNnJzonc3VjY2VzcycsJ3N0YXR1cyc6IFwiZGVsZXRlZCBsb2NhdGlvbiBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRMb2NhdGlvblVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0eyBpZCwgemlwY29kZSwgbmFtZSwgc3RhdHVzfSA9IHJlcS5ib2R5XHJcbiAgICAgICAgICAgIGRiLmxvY2F0aW9uLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQoaWQpIH0gfSlcclxuICAgICAgICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmxvY2F0aW9uLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCwgemlwY29kZTogemlwY29kZSwgbmFtZTogbmFtZSwgc3RhdHVzOnBhcnNlSW50KHN0YXR1cyk/J2FjdGl2ZSc6J2luYWN0aXZlJyBcclxuICAgICAgICAgICAgICAgICAgICB9LHt3aGVyZToge2lkOiBsb2NhdGlvbi5pZH19KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignTm8gZGF0YSBmb3VuZCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7J21zZyc6J3N1Y2Nlc3MnLCdzdGF0dXMnOiBcIlVwZGF0ZSBsb2NhdGlvbiBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vYXJlYSBsaXN0XHJcbiAgICBhc3luYyBhcmVhQ3JlYXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB6aXBjb2RlLCBsb2NhdGlvbklkLCBzdGF0dXMgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICBkYi5hcmVhLmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lOiBuYW1lIH0gfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5hcmVhLnVwZGF0ZSh7IGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWQsIHppcGNvZGU6IHppcGNvZGUsIG5hbWU6bmFtZSAsIHN0YXR1czpwYXJzZUludChzdGF0dXMpPydhY3RpdmUnOidpbmFjdGl2ZScgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5hcmVhLmNyZWF0ZSh7IGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWQsIHppcGNvZGU6IHppcGNvZGUsIG5hbWU6IG5hbWUsIHN0YXR1czpwYXJzZUludChzdGF0dXMpPydhY3RpdmUnOidpbmFjdGl2ZSd9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGFyZWEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGFyZWFcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGFyZWFMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuYXJlYS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5sb2NhdGlvbiwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdLCB9XVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLGRhdGE6bGlzdH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldEFyZWFEZWxldGVCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuYXJlYS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAgICAgICAudGhlbihhcmVhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmFyZWEuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBhcmVhLmlkIH0gfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ2FyZWEgaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsnbXNnJzonc3VjY2VzcycsJ3N0YXR1cyc6IFwiZGVsZXRlZCBhcmVhIFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0QXJlYVVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0eyBpZCwgemlwY29kZSwgbmFtZSwgbG9jYXRpb25JZCxzdGF0dXN9ID0gcmVxLmJvZHlcclxuICAgICAgICAgICAgZGIuYXJlYS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KGlkKSB9IH0pXHJcbiAgICAgICAgICAgIC50aGVuKGFyZWEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuYXJlYS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2RlOiB6aXBjb2RlLCBuYW1lOiBuYW1lLCBzdGF0dXM6cGFyc2VJbnQoc3RhdHVzKT8nYWN0aXZlJzonaW5hY3RpdmUnLCBsb2NhdGlvbklkOiBsb2NhdGlvbklkPyBsb2NhdGlvbklkOiBhcmVhLmxvY2F0aW9uSWQgXHJcbiAgICAgICAgICAgICAgICAgICAgfSx7d2hlcmU6IHtpZDogYXJlYS5pZH19KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignTm8gZGF0YSBmb3VuZCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7J21zZyc6J3N1Y2Nlc3MnLCdzdGF0dXMnOiBcIlVwZGF0ZSBhcmVhIFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0QXJlYUxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5hcmVhLmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgbG9jYXRpb25JZDogcmVxLnF1ZXJ5LmxvY2F0aW9uSWQgfSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5sb2NhdGlvbiwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldEFyZWFMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLmFyZWEuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBsb2NhdGlvbklkOiByZXEucXVlcnkuaWQgfSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5sb2NhdGlvbiwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufVxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQXFDLElBQUFDLFFBQUEsR0FDdEI7RUFFWCw0REFFTUMsS0FBSyxXQUFBQSxNQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsU0FBQSxFQUFBQyxPQUFBLEVBQUFDLElBQUEsRUFBQUMsTUFBQTtNQUFBLE9BQUFOLFlBQUEsWUFBQU8sSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFYLElBQUE7VUFBQTtZQUFBVyxRQUFBLENBQUFDLElBQUE7WUFBQVAsU0FBQSxHQUVjUCxHQUFHLENBQUNlLElBQUksRUFBbENQLE9BQU8sR0FBQUQsU0FBQSxDQUFQQyxPQUFPLEVBQUVDLElBQUksR0FBQUYs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