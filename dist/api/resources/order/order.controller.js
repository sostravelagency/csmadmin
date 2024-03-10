"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _models = require("../../../models");
var Sequelize = require("sequelize");
var _default = {
  index: function index(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, customerId, paymentmethod, orderId, deliveryAddress, product, grandTotal, voucherId, deliveryCharge, reason;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, customerId = _req$body.customerId, paymentmethod = _req$body.paymentmethod, orderId = _req$body.orderId, deliveryAddress = _req$body.deliveryAddress, product = _req$body.product, grandTotal = _req$body.grandTotal, voucherId = _req$body.voucherId, deliveryCharge = _req$body.deliveryCharge, reason = _req$body.reason;
            console.log(voucherId);
            _models.db.customer.findOne({
              where: {
                id: customerId
              }
            }).then(function (p) {
              if (p) {
                return _models.db.Order.create({
                  custId: customerId,
                  number: orderId,
                  grandtotal: grandTotal,
                  paymentmethod: paymentmethod,
                  voucherId: voucherId || 0,
                  deliveryFee: deliveryCharge,
                  reason: reason || ""
                });
              }
              return res.status(500).json({
                'errors': ['User is not found']
              });
            }).then(function (order) {
              if (order) {
                return _models.db.Address.create({
                  orderId: order.id,
                  custId: customerId,
                  fullname: deliveryAddress ? deliveryAddress.name : '',
                  phone: deliveryAddress ? deliveryAddress.phone : '',
                  discrict: deliveryAddress ? deliveryAddress.discrict : '',
                  city: deliveryAddress ? deliveryAddress.city : '',
                  states: deliveryAddress ? deliveryAddress.states : '',
                  shipping: deliveryAddress ? deliveryAddress.address : ''
                }).then(function (p) {
                  return [order, p];
                });
              }
            }).then(function (_ref) {
              var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                order = _ref2[0],
                p = _ref2[1];
              if (order) {
                var cartEntries = [];
                for (var i = 0; i < product.length; i++) {
                  cartEntries.push({
                    orderId: order.id,
                    addressId: p.id,
                    productId: product[i].id,
                    name: product[i].name,
                    qty: product[i].qty,
                    price: product[i].price,
                    total: product[i].total,
                    photo: product[i].photo,
                    discount: product[i].discountPer
                  });
                }
                return _models.db.Cart.bulkCreate(cartEntries).then(function (r) {
                  return [r];
                });
              }
            }).then(function (success) {
              _mailer["default"].sendUserOrder((deliveryAddress === null || deliveryAddress === void 0 ? void 0 : deliveryAddress.email) || "", "You have ordered successfully, ordered at " + new Date());
              res.status(200).json({
                'success': true
              });
            })["catch"](function (err) {
              _mailer["default"].sendUserOrder((deliveryAddress === null || deliveryAddress === void 0 ? void 0 : deliveryAddress.email) || "", "You have ordered failed, ordered at " + new Date());
              console.log(err);
              res.status(500).json({
                'errors': ['Error adding cart']
              });
            });
            _context.next = 9;
            break;
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw new RequestError('Error');
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }))();
  },
  getAllOrderList: function getAllOrderList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var limit, sort, offset, page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            limit = 10;
            sort = ['createdAt', 'DESC'];
            offset = 0;
            page = 1;
            if (req.query.limit != undefined) {
              limit = parseInt(req.query.limit);
            }
            if (req.query.page != undefined) {
              page = req.query.page;
              if (page < 1) page = 1;
            }
            if (req.query.sort) {
              if (req.query.sort == 'name') {
                sort = ['name'];
              }
            }
            try {
              _models.db.Order.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                  model: _models.db.Address
                }, {
                  model: _models.db.Cart
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  order: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  statusUpdate: function statusUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body2, id, status, deliverydate;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            try {
              _req$body2 = req.body, id = _req$body2.id, status = _req$body2.status, deliverydate = _req$body2.deliverydate;
              _models.db.Order.findOne({
                where: {
                  id: id
                }
              }).then(function (list) {
                var _req$body3, _req$body6, _req$body9, _req$body12;
                if (((_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.status) === "delieverd") {
                  var _req$body4, _req$body5;
                  _mailer["default"].sendUserOrder(((_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.email) || "", "Your #ORDER-".concat(list.number, " have delivered successfully, delivered at ") + ((_req$body5 = req.body) === null || _req$body5 === void 0 ? void 0 : _req$body5.deliverydate));
                }
                if (((_req$body6 = req.body) === null || _req$body6 === void 0 ? void 0 : _req$body6.status) === "processing") {
                  var _req$body7, _req$body8;
                  _mailer["default"].sendUserOrder(((_req$body7 = req.body) === null || _req$body7 === void 0 ? void 0 : _req$body7.email) || "", "Your #ORDER-".concat(list.number, " is processing, delivered at ") + ((_req$body8 = req.body) === null || _req$body8 === void 0 ? void 0 : _req$body8.deliverydate));
                }
                if (((_req$body9 = req.body) === null || _req$body9 === void 0 ? void 0 : _req$body9.status) === "shipping") {
                  var _req$body10, _req$body11;
                  _mailer["default"].sendUserOrder(((_req$body10 = req.body) === null || _req$body10 === void 0 ? void 0 : _req$body10.email) || "", "Your #ORDER-".concat(list.number, " is shipping, shipping at ") + ((_req$body11 = req.body) === null || _req$body11 === void 0 ? void 0 : _req$body11.deliverydate));
                }
                if (((_req$body12 = req.body) === null || _req$body12 === void 0 ? void 0 : _req$body12.status) === "cancel") {
                  var _req$body13, _req$body14, _req$body15;
                  _mailer["default"].sendUserOrder(((_req$body13 = req.body) === null || _req$body13 === void 0 ? void 0 : _req$body13.email) || "", "Your #ORDER-".concat(list.number, " is canceled, reason: ").concat(((_req$body14 = req.body) === null || _req$body14 === void 0 ? void 0 : _req$body14.reason) || "", ", cancel at ") + ((_req$body15 = req.body) === null || _req$body15 === void 0 ? void 0 : _req$body15.deliverydate));
                }
                return _models.db.Order.update({
                  status: status,
                  deliverydate: deliverydate ? deliverydate : list.deliverydate,
                  reason: req.body.reason || ""
                }, {
                  where: {
                    id: id
                  }
                });
              }).then(function (success) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully Updated Status"
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  getAllOrderListById: function getAllOrderListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            try {
              _models.db.Order.findAll({
                where: {
                  custId: req.body.id
                },
                order: [['createdAt', 'DESC']],
                include: [{
                  model: _models.db.Address,
                  include: [{
                    model: _models.db.Cart,
                    include: [{
                      model: _models.db.product
                    }]
                  }]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  order: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getAllOrderStatus: function getAllOrderStatus(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            try {
              _models.db.Order.findAll({
                where: {
                  status: req.body.status
                },
                order: [['createdAt', 'DESC']],
                include: [{
                  model: _models.db.Address,
                  include: [{
                    model: _models.db.Cart
                  }]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  order: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  getAllOrderCount: function getAllOrderCount(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            try {
              _models.db.Order.findAll({
                attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'total']],
                group: ['status']
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbWFpbGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfbW9kZWxzIiwiU2VxdWVsaXplIiwiX2RlZmF1bHQiLCJpbmRleCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwiY3VzdG9tZXJJZCIsInBheW1lbnRtZXRob2QiLCJvcmRlcklkIiwiZGVsaXZlcnlBZGRyZXNzIiwicHJvZHVjdCIsImdyYW5kVG90YWwiLCJ2b3VjaGVySWQiLCJkZWxpdmVyeUNoYXJnZSIsInJlYXNvbiIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJib2R5IiwiY29uc29sZSIsImxvZyIsImRiIiwiY3VzdG9tZXIiLCJmaW5kT25lIiwid2hlcmUiLCJpZCIsInRoZW4iLCJwIiwiT3JkZXIiLCJjcmVhdGUiLCJjdXN0SWQiLCJudW1iZXIiLCJncmFuZHRvdGFsIiwiZGVsaXZlcnlGZWUiLCJzdGF0dXMiLCJqc29uIiwib3JkZXIiLCJBZGRyZXNzIiwiZnVsbG5hbWUiLCJuYW1lIiwicGhvbmUiLCJkaXNjcmljdCIsImNpdHkiLCJzdGF0ZXMiLCJzaGlwcGluZyIsImFkZHJlc3MiLCJfcmVmIiwiX3JlZjIiLCJfc2xpY2VkVG9BcnJheTIiLCJjYXJ0RW50cmllcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYWRkcmVzc0lkIiwicHJvZHVjdElkIiwicXR5IiwicHJpY2UiLCJ0b3RhbCIsInBob3RvIiwiZGlzY291bnQiLCJkaXNjb3VudFBlciIsIkNhcnQiLCJidWxrQ3JlYXRlIiwiciIsInN1Y2Nlc3MiLCJtYWlsZXIiLCJzZW5kVXNlck9yZGVyIiwiZW1haWwiLCJEYXRlIiwiZXJyIiwidDAiLCJSZXF1ZXN0RXJyb3IiLCJzdG9wIiwiZ2V0QWxsT3JkZXJMaXN0IiwiX2NhbGxlZTIiLCJsaW1pdCIsInNvcnQiLCJvZmZzZXQiLCJwYWdlIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwicXVlcnkiLCJ1bmRlZmluZWQiLCJwYXJzZUludCIsImZpbmRBbGwiLCJpbmNsdWRlIiwibW9kZWwiLCJsaXN0Iiwic3RhdHVzVXBkYXRlIiwiX2NhbGxlZTMiLCJfcmVxJGJvZHkyIiwiZGVsaXZlcnlkYXRlIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX3JlcSRib2R5MyIsIl9yZXEkYm9keTYiLCJfcmVxJGJvZHk5IiwiX3JlcSRib2R5MTIiLCJfcmVxJGJvZHk0IiwiX3JlcSRib2R5NSIsImNvbmNhdCIsIl9yZXEkYm9keTciLCJfcmVxJGJvZHk4IiwiX3JlcSRib2R5MTAiLCJfcmVxJGJvZHkxMSIsIl9yZXEkYm9keTEzIiwiX3JlcSRib2R5MTQiLCJfcmVxJGJvZHkxNSIsInVwZGF0ZSIsIm1zZyIsImdldEFsbE9yZGVyTGlzdEJ5SWQiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImdldEFsbE9yZGVyU3RhdHVzIiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJnZXRBbGxPcmRlckNvdW50IiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJhdHRyaWJ1dGVzIiwiZm4iLCJjb2wiLCJncm91cCIsImRhdGEiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvb3JkZXIvb3JkZXIuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFpbGVyIGZyb20gJy4uLy4uLy4uL21haWxlcic7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcclxudmFyIFNlcXVlbGl6ZSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgICBhc3luYyBpbmRleChyZXEsIHJlcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY3VzdG9tZXJJZCwgcGF5bWVudG1ldGhvZCwgb3JkZXJJZCwgZGVsaXZlcnlBZGRyZXNzLCBwcm9kdWN0LCBncmFuZFRvdGFsLCB2b3VjaGVySWQsIGRlbGl2ZXJ5Q2hhcmdlLCByZWFzb24gfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2b3VjaGVySWQpXHJcbiAgICAgICAgICAgIGRiLmN1c3RvbWVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogY3VzdG9tZXJJZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuT3JkZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RJZDogY3VzdG9tZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcjogb3JkZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYW5kdG90YWw6IGdyYW5kVG90YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXltZW50bWV0aG9kOiBwYXltZW50bWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm91Y2hlcklkOiB2b3VjaGVySWQgfHwgMCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeUZlZTogZGVsaXZlcnlDaGFyZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzb246IHJlYXNvbiB8fCBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdlcnJvcnMnOiBbJ1VzZXIgaXMgbm90IGZvdW5kJ10gfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG9yZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5BZGRyZXNzLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcklkOiBvcmRlci5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RJZDogY3VzdG9tZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxuYW1lOiBkZWxpdmVyeUFkZHJlc3M/ZGVsaXZlcnlBZGRyZXNzLm5hbWU6JycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogZGVsaXZlcnlBZGRyZXNzP2RlbGl2ZXJ5QWRkcmVzcy5waG9uZTonJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NyaWN0OiBkZWxpdmVyeUFkZHJlc3M/ZGVsaXZlcnlBZGRyZXNzLmRpc2NyaWN0OicnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eTogZGVsaXZlcnlBZGRyZXNzP2RlbGl2ZXJ5QWRkcmVzcy5jaXR5OicnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVzOiBkZWxpdmVyeUFkZHJlc3M/ZGVsaXZlcnlBZGRyZXNzLnN0YXRlczonJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBwaW5nOiBkZWxpdmVyeUFkZHJlc3M/ZGVsaXZlcnlBZGRyZXNzLmFkZHJlc3M6JycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHApID0+IFtvcmRlciwgcF0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChbb3JkZXIsIHBdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXJ0RW50cmllcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcnRFbnRyaWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVySWQ6IG9yZGVyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJZDogcC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RbaV0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvZHVjdFtpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF0eTogcHJvZHVjdFtpXS5xdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHByb2R1Y3RbaV0ucHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IHByb2R1Y3RbaV0udG90YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG86IHByb2R1Y3RbaV0ucGhvdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY291bnQ6IHByb2R1Y3RbaV0uZGlzY291bnRQZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLkNhcnQuYnVsa0NyZWF0ZShjYXJ0RW50cmllcykudGhlbigocikgPT4gW3JdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kVXNlck9yZGVyKGRlbGl2ZXJ5QWRkcmVzcz8uZW1haWwgfHxcIlwiLCBcIllvdSBoYXZlIG9yZGVyZWQgc3VjY2Vzc2Z1bGx5LCBvcmRlcmVkIGF0IFwiKyBuZXcgRGF0ZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRVc2VyT3JkZXIoZGVsaXZlcnlBZGRyZXNzPy5lbWFpbCB8fFwiXCIsIFwiWW91IGhhdmUgb3JkZXJlZCBmYWlsZWQsIG9yZGVyZWQgYXQgXCIrIG5ldyBEYXRlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTsgICBcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdlcnJvcnMnOiBbJ0Vycm9yIGFkZGluZyBjYXJ0J10gfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0QWxsT3JkZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgbGV0IGxpbWl0ID0gMTA7XHJcbiAgICAgICAgbGV0IHNvcnQgPSBbJ2NyZWF0ZWRBdCcsICdERVNDJ107XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSAxO1xyXG4gICAgICAgIGlmKHJlcS5xdWVyeS5saW1pdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsaW1pdCA9IHBhcnNlSW50KHJlcS5xdWVyeS5saW1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJlcS5xdWVyeS5wYWdlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHBhZ2UgPSByZXEucXVlcnkucGFnZTtcclxuICAgICAgICAgICAgaWYocGFnZSA8IDEpXHJcbiAgICAgICAgICAgICAgICBwYWdlID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVxLnF1ZXJ5LnNvcnQpe1xyXG4gICAgICAgICAgICBpZihyZXEucXVlcnkuc29ydCA9PSAnbmFtZScpe1xyXG4gICAgICAgICAgICAgICAgc29ydCA9IFsnbmFtZSddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYi5PcmRlci5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5BZGRyZXNzIH0sIHsgbW9kZWw6IGRiLkNhcnQgfV0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgb3JkZXI6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBzdGF0dXNVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGlkLCBzdGF0dXMsIGRlbGl2ZXJ5ZGF0ZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLk9yZGVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVxLmJvZHk/LnN0YXR1cz09PSBcImRlbGlldmVyZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kVXNlck9yZGVyKHJlcS5ib2R5Py5lbWFpbCB8fFwiXCIsIGBZb3VyICNPUkRFUi0ke2xpc3QubnVtYmVyfSBoYXZlIGRlbGl2ZXJlZCBzdWNjZXNzZnVsbHksIGRlbGl2ZXJlZCBhdCBgKyByZXEuYm9keT8uZGVsaXZlcnlkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihyZXEuYm9keT8uc3RhdHVzPT09IFwicHJvY2Vzc2luZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kVXNlck9yZGVyKHJlcS5ib2R5Py5lbWFpbCB8fFwiXCIsIGBZb3VyICNPUkRFUi0ke2xpc3QubnVtYmVyfSBpcyBwcm9jZXNzaW5nLCBkZWxpdmVyZWQgYXQgYCsgcmVxLmJvZHk/LmRlbGl2ZXJ5ZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVxLmJvZHk/LnN0YXR1cz09PSBcInNoaXBwaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRVc2VyT3JkZXIocmVxLmJvZHk/LmVtYWlsIHx8XCJcIiwgYFlvdXIgI09SREVSLSR7bGlzdC5udW1iZXJ9IGlzIHNoaXBwaW5nLCBzaGlwcGluZyBhdCBgKyByZXEuYm9keT8uZGVsaXZlcnlkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihyZXEuYm9keT8uc3RhdHVzPT09IFwiY2FuY2VsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRVc2VyT3JkZXIocmVxLmJvZHk/LmVtYWlsIHx8XCJcIiwgYFlvdXIgI09SREVSLSR7bGlzdC5udW1iZXJ9IGlzIGNhbmNlbGVkLCByZWFzb246ICR7cmVxLmJvZHk/LnJlYXNvbiB8fCBcIlwifSwgY2FuY2VsIGF0IGArIHJlcS5ib2R5Py5kZWxpdmVyeWRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5PcmRlci51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZlcnlkYXRlOiBkZWxpdmVyeWRhdGUgPyBkZWxpdmVyeWRhdGUgOiBsaXN0LmRlbGl2ZXJ5ZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhc29uOiByZXEuYm9keS5yZWFzb24gfHwgXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWQgU3RhdHVzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRBbGxPcmRlckxpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuT3JkZXIuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjdXN0SWQ6IHJlcS5ib2R5LmlkIH0sXHJcbiAgICAgICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcywgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkNhcnQsIGluY2x1ZGU6IFt7bW9kZWw6IGRiLnByb2R1Y3R9XSB9XSB9XSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBvcmRlcjogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnZXJyb3JzJzogXCJcIiArIGVyciB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0QWxsT3JkZXJTdGF0dXMocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5PcmRlci5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHN0YXR1czogcmVxLmJvZHkuc3RhdHVzIH0sXHJcbiAgICAgICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcywgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkNhcnQgfV0gfV0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgb3JkZXI6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldEFsbE9yZGVyQ291bnQocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5PcmRlci5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFsnc3RhdHVzJywgW1NlcXVlbGl6ZS5mbignQ09VTlQnLCBTZXF1ZWxpemUuY29sKCdzdGF0dXMnKSksICd0b3RhbCddXSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBbJ3N0YXR1cyddXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnZXJyb3JzJzogXCJcIiArIGVyciB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59XHJcblxyXG5cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBSUUsU0FBUyxHQUFHRixPQUFPLENBQUMsV0FBVyxDQUFDO0FBQUMsSUFBQUcsUUFBQSxHQUN0QjtFQUVMQyxLQUFLLFdBQUFBLE1BQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsU0FBQSxFQUFBQyxVQUFBLEVBQUFDLGFBQUEsRUFBQUMsT0FBQSxFQUFBQyxlQUFBLEVBQUFDLE9BQUEsRUFBQUMsVUFBQSxFQUFBQyxTQUFBLEVBQUFDLGNBQUEsRUFBQUMsTUFBQTtNQUFBLE9BQUFaLFlBQUEsWUFBQWEsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7VUFBQTtZQUFBRixRQUFBLENBQUFDLElBQUE7WUFBQWIsU0FBQSxHQUUwR04sR0FB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