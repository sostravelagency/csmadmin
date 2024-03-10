"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _razorpay = _interopRequireDefault(require("razorpay"));
var _default = {
  orderDetails: function orderDetails(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var instance, _req$body, order_id, amount, payment_capture, currency, options, order;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            instance = new _razorpay["default"]({
              key_id: 'rzp_live_VHO6uZelazZ0VR',
              key_secret: 'QoeuInxjN8I5EDJ46O4fsPHz'
              // key_id: 'rzp_test_gJ29s3lexhVYEm',
              // key_secret: 'PzSyLipuA0yMPjWLy4a8QgzV',
            });
            _req$body = req.body, order_id = _req$body.order_id, amount = _req$body.amount, payment_capture = _req$body.payment_capture, currency = _req$body.currency;
            _context.prev = 2;
            options = {
              amount: amount * 100,
              // amount in smallest currency unit
              currency: currency,
              receipt: order_id,
              payment_capture: payment_capture
            };
            _context.next = 6;
            return instance.orders.create(options);
          case 6:
            order = _context.sent;
            if (order) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", res.status(500).send("Some error occured"));
          case 9:
            res.status(200).json({
              'success': true,
              data: order
            });
            _context.next = 15;
            break;
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.status(500).json({
              message: "Something error's"
            }));
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 12]]);
    }))();
  },
  // async paymentSuccess(req, res, next) {
  //     try {
  //         const secret = '12345678'
  //         const crypto = require('crypto')
  //         const shasum = crypto.createHmac('sha256', secret)
  //         shasum.update(JSON.stringify(req.body))
  //         const digest = shasum.digest('hex')
  //         if (digest === req.headers['x-razorpay-signature']) {
  //             // process it
  //             let value = req.body.payload.payment.entity;
  //             return db.payment.create({
  //                 paymentId: value.id,
  //                 currency: value.currency,
  //                 status: value.status,
  //                 amount: (value.amount)/100,
  //                 order_id: value.order_id,
  //                 method: value.method,
  //             })
  //             .then(payment=>{
  //                 res.status(200).json({ 'success': true });     
  //             })
  //         } else {
  //             // pass it
  //         }
  //         res.json({ status: 'ok'})
  //     }
  //     catch (err) {
  //         return res.status(500).json({
  //             message: "Something error's"
  //         })
  //     }
  // },
  findOrderList: function findOrderList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var instance, _req$body2, orderCreationId, razorpayPaymentId, razorpayOrderId, custId;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            instance = new _razorpay["default"]({
              key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_VHO6uZelazZ0VR',
              key_secret: process.env.RAZORPAY_SECRET || 'QoeuInxjN8I5EDJ46O4fsPHz'
            });
            _context2.prev = 1;
            _req$body2 = req.body, orderCreationId = _req$body2.orderCreationId, razorpayPaymentId = _req$body2.razorpayPaymentId, razorpayOrderId = _req$body2.razorpayOrderId, custId = _req$body2.custId; // console.log(req.body)
            _context2.next = 5;
            return instance.payments.fetch(razorpayPaymentId).then(function (order) {
              console.log("---order---", order);
              if (order) {
                return _models.db.payment.create({
                  custId: custId,
                  amount: order.amount / 100,
                  orderCreationId: orderCreationId,
                  razorpayPaymentId: razorpayPaymentId,
                  razorpayOrderId: razorpayOrderId,
                  currency: order.currency,
                  status: order.status,
                  method: order.method
                }).then(function (r) {
                  return [order, r];
                });
              }
            }).then(function (_ref) {
              var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                order = _ref2[0],
                r = _ref2[1];
              res.status(200).json({
                success: true,
                data: order
              });
            });
          case 5:
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(500).json({
              message: "Something error's"
            }));
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 7]]);
    }))();
  },
  getAllPayment: function getAllPayment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _models.db.payment.findAll({
              include: [{
                model: _models.db.customer
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
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
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9yYXpvcnBheSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfZGVmYXVsdCIsIm9yZGVyRGV0YWlscyIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsImluc3RhbmNlIiwiX3JlcSRib2R5Iiwib3JkZXJfaWQiLCJhbW91bnQiLCJwYXltZW50X2NhcHR1cmUiLCJjdXJyZW5jeSIsIm9wdGlvbnMiLCJvcmRlciIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIlJhem9ycGF5Iiwia2V5X2lkIiwia2V5X3NlY3JldCIsImJvZHkiLCJyZWNlaXB0Iiwib3JkZXJzIiwiY3JlYXRlIiwic2VudCIsImFicnVwdCIsInN0YXR1cyIsInNlbmQiLCJqc29uIiwiZGF0YSIsInQwIiwibWVzc2FnZSIsInN0b3AiLCJmaW5kT3JkZXJMaXN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkyIiwib3JkZXJDcmVhdGlvbklkIiwicmF6b3JwYXlQYXltZW50SWQiLCJyYXpvcnBheU9yZGVySWQiLCJjdXN0SWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcm9jZXNzIiwiZW52IiwiUkFaT1JQQVlfS0VZX0lEIiwiUkFaT1JQQVlfU0VDUkVUIiwicGF5bWVudHMiLCJmZXRjaCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZGIiLCJwYXltZW50IiwibWV0aG9kIiwiciIsIl9yZWYiLCJfcmVmMiIsIl9zbGljZWRUb0FycmF5MiIsInN1Y2Nlc3MiLCJnZXRBbGxQYXltZW50IiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kQWxsIiwiaW5jbHVkZSIsIm1vZGVsIiwiY3VzdG9tZXIiLCJsaXN0IiwiZXJyIiwiUmVxdWVzdEVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3BheW1lbnQvcGF5bWVudC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcclxuaW1wb3J0IFJhem9ycGF5IGZyb20gJ3Jhem9ycGF5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cclxuICAgIGFzeW5jIG9yZGVyRGV0YWlscyhyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFJhem9ycGF5KHtcclxuICAgICAgICAgICAga2V5X2lkOiAgJ3J6cF9saXZlX1ZITzZ1WmVsYXpaMFZSJyxcclxuICAgICAgICAgICAga2V5X3NlY3JldDogJ1FvZXVJbnhqTjhJNUVESjQ2TzRmc1BIeicsXHJcbiAgICAgICAgICAgIC8vIGtleV9pZDogJ3J6cF90ZXN0X2dKMjlzM2xleGhWWUVtJyxcclxuICAgICAgICAgICAgLy8ga2V5X3NlY3JldDogJ1B6U3lMaXB1QTB5TVBqV0x5NGE4UWd6VicsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB7IG9yZGVyX2lkLCBhbW91bnQsIHBheW1lbnRfY2FwdHVyZSwgY3VycmVuY3kgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQgKiAxMDAsIC8vIGFtb3VudCBpbiBzbWFsbGVzdCBjdXJyZW5jeSB1bml0XHJcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogY3VycmVuY3ksXHJcbiAgICAgICAgICAgICAgICByZWNlaXB0OiBvcmRlcl9pZCxcclxuICAgICAgICAgICAgICAgIHBheW1lbnRfY2FwdHVyZTogcGF5bWVudF9jYXB0dXJlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvcmRlciA9IGF3YWl0IGluc3RhbmNlLm9yZGVycy5jcmVhdGUob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmICghb3JkZXIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlNvbWUgZXJyb3Igb2NjdXJlZFwiKTtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IG9yZGVyIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNvbWV0aGluZyBlcnJvcidzXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGFzeW5jIHBheW1lbnRTdWNjZXNzKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAvLyAgICAgdHJ5IHtcclxuICAgIC8vICAgICAgICAgY29uc3Qgc2VjcmV0ID0gJzEyMzQ1Njc4J1xyXG4gICAgLy8gICAgICAgICBjb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKVxyXG4gICAgLy8gICAgICAgICBjb25zdCBzaGFzdW0gPSBjcnlwdG8uY3JlYXRlSG1hYygnc2hhMjU2Jywgc2VjcmV0KVxyXG4gICAgLy8gICAgICAgICBzaGFzdW0udXBkYXRlKEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSlcclxuICAgIC8vICAgICAgICAgY29uc3QgZGlnZXN0ID0gc2hhc3VtLmRpZ2VzdCgnaGV4JylcclxuICAgIC8vICAgICAgICAgaWYgKGRpZ2VzdCA9PT0gcmVxLmhlYWRlcnNbJ3gtcmF6b3JwYXktc2lnbmF0dXJlJ10pIHtcclxuICAgIC8vICAgICAgICAgICAgIC8vIHByb2Nlc3MgaXRcclxuICAgIC8vICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJlcS5ib2R5LnBheWxvYWQucGF5bWVudC5lbnRpdHk7XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gZGIucGF5bWVudC5jcmVhdGUoe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHBheW1lbnRJZDogdmFsdWUuaWQsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY3VycmVuY3k6IHZhbHVlLmN1cnJlbmN5LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHN0YXR1czogdmFsdWUuc3RhdHVzLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGFtb3VudDogKHZhbHVlLmFtb3VudCkvMTAwLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIG9yZGVyX2lkOiB2YWx1ZS5vcmRlcl9pZCxcclxuICAgIC8vICAgICAgICAgICAgICAgICBtZXRob2Q6IHZhbHVlLm1ldGhvZCxcclxuICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgICAgICAudGhlbihwYXltZW50PT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUgfSk7ICAgICBcclxuICAgIC8vICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gcGFzcyBpdFxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHJlcy5qc29uKHsgc3RhdHVzOiAnb2snfSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgLy8gICAgICAgICAgICAgbWVzc2FnZTogXCJTb21ldGhpbmcgZXJyb3Inc1wiXHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSxcclxuXHJcbiAgICBhc3luYyBmaW5kT3JkZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUmF6b3JwYXkoe1xyXG4gICAgICAgICAgICBrZXlfaWQ6IHByb2Nlc3MuZW52LlJBWk9SUEFZX0tFWV9JRCB8fCAncnpwX2xpdmVfVkhPNnVaZWxhelowVlInLFxyXG4gICAgICAgICAgICBrZXlfc2VjcmV0OiBwcm9jZXNzLmVudi5SQVpPUlBBWV9TRUNSRVQgfHwgJ1FvZXVJbnhqTjhJNUVESjQ2TzRmc1BIeicsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHsgb3JkZXJDcmVhdGlvbklkLCByYXpvcnBheVBheW1lbnRJZCwgcmF6b3JwYXlPcmRlcklkLCBjdXN0SWQgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXEuYm9keSlcclxuICAgICAgICAgICAgYXdhaXQgaW5zdGFuY2UucGF5bWVudHMuZmV0Y2gocmF6b3JwYXlQYXltZW50SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihvcmRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS1vcmRlci0tLVwiLCBvcmRlcilcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnBheW1lbnQuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RJZDogY3VzdElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBvcmRlci5hbW91bnQgLyAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlckNyZWF0aW9uSWQ6IG9yZGVyQ3JlYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhem9ycGF5UGF5bWVudElkOiByYXpvcnBheVBheW1lbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhem9ycGF5T3JkZXJJZDogcmF6b3JwYXlPcmRlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IG9yZGVyLmN1cnJlbmN5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBvcmRlci5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG9yZGVyLm1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyID0+IFtvcmRlciwgcl0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChbb3JkZXIsIHJdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBvcmRlciB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIGVycm9yJ3NcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0QWxsUGF5bWVudChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLnBheW1lbnQuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY3VzdG9tZXIgfV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxufVxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLFNBQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUErQixJQUFBRyxRQUFBLEdBRWhCO0VBRUxDLFlBQVksV0FBQUEsYUFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQUMsUUFBQTtNQUFBLElBQUFDLFFBQUEsRUFBQUMsU0FBQSxFQUFBQyxRQUFBLEVBQUFDLE1BQUEsRUFBQUMsZUFBQSxFQUFBQyxRQUFBLEVBQUFDLE9BQUEsRUFBQUMsS0FBQTtNQUFBLE9BQUFWLFlBQUEsWUFBQVcsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFmLElBQUE7VUFBQTtZQUN6QkssUUFBUSxHQUFHLElBQUlZLG9CQUFRLENBQUM7Y0FDMUJDLE1BQU0sRUFBRyx5QkFBeUI7Y0FDbENDLFVBQVUsRUFBRTtjQUNaO2NBQ0E7WUFDSixDQUFDLENBQUM7WUFBQWIsU0FBQSxHQUVvRFIsR0FBRyxDQUFDc0IsSUFBSSxFQUF4RGIsUUFBUSxHQUFBRCxTQUFBLENBQVJDLFFBQVEsRUFBRUMsTUFBTSxHQUFBRixTQUFBLENBQU5FLE1BQU0sRUFBRUMsZUFBZSxHQUFBSCxTQUFBLENBQWZHLGVBQWUsRUFBRUMsUUFBUSxHQUFBSixTQUFBLENBQVJJLFFBQVE7WUFBQUssUUFBQSxDQUFBQyxJQUFBO1lBR3ZDTCxPQUFPLEdBQUc7Y0FDWkgsTUFBTSxFQUFFQSxNQUFNLEdBQUcsR0FBRztjQUFFO2NBQ3RCRSxRQUFRLEVBQUVBLFFBQVE7Y0FDbEJXLE9BQU8sRUFBRWQsUUFBUTtjQUNqQkUsZUFBZSxFQUFFQTtZQUNyQixDQUFDO1lBQUFNLFFBQUEsQ0FBQWYsSUFBQTtZQUFBLE9BRW1CSyxRQUFRLENBQUNpQixNQUFNLENBQUNDLE1BQU0sQ0FBQ1osT0FBTyxDQUFDO1VBQUE7WUFBN0NDLEtBQUssR0FBQUcsUUFBQSxDQUFBUyxJQUFBO1lBQUEsSUFDTlosS0FBSztjQUFBRyxRQUFBLENBQUFmLElBQUE7Y0FBQTtZQUFBO1lBQUEsT0FBQWUsUUFBQSxDQUFBVSxNQUFBLFdBQVMxQixHQUFHLENBQUMyQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztVQUFBO1lBQzdENUIsR0FBRyxDQUFDMkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDRSxJQUFJLENBQUM7Y0FBRSxTQUFTLEVBQUUsSUFBSTtjQUFFQyxJQUFJLEVBQUVqQjtZQUFNLENBQUMsQ0FBQztZQUFDRyxRQUFBLENBQUFmLElBQUE7WUFBQTtVQUFBO1lBQUFlLFFBQUEsQ0FBQUMsSUFBQTtZQUFBRCxRQUFBLENBQUFlLEVBQUEsR0FBQWYsUUFBQTtZQUFBLE9BQUFBLFFBQUEsQ0FBQVUsTUFBQSxXQUdoRDFCLEdBQUcsQ0FBQzJCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0UsSUFBSSxDQUFDO2NBQ3hCRyxPQUFPLEVBQUU7WUFDYixDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQWhCLFFBQUEsQ0FBQWlCLElBQUE7UUFBQTtNQUFBLEdBQUE1QixPQUFBO0lBQUE7RUFFVixDQUFDO0VBRUQ7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVNNkIsYUFBYSxXQUFBQSxjQUFDbkMsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQStCLFNBQUE7TUFBQSxJQUFBN0IsUUFBQSxFQUFBOEIsVUFBQSxFQUFBQyxlQUFBLEVBQUFDLGlCQUFBLEVBQUFDLGVBQUEsRUFBQUMsTUFBQTtNQUFBLE9BQUFyQyxZQUFBLFlBQUFXLElBQUEsVUFBQTJCLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBekIsSUFBQSxHQUFBeUIsU0FBQSxDQUFBekMsSUFBQTtVQUFBO1lBQzFCSyxRQUFRLEdBQUcsSUFBSVksb0JBQVEsQ0FBQztjQUMxQkMsTUFBTSxFQUFFd0IsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGVBQWUsSUFBSSx5QkFBeUI7Y0FDaEV6QixVQUFVLEVBQUV1QixPQUFPLENBQUNDLEdBQUcsQ0FBQ0UsZUFBZSxJQUFJO1lBQy9DLENBQUMsQ0FBQztZQUFBSixTQUFBLENBQUF6QixJQUFBO1lBQUFtQixVQUFBLEdBRXdFckMsR0FBRyxDQUFDc0IsSUFBSSxFQUF4RWdCLGVBQWUsR0FBQUQsVUFBQSxDQUFmQyxlQUFlLEVBQUVDLGlCQUFpQixHQUFBRixVQUFBLENBQWpCRSxpQkFBaUIsRUFBRUMsZUFBZSxHQUFBSCxVQUFBLENBQWZHLGVBQWUsRUFBRUMsTUFBTSxHQUFBSixVQUFBLENBQU5JLE1BQU0sRUFDakU7WUFBQUUsU0FBQSxDQUFBekMsSUFBQTtZQUFBLE9BQ01LLFFBQVEsQ0FBQ3lDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDVixpQkFBaUIsQ0FBQyxDQUMzQ1csSUFBSSxDQUFDLFVBQUFwQyxLQUFLLEVBQUk7Y0FDWHFDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsRUFBRXRDLEtBQUssQ0FBQztjQUNqQyxJQUFJQSxLQUFLLEVBQUU7Z0JBQ1AsT0FBT3VDLFVBQUUsQ0FBQ0MsT0FBTyxDQUFDN0IsTUFBTSxDQUFDO2tCQUNyQmdCLE1BQU0sRUFBRUEsTUFBTTtrQkFDZC9CLE1BQU0sRUFBRUksS0FBSyxDQUFDSixNQUFNLEdBQUcsR0FBRztrQkFDMUI0QixlQUFlLEVBQUVBLGVBQWU7a0JBQ2hDQyxpQkFBaUIsRUFBRUEsaUJBQWlCO2tCQUNwQ0MsZUFBZSxFQUFFQSxlQUFlO2tCQUNoQzVCLFFBQVEsRUFBRUUsS0FBSyxDQUFDRixRQUFRO2tCQUN4QmdCLE1BQU0sRUFBRWQsS0FBSyxDQUFDYyxNQUFNO2tCQUNwQjJCLE1BQU0sRUFBRXpDLEtBQUssQ0FBQ3lDO2dCQUNsQixDQUFDLENBQUMsQ0FBQ0wsSUFBSSxDQUFDLFVBQUFNLENBQUM7a0JBQUEsT0FBSSxDQUFDMUMsS0FBSyxFQUFFMEMsQ0FBQyxDQUFDO2dCQUFBLEVBQUM7Y0FDNUI7WUFDSixDQUFDLENBQUMsQ0FDRE4sSUFBSSxDQUFDLFVBQUFPLElBQUEsRUFBZ0I7Y0FBQSxJQUFBQyxLQUFBLE9BQUFDLGVBQUEsYUFBQUYsSUFBQTtnQkFBZDNDLEtBQUssR0FBQTRDLEtBQUE7Z0JBQUVGLENBQUMsR0FBQUUsS0FBQTtjQUNaekQsR0FBRyxDQUFDMkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDRSxJQUFJLENBQUM7Z0JBQUU4QixPQUFPLEVBQUUsSUFBSTtnQkFBRTdCLElBQUksRUFBRWpCO2NBQU0sQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQztVQUFBO1lBQUE2QixTQUFBLENBQUF6QyxJQUFBO1lBQUE7VUFBQTtZQUFBeUMsU0FBQSxDQUFBekIsSUFBQTtZQUFBeUIsU0FBQSxDQUFBWCxFQUFBLEdBQUFXLFNBQUE7WUFBQSxPQUFBQSxTQUFBLENBQUFoQixNQUFBLFdBR0MxQixHQUFHLENBQUMyQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNFLElBQUksQ0FBQztjQUN4QkcsT0FBTyxFQUFFO1lBQ2IsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFVLFNBQUEsQ0FBQVQsSUFBQTtRQUFBO01BQUEsR0FBQUUsUUFBQTtJQUFBO0VBRVYsQ0FBQztFQUVLeUIsYUFBYSxXQUFBQSxjQUFDN0QsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXlELFNBQUE7TUFBQSxPQUFBMUQsWUFBQSxZQUFBVyxJQUFBLFVBQUFnRCxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQTlDLElBQUEsR0FBQThDLFNBQUEsQ0FBQTlELElBQUE7VUFBQTtZQUFBOEQsU0FBQSxDQUFBOUMsSUFBQTtZQUU1Qm1DLFVBQUUsQ0FBQ0MsT0FBTyxDQUFDVyxPQUFPLENBQUM7Y0FDZkMsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRWQsVUFBRSxDQUFDZTtjQUFTLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQ0dsQixJQUFJLENBQUMsVUFBQW1CLElBQUksRUFBSTtjQUNWcEUsR0FBRyxDQUFDMkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDRSxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFLElBQUk7Z0JBQUVDLElBQUksRUFBRXNDO2NBQUssQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVUMsR0FBRyxFQUFFO2NBQ2xCcEUsSUFBSSxDQUFDb0UsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUNOLFNBQUEsQ0FBQTlELElBQUE7WUFBQTtVQUFBO1lBQUE4RCxTQUFBLENBQUE5QyxJQUFBO1lBQUE4QyxTQUFBLENBQUFoQyxFQUFBLEdBQUFnQyxTQUFBO1lBQUEsTUFHRCxJQUFJTyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFQLFNBQUEsQ0FBQTlCLElBQUE7UUFBQTtNQUFBLEdBQUE0QixRQUFBO0lBQUE7RUFFdkM7QUFHSixDQUFDO0FBQUFVLE9BQUEsY0FBQTFFLFFBQUEifQ==