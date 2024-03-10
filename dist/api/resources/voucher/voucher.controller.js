"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _require = require("sequelize"),
  Op = _require.Op,
  Sequelize = _require.Sequelize;
var generateVoucher = function generateVoucher() {
  var min = 2;
  var max = 20;
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  var voucherValue = randomNumber * 5000;
  var expireDate = new Date();
  // Thêm 30 ngày vào ngày hiện tại để tạo expire date
  expireDate.setDate(expireDate.getDate() + 30);
  var code = generateCode();
  return {
    discount: voucherValue,
    expire: expireDate.toISOString(),
    code: code
  };
};
function generateCode() {
  // Tạo một mã code ngẫu nhiên, ví dụ: ABCD1234
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  var code = '';
  for (var i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
var _default = {
  getAllVoucher: function getAllVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var voucherList;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.db.voucher.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            voucherList = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              ok: true,
              data: voucherList
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  createVoucher: function createVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.db.voucher.create(_objectSpread({}, req.body));
          case 2:
            return _context2.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  deleteVoucher: function deleteVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var voucherId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            voucherId = req.body.voucherId;
            _context3.next = 3;
            return _models.db.voucher.destroy({
              where: {
                id: voucherId
              }
            });
          case 3:
            return _context3.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  detailVoucher: function detailVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var voucherId, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            voucherId = req.query.voucherId;
            _context4.next = 3;
            return _models.db.voucher.findOne({
              where: {
                id: voucherId
              }
            });
          case 3:
            data = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              data: data
            }));
          case 5:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  applyVoucher: function applyVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var uid, code, data, data1;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            uid = req.user.uid;
            code = req.body.code;
            _context5.next = 4;
            return _models.db.voucher.findOne({
              where: {
                code: code
              }
            });
          case 4:
            data = _context5.sent;
            if (!data) {
              _context5.next = 14;
              break;
            }
            _context5.next = 8;
            return _models.db.vouchercustomer.findOne({
              where: {
                voucherId: data.id,
                customerId: uid
              }
            });
          case 8:
            data1 = _context5.sent;
            if (!(data1.is_use == 1)) {
              _context5.next = 11;
              break;
            }
            return _context5.abrupt("return", res.status(200).json({
              ok: false,
              used: true
            }));
          case 11:
            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              data: {
                id: data.id
              }
            }));
          case 14:
            return _context5.abrupt("return", res.status(200).json({
              ok: false,
              data: data
            }));
          case 15:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  createSchedule: function createSchedule(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _req$body, date_start, date_end, amount_voucher, vouchers, i, voucher;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, date_start = _req$body.date_start, date_end = _req$body.date_end, amount_voucher = _req$body.amount_voucher;
            vouchers = [];
            for (i = 0; i < parseInt(amount_voucher); i++) {
              voucher = generateVoucher();
              vouchers.push(voucher);
            }
            _models.db.voucher.bulkCreate(vouchers);
            _models.db.voucherschedule.create({
              date_start: date_start,
              date_end: date_end,
              amount_voucher: amount_voucher
            });
            return _context6.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  getSchedule: function getSchedule(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var data;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.db.voucherschedule.findOne();
          case 2:
            data = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              data: data
            }));
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  getVoucherHuting: function getVoucherHuting(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var data1, data;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models.db.voucherschedule.findOne();
          case 2:
            data1 = _context8.sent;
            _context8.next = 5;
            return _models.db.voucher.findAll({
              order: Sequelize.literal('RAND()'),
              limit: (data1 === null || data1 === void 0 ? void 0 : data1.amount_voucher) || 0
            });
          case 5:
            data = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              data: data
            }));
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsImdlbmVyYXRlVm91Y2hlciIsIm1pbiIsIm1heCIsInJhbmRvbU51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInZvdWNoZXJWYWx1ZSIsImV4cGlyZURhdGUiLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJjb2RlIiwiZ2VuZXJhdGVDb2RlIiwiZGlzY291bnQiLCJleHBpcmUiLCJ0b0lTT1N0cmluZyIsImNoYXJhY3RlcnMiLCJjaGFyQXQiLCJfZGVmYXVsdCIsImdldEFsbFZvdWNoZXIiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInZvdWNoZXJMaXN0Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImRiIiwidm91Y2hlciIsImZpbmRBbGwiLCJvcmRlciIsInNlbnQiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJkYXRhIiwic3RvcCIsImNyZWF0ZVZvdWNoZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImNyZWF0ZSIsImJvZHkiLCJkZWxldGVWb3VjaGVyIiwiX2NhbGxlZTMiLCJ2b3VjaGVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJkZXN0cm95Iiwid2hlcmUiLCJpZCIsImRldGFpbFZvdWNoZXIiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsInF1ZXJ5IiwiZmluZE9uZSIsImFwcGx5Vm91Y2hlciIsIl9jYWxsZWU1IiwidWlkIiwiZGF0YTEiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJ1c2VyIiwidm91Y2hlcmN1c3RvbWVyIiwiY3VzdG9tZXJJZCIsImlzX3VzZSIsInVzZWQiLCJjcmVhdGVTY2hlZHVsZSIsIl9jYWxsZWU2IiwiX3JlcSRib2R5IiwiZGF0ZV9zdGFydCIsImRhdGVfZW5kIiwiYW1vdW50X3ZvdWNoZXIiLCJ2b3VjaGVycyIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsInBhcnNlSW50IiwiYnVsa0NyZWF0ZSIsInZvdWNoZXJzY2hlZHVsZSIsImdldFNjaGVkdWxlIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJnZXRWb3VjaGVySHV0aW5nIiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJsaXRlcmFsIiwibGltaXQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdm91Y2hlci92b3VjaGVyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcclxuY29uc3QgeyBPcCwgU2VxdWVsaXplIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xyXG5cclxuY29uc3QgZ2VuZXJhdGVWb3VjaGVyID0oKT0+IHtcclxuICAgIGNvbnN0IG1pbiA9IDI7XHJcbiAgICBjb25zdCBtYXggPSAyMDtcclxuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbiAgICBjb25zdCB2b3VjaGVyVmFsdWUgPSByYW5kb21OdW1iZXIgKiA1MDAwO1xyXG5cclxuICAgIGNvbnN0IGV4cGlyZURhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgLy8gVGjDqm0gMzAgbmfDoHkgdsOgbyBuZ8OgeSBoaeG7h24gdOG6oWkgxJHhu4MgdOG6oW8gZXhwaXJlIGRhdGVcclxuICAgIGV4cGlyZURhdGUuc2V0RGF0ZShleHBpcmVEYXRlLmdldERhdGUoKSArIDMwKTtcclxuXHJcbiAgICBjb25zdCBjb2RlID0gZ2VuZXJhdGVDb2RlKCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGlzY291bnQ6IHZvdWNoZXJWYWx1ZSxcclxuICAgICAgZXhwaXJlOiBleHBpcmVEYXRlLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgIGNvZGU6IGNvZGVcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlQ29kZSgpIHtcclxuICAgIC8vIFThuqFvIG3hu5l0IG3DoyBjb2RlIG5n4bqrdSBuaGnDqm4sIHbDrSBk4bulOiBBQkNEMTIzNFxyXG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjEyMzQ1Njc4OTAnO1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgIGNvZGUgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVycy5sZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlO1xyXG4gIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGFzeW5jIGdldEFsbFZvdWNoZXIocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB2b3VjaGVyTGlzdD0gYXdhaXQgZGIudm91Y2hlci5maW5kQWxsKHtcclxuICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCBkYXRhOiB2b3VjaGVyTGlzdH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY3JlYXRlVm91Y2hlcihyZXEsIHJlcykge1xyXG4gICAgICAgIGF3YWl0IGRiLnZvdWNoZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgLi4ucmVxLmJvZHlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWV9KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbGV0ZVZvdWNoZXIocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB7dm91Y2hlcklkIH09IHJlcS5ib2R5XHJcbiAgICAgICAgYXdhaXQgZGIudm91Y2hlci5kZXN0cm95KHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgIGlkOiB2b3VjaGVySWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWV9KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRldGFpbFZvdWNoZXIocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB7dm91Y2hlcklkIH09IHJlcS5xdWVyeVxyXG4gICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnZvdWNoZXIuZmluZE9uZSh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogdm91Y2hlcklkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWUsIGRhdGF9KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGFwcGx5Vm91Y2hlcihyZXEsIHJlcykge1xyXG4gICAgICAgIGNvbnN0IHt1aWQgfT0gcmVxLnVzZXJcclxuICAgICAgICBjb25zdCB7Y29kZSB9PSByZXEuYm9keVxyXG4gICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnZvdWNoZXIuZmluZE9uZSh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YTE9IGF3YWl0IGRiLnZvdWNoZXJjdXN0b21lci5maW5kT25lKHt3aGVyZToge3ZvdWNoZXJJZDogZGF0YS5pZCwgY3VzdG9tZXJJZDogdWlkfX0pXHJcbiAgICAgICAgICAgIGlmKGRhdGExLmlzX3VzZT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IGZhbHNlLCB1c2VkOiB0cnVlfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCBkYXRhOiB7aWQ6IGRhdGEuaWR9fSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IGZhbHNlLCBkYXRhfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY3JlYXRlU2NoZWR1bGUocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB7ZGF0ZV9zdGFydCwgZGF0ZV9lbmQsIGFtb3VudF92b3VjaGVyIH09IHJlcS5ib2R5XHJcbiAgICAgICAgY29uc3Qgdm91Y2hlcnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnNlSW50KGFtb3VudF92b3VjaGVyKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZvdWNoZXIgPSBnZW5lcmF0ZVZvdWNoZXIoKTtcclxuICAgICAgICAgICAgdm91Y2hlcnMucHVzaCh2b3VjaGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBkYi52b3VjaGVyLmJ1bGtDcmVhdGUodm91Y2hlcnMpXHJcbiAgICAgICAgZGIudm91Y2hlcnNjaGVkdWxlLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGRhdGVfc3RhcnQsIGRhdGVfZW5kLCBhbW91bnRfdm91Y2hlclxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0U2NoZWR1bGUocmVxLCByZXMpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBkYXRhPSBhd2FpdCBkYi52b3VjaGVyc2NoZWR1bGUuZmluZE9uZSgpXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YX0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0Vm91Y2hlckh1dGluZyhyZXEsIHJlcykge1xyXG4gICAgICAgIGNvbnN0IGRhdGExPSBhd2FpdCBkYi52b3VjaGVyc2NoZWR1bGUuZmluZE9uZSgpXHJcbiAgICAgICAgY29uc3QgZGF0YT0gYXdhaXQgZGIudm91Y2hlci5maW5kQWxsKHtcclxuICAgICAgICAgICAgb3JkZXI6IFNlcXVlbGl6ZS5saXRlcmFsKCdSQU5EKCknKSxcclxuICAgICAgICAgICAgbGltaXQ6IGRhdGExPy5hbW91bnRfdm91Y2hlciB8fCAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCBkYXRhfSlcclxuICAgIH1cclxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUFvQyxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYs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