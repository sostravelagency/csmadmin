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
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _config = _interopRequireDefault(require("../../../config"));
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _functions = require("./../../../functions");
var _sequelize = require("sequelize");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var JWTSign = function JWTSign(user, date) {
  return _jsonwebtoken["default"].sign({
    // iss: config.app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, process.env.JWT_SECRET);
};
function generateOtp() {
  var token = _speakeasy["default"].totp({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30)
  });
  return token;
}
function verifyOtp(token) {
  var expiry = _speakeasy["default"].totp.verify({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    token: token,
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30),
    window: 0
  });
  return expiry;
}
var _default = {
  addUser: function addUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, firstName, lastName, phone, email, address, password, passwordHash;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, address = _req$body.address, password = _req$body.password;
            passwordHash = _bcryptNodejs["default"].hashSync(password); // var token = generateOtp();
            // var otp = verifyOtp(token);
            _models.db.customer.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (find) {
              if (find) {
                return res.status(409).json("Email is already in use");
              }
              _models.db.customer.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                password: passwordHash
              });
              return res.status(200).json({
                "success": true
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  findUser: function findUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _models.db.customer.findOne({
              where: {
                email: req.query.email
              },
              paranoid: false,
              include: [{
                model: _models.db.Address
              }]
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  login: function login(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body2, email, password, findUser, token;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // var date = new Date();
            _context3.next = 3;
            return _models.db.customer.findOne({
              where: {
                email: email
              }
            });
          case 3:
            findUser = _context3.sent;
            console.log("email", email);
            console.log("findUser", findUser);
            if (!findUser) {
              _context3.next = 12;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            console.log(findUser.dataValues.id);
            return _context3.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              findUser: findUser
            }));
          case 12:
            return _context3.abrupt("return", res.status(200).json({
              success: false
            }));
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  rootUserCheck: function rootUserCheck(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if ((0, _functions.validateEmail)(req.body.email)) {
              _models.db.user.findOne({
                where: {
                  email: req.body.email
                }
              }).then(function (user) {
                if (user) return res.status(200).json({
                  success: true,
                  redirect: false,
                  email: req.body.email
                });
                return res.status(401).json({
                  success: false,
                  redirect: false,
                  msg: "Jankpur Grocerry account with that sign-in information does not exist. Try again or create a new account."
                });
              });
            }
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  sendReset: function sendReset(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var email;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            email = req.body.email;
            _mailer["default"].sendResetPassword(email).then(function (r) {
              return res.status(200).json({
                success: true
              });
            })["catch"](function (err) {
              console.log(err);
              return res.status(500).json({
                errors: ['Error Sending Email!']
              });
            });
          case 2:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  resetPassword: function resetPassword(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _req$body3, email, verificationCode, password;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, verificationCode = _req$body3.verificationCode, password = _req$body3.password;
            _models.db.user.findOne({
              where: {
                email: email,
                verf_key: verificationCode
              }
            }).then(function (result) {
              if (result) {
                var hash = _bcryptNodejs["default"].hashSync(password);
                _models.db.user.update({
                  password: hash,
                  verf_key: null,
                  attempt: 0,
                  isVerify: 1
                }, {
                  where: {
                    email: email
                  }
                });
                return res.status(200).json({
                  success: true
                });
              } else {
                return res.status(500).json({
                  errors: ['Invalid verification code!']
                });
              }
            })["catch"](function (err) {
              console.log(err);
              return res.status(500).json({
                errors: ['Error Updating Password!']
              });
            });
          case 2:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  getAllCustomer: function getAllCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _models.db.customer.findAll().then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  deleteCustomer: function deleteCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _models.db.customer.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (customer) {
              if (customer) {
                return _models.db.customer.destroy({
                  where: {
                    id: customer.id
                  }
                });
              }
              throw new RequestError('Customer is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted Customer Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 7;
            break;
          case 4:
            _context8.prev = 4;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 4]]);
    }))();
  },
  //Api customer update 
  getCustomerUpdate: function getCustomerUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$body$data, id, firstName, lastName, phone, gender;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body$data = req.body.data, id = _req$body$data.id, firstName = _req$body$data.firstName, lastName = _req$body$data.lastName, phone = _req$body$data.phone, gender = _req$body$data.gender;
            _models.db.customer.findOne({
              where: {
                id: id
              }
            }).then(function (customer) {
              if (customer) {
                return _models.db.customer.update({
                  firstName: firstName,
                  lastName: lastName,
                  phone: phone,
                  gender: gender
                }, {
                  where: {
                    id: customer.id
                  }
                });
              }
              throw new RequestError('Customer is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted Customer Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 8;
            break;
          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 5]]);
    }))();
  },
  getVoucherCustomer: function getVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var id;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            console.log(req.user);
            id = req.body.id;
            _models.db.vouchercustomer.findAll({
              where: {
                customerId: id
              }
            }).then(function (data) {
              return res.status(200).json({
                ok: true,
                data: data
              });
            })["catch"](function (e) {
              return next(e);
            });
          case 3:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }))();
  },
  getVoucherCustomer2: function getVoucherCustomer2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var uid, email, data;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            console.log(req.user);
            uid = req.user.uid;
            email = req.query.email;
            _context11.next = 5;
            return _models.db.sequelize.query("SELECT vouchers.*, vouchercustomers.is_use AS is_use FROM vouchers INNER JOIN vouchercustomers ON vouchercustomers.voucherId = vouchers.id INNER JOIN customers ON customers.id = vouchercustomers.customerId WHERE customers.id= ".concat(uid)).then(function (data) {
              return res.status(200).json({
                ok: true,
                data: data
              });
            })["catch"](function (e) {
              return next(e);
            });
          case 5:
            data = _context11.sent;
          case 6:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }))();
  },
  postVoucherCustomer: function postVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var uid, voucherId;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            uid = req.user.uid;
            voucherId = req.body.voucherId;
            _models.db.vouchercustomer.create(_objectSpread(_objectSpread({}, req.body), {}, {
              customerId: uid,
              is_use: false
            }));
            return _context12.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }))();
  },
  putVoucherCustomer: function putVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var uid, voucherId;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            uid = req.user.uid;
            voucherId = req.body.voucherId;
            _models.db.vouchercustomer.update({
              is_use: true
            }, {
              where: {
                voucherId: voucherId,
                customerId: uid
              }
            });
            return _context13.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }))();
  },
  deleteVoucherCustomer: function deleteVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var uid, voucherId;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            uid = req.user.uid;
            voucherId = req.body.voucherId;
            _models.db.vouchercustomer.destroy({
              where: _objectSpread(_objectSpread({}, req.body), {}, {
                customerId: uid
              })
            });
            return _context14.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9mdW5jdGlvbnMiLCJfc2VxdWVsaXplIiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJKV1RTaWduIiwidXNlciIsImRhdGUiLCJKV1QiLCJzaWduIiwic3ViIiwiaWQiLCJpYW0iLCJ0eXBlIiwiaWF0IiwiZ2V0VGltZSIsImV4cCIsIkRhdGUiLCJzZXRNaW51dGVzIiwiZ2V0TWludXRlcyIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiZ2VuZXJhdGVPdHAiLCJ0b2tlbiIsInNwZWFrZWFzeSIsInRvdHAiLCJzZWNyZXQiLCJPVFBfS0VZIiwiZW5jb2RpbmciLCJzdGVwIiwiTWF0aCIsImZsb29yIiwidmVyaWZ5T3RwIiwiZXhwaXJ5IiwidmVyaWZ5Iiwid2luZG93IiwiX2RlZmF1bHQiLCJhZGRVc2VyIiwicmVxIiwicmVzIiwibmV4dCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJwaG9uZSIsImVtYWlsIiwiYWRkcmVzcyIsInBhc3N3b3JkIiwicGFzc3dvcmRIYXNoIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwiYm9keSIsImJjcnlwdCIsImhhc2hTeW5jIiwiZGIiLCJjdXN0b21lciIsImZpbmRPbmUiLCJ3aGVyZSIsInBhcmFub2lkIiwidGhlbiIsImZpbmQiLCJzdGF0dXMiLCJqc29uIiwiY3JlYXRlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJmaW5kVXNlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwicXVlcnkiLCJpbmNsdWRlIiwibW9kZWwiLCJBZGRyZXNzIiwic3VjY2VzcyIsImRhdGEiLCJsb2dpbiIsIl9jYWxsZWUzIiwiX3JlcSRib2R5MiIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInNlbnQiLCJ1aWQiLCJkYXRhVmFsdWVzIiwiYWJydXB0Iiwicm9vdFVzZXJDaGVjayIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwidmFsaWRhdGVFbWFpbCIsInJlZGlyZWN0IiwibXNnIiwic2VuZFJlc2V0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJtYWlsZXIiLCJzZW5kUmVzZXRQYXNzd29yZCIsInIiLCJlcnJvcnMiLCJyZXNldFBhc3N3b3JkIiwiX2NhbGxlZTYiLCJfcmVxJGJvZHkzIiwidmVyaWZpY2F0aW9uQ29kZSIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsInZlcmZfa2V5IiwicmVzdWx0IiwiaGFzaCIsInVwZGF0ZSIsImF0dGVtcHQiLCJpc1ZlcmlmeSIsImdldEFsbEN1c3RvbWVyIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJmaW5kQWxsIiwiZGVsZXRlQ3VzdG9tZXIiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsInBhcnNlSW50IiwiZGVzdHJveSIsIlJlcXVlc3RFcnJvciIsInJlIiwidDAiLCJnZXRDdXN0b21lclVwZGF0ZSIsIl9jYWxsZWU5IiwiX3JlcSRib2R5JGRhdGEiLCJnZW5kZXIiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJnZXRWb3VjaGVyQ3VzdG9tZXIiLCJfY2FsbGVlMTAiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsInZvdWNoZXJjdXN0b21lciIsImN1c3RvbWVySWQiLCJvayIsImUiLCJnZXRWb3VjaGVyQ3VzdG9tZXIyIiwiX2NhbGxlZTExIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJzZXF1ZWxpemUiLCJjb25jYXQiLCJwb3N0Vm91Y2hlckN1c3RvbWVyIiwiX2NhbGxlZTEyIiwidm91Y2hlcklkIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJpc191c2UiLCJwdXRWb3VjaGVyQ3VzdG9tZXIiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsImRlbGV0ZVZvdWNoZXJDdXN0b21lciIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2N1c3RvbWVyL2N1c3RvbWVyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xyXG5pbXBvcnQgSldUIGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdC1ub2RlanMnO1xyXG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XHJcbmltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcclxuaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSAnc2VxdWVsaXplJztcclxuXHJcbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcclxuICAgIHJldHVybiBKV1Quc2lnbih7XHJcbiAgICAgICAgLy8gaXNzOiBjb25maWcuYXBwLm5hbWUsXHJcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxyXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcclxuICAgICAgICBpYXQ6IGRhdGUuZ2V0VGltZSgpLFxyXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXHJcbiAgICB9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XHJcbiAgICBsZXQgdG9rZW4gPSBzcGVha2Vhc3kudG90cCh7XHJcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxyXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcclxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0b2tlbjtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVyaWZ5T3RwKHRva2VuKSB7XHJcbiAgICBsZXQgZXhwaXJ5ID0gc3BlYWtlYXN5LnRvdHAudmVyaWZ5KHtcclxuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXHJcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxyXG4gICAgICAgIHRva2VuOiB0b2tlbixcclxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxyXG4gICAgICAgIHdpbmRvdzogMFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZXhwaXJ5XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBhc3luYyBhZGRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcclxuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkKTtcclxuICAgICAgICAvLyB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xyXG4gICAgICAgIC8vIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xyXG4gICAgICAgIGRiLmN1c3RvbWVyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZpbmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLmpzb24oXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBkYi5jdXN0b21lci5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XCJzdWNjZXNzXCI6IHRydWV9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcclxuICAgICAgICBkYi5jdXN0b21lci5maW5kT25lKHsgXHJcbiAgICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiByZXEucXVlcnkuZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcyB9XVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZCB9PSByZXEuYm9keVxyXG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBmaW5kVXNlcj0gYXdhaXQgZGIuY3VzdG9tZXIuZmluZE9uZSh7d2hlcmU6IHtlbWFpbH19KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZW1haWxcIiwgZW1haWwpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5kVXNlclwiLCBmaW5kVXNlcilcclxuICAgICAgICBpZihmaW5kVXNlcikge1xyXG4gICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmaW5kVXNlci5kYXRhVmFsdWVzLmlkKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgZmluZFVzZXIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHJvb3RVc2VyQ2hlY2socmVxLCByZXMpIHtcclxuICAgICAgICBpZiAodmFsaWRhdGVFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcclxuICAgICAgICAgICAgZGIudXNlci5maW5kT25lKHtcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2c6IFwiSmFua3B1ciBHcm9jZXJyeSBhY2NvdW50IHdpdGggdGhhdCBzaWduLWluIGluZm9ybWF0aW9uIGRvZXMgbm90IGV4aXN0LiBUcnkgYWdhaW4gb3IgY3JlYXRlIGEgbmV3IGFjY291bnQuXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHNlbmRSZXNldChyZXEsIHJlcykge1xyXG4gICAgICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIG1haWxlci5zZW5kUmVzZXRQYXNzd29yZChlbWFpbClcclxuICAgICAgICAgICAgLnRoZW4ociA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnRXJyb3IgU2VuZGluZyBFbWFpbCEnXSB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHJlc2V0UGFzc3dvcmQocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zdCB7IGVtYWlsLCB2ZXJpZmljYXRpb25Db2RlLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgZGIudXNlci5maW5kT25lKHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGVtYWlsLCB2ZXJmX2tleTogdmVyaWZpY2F0aW9uQ29kZSB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGIudXNlci51cGRhdGUoeyBwYXNzd29yZDogaGFzaCwgdmVyZl9rZXk6IG51bGwsIGF0dGVtcHQ6IDAgLGlzVmVyaWZ5OiAxfSwgeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCB2ZXJpZmljYXRpb24gY29kZSEnXSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0Vycm9yIFVwZGF0aW5nIFBhc3N3b3JkISddIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBcclxuICAgIGFzeW5jIGdldEFsbEN1c3RvbWVyKHJlcSxyZXMsbmV4dCl7XHJcbiAgICAgICAgZGIuY3VzdG9tZXIuZmluZEFsbCgpXHJcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZGVsZXRlQ3VzdG9tZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5jdXN0b21lci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAgICAgICAudGhlbihjdXN0b21lciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VzdG9tZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY3VzdG9tZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBjdXN0b21lci5pZCB9IH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDdXN0b21lciBpcyBub3QgZm91bmQnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeydtc2cnOidzdWNjZXNzJywnc3RhdHVzJzogXCJkZWxldGVkIEN1c3RvbWVyIFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vQXBpIGN1c3RvbWVyIHVwZGF0ZSBcclxuICAgIGFzeW5jIGdldEN1c3RvbWVyVXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3R7IGlkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZ2VuZGVyIH09IHJlcS5ib2R5LmRhdGE7XHJcbiAgICAgICAgICAgIGRiLmN1c3RvbWVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KVxyXG4gICAgICAgICAgICAudGhlbihjdXN0b21lciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VzdG9tZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY3VzdG9tZXIudXBkYXRlKHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLCBsYXN0TmFtZTogbGFzdE5hbWUsIHBob25lOiBwaG9uZSwgZ2VuZGVyOiBnZW5kZXJcclxuICAgICAgICAgICAgICAgICAgICAgfSx7d2hlcmU6IHtpZDogY3VzdG9tZXIuaWR9fSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0N1c3RvbWVyIGlzIG5vdCBmb3VuZCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7J21zZyc6J3N1Y2Nlc3MnLCdzdGF0dXMnOiBcImRlbGV0ZWQgQ3VzdG9tZXIgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRWb3VjaGVyQ3VzdG9tZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXEudXNlcilcclxuICAgICAgICBjb25zdCB7aWQgfT0gcmVxLmJvZHlcclxuICAgICAgICBkYi52b3VjaGVyY3VzdG9tZXIuZmluZEFsbCh7d2hlcmU6IHtjdXN0b21lcklkOiBpZH19KVxyXG4gICAgICAgIC50aGVuKGRhdGE9PiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWUsIGRhdGF9KSlcclxuICAgICAgICAuY2F0Y2goZT0+IG5leHQoZSkpXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0Vm91Y2hlckN1c3RvbWVyMihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcS51c2VyKVxyXG4gICAgICAgIGNvbnN0IHt1aWQgfSA9cmVxLnVzZXJcclxuICAgICAgICBjb25zdCB7ZW1haWwgfT0gcmVxLnF1ZXJ5XHJcbiAgICAgICAgY29uc3QgZGF0YT0gYXdhaXQgZGIuc2VxdWVsaXplLnF1ZXJ5KGBTRUxFQ1Qgdm91Y2hlcnMuKiwgdm91Y2hlcmN1c3RvbWVycy5pc191c2UgQVMgaXNfdXNlIEZST00gdm91Y2hlcnMgSU5ORVIgSk9JTiB2b3VjaGVyY3VzdG9tZXJzIE9OIHZvdWNoZXJjdXN0b21lcnMudm91Y2hlcklkID0gdm91Y2hlcnMuaWQgSU5ORVIgSk9JTiBjdXN0b21lcnMgT04gY3VzdG9tZXJzLmlkID0gdm91Y2hlcmN1c3RvbWVycy5jdXN0b21lcklkIFdIRVJFIGN1c3RvbWVycy5pZD0gJHt1aWR9YClcclxuICAgICAgICAudGhlbihkYXRhPT4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCBkYXRhfSkpXHJcbiAgICAgICAgLmNhdGNoKGU9PiBuZXh0KGUpKVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHBvc3RWb3VjaGVyQ3VzdG9tZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICBjb25zdCB7dWlkIH09IHJlcS51c2VyXHJcbiAgICAgICAgY29uc3Qge3ZvdWNoZXJJZCB9PSByZXEuYm9keVxyXG4gICAgICAgIGRiLnZvdWNoZXJjdXN0b21lci5jcmVhdGUoey4uLnJlcS5ib2R5LCBjdXN0b21lcklkOiB1aWQsIGlzX3VzZTogZmFsc2V9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWV9KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHB1dFZvdWNoZXJDdXN0b21lcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGNvbnN0IHt1aWQgfT0gcmVxLnVzZXJcclxuICAgICAgICBjb25zdCB7dm91Y2hlcklkIH09IHJlcS5ib2R5XHJcbiAgICAgICAgZGIudm91Y2hlcmN1c3RvbWVyLnVwZGF0ZSh7aXNfdXNlOiB0cnVlfSx7d2hlcmU6IHtcclxuICAgICAgICAgICAgdm91Y2hlcklkLCBjdXN0b21lcklkOiB1aWRcclxuICAgICAgICB9fSlcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlfSlcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGFzeW5jIGRlbGV0ZVZvdWNoZXJDdXN0b21lcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGNvbnN0IHt1aWQgfT0gcmVxLnVzZXIgIFxyXG4gICAgICAgIGNvbnN0IHt2b3VjaGVySWQgfT0gcmVxLmJvZHlcclxuICAgICAgICBkYi52b3VjaGVyY3VzdG9tZXIuZGVzdHJveSh7d2hlcmU6IHtcclxuICAgICAgICAgICAgLi4ucmVxLmJvZHksIGN1c3RvbWVySWQ6IHVpZFxyXG4gICAgICAgIH19KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWV9KVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxhQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBRyxPQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxPQUFBLEdBQUFGLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSyxhQUFBLEdBQUFILHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBTSxVQUFBLEdBQUFKLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBTyxVQUFBLEdBQUFQLE9BQUE7QUFDQSxJQUFBUSxVQUFBLEdBQUFSLE9BQUE7QUFBc0MsU0FBQVMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRixDQUFBLFVBQUFHLE1BQUEsV0FBQUYsU0FBQSxDQUFBRCxDQUFBLElBQUFDLFNBQUEsQ0FBQUQsQ0FBQSxRQUFBQSxDQUFBLE9BQUFmLE9BQUEsQ0FBQUksTUFBQSxDQUFBYyxNQUFBLE9BQUFDLE9BQUEsV0FBQUMsR0FBQSxRQUFBQyxnQkFBQSxhQUFBUCxNQUFBLEVBQUFNLEdBQUEsRUFBQUYsTUFBQSxDQUFBRSxHQUFBLFNBQUFoQixNQUFBLENBQUFrQix5QkFBQSxHQUFBbEIsTUFBQSxDQUFBbUIsZ0JBQUEsQ0FBQVQsTUFBQSxFQUFBVixNQUFBLENBQUFrQix5QkFBQSxDQUFBSixNQUFBLEtBQUFsQixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxHQUFBQyxPQUFBLFdBQUFDLEdBQUEsSUFBQWhCLE1BQUEsQ0FBQW9CLGNBQUEsQ0FBQVYsTUFBQSxFQUFBTSxHQUFBLEVBQUFoQixNQUFBLENBQUFLLHdCQUFBLENBQUFTLE1BQUEsRUFBQUUsR0FBQSxpQkFBQU4sTUFBQTtBQUV0QyxJQUFJVyxPQUFPLEdBQUcsU0FBVkEsT0FBT0EsQ0FBYUMsSUFBSSxFQUFFQyxJQUFJLEVBQUU7RUFDaEMsT0FBT0Msd0JBQUcsQ0FBQ0MsSUFBSSxDQUFDO0lBQ1o7SUFDQUMsR0FBRyxFQUFFSixJQUFJLENBQUNLLEVBQUU7SUFDWkMsR0FBRyxFQUFHTixJQUFJLENBQUNPLElBQUk7SUFDZkMsR0FBRyxFQUFFUCxJQUFJLENBQUNRLE9BQU8sQ0FBQyxDQUFDO0lBQ25CQyxHQUFHLEVBQUUsSUFBSUMsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsVUFBVSxDQUFDWCxJQUFJLENBQUNZLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtFQUNyRCxDQUFDLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLENBQUM7QUFDOUIsQ0FBQztBQUVELFNBQVNDLFdBQVdBLENBQUEsRUFBRztFQUNuQixJQUFJQyxLQUFLLEdBQUdDLHFCQUFTLENBQUNDLElBQUksQ0FBQztJQUN2QkMsTUFBTSxFQUFFUCxPQUFPLENBQUNDLEdBQUcsQ0FBQ08sT0FBTztJQUMzQkMsUUFBUSxFQUFFLFFBQVE7SUFDbEJDLElBQUksRUFBRyxFQUFFLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFFLElBQUlmLElBQUksQ0FBQyxDQUFDLENBQUNGLE9BQU8sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLEVBQUc7RUFDL0QsQ0FBQyxDQUFDO0VBQ0YsT0FBT1MsS0FBSztBQUNoQjtBQUVBLFNBQVNTLFNBQVNBLENBQUNULEtBQUssRUFBRTtFQUN0QixJQUFJVSxNQUFNLEdBQUdULHFCQUFTLENBQUNDLElBQUksQ0FBQ1MsTUFBTSxDQUFDO0lBQy9CUixNQUFNLEVBQUVQLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTyxPQUFPO0lBQzNCQyxRQUFRLEVBQUUsUUFBUTtJQUNsQkwsS0FBSyxFQUFFQSxLQUFLO0lBQ1pNLElBQUksRUFBRyxFQUFFLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFFLElBQUlmLElBQUksQ0FBQyxDQUFDLENBQUNGLE9BQU8sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLEVBQUcsQ0FBRTtJQUM3RHFCLE1BQU0sRUFBRTtFQUNaLENBQUMsQ0FBQztFQUNGLE9BQU9GLE1BQU07QUFDakI7QUFBQyxJQUFBRyxRQUFBLEdBR2M7RUFDTEMsT0FBTyxXQUFBQSxRQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsU0FBQSxFQUFBQyxTQUFBLEVBQUFDLFFBQUEsRUFBQUMsS0FBQSxFQUFBQyxLQUFBLEVBQUFDLE9BQUEsRUFBQUMsUUFBQSxFQUFBQyxZQUFBO01BQUEsT0FBQVYsWUFBQSxZQUFBVyxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7UUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQWYsSUFBQTtVQUFBO1lBQUFLLFNBQUEsR0FDdUNQLEdBQUcsQ0FBQ21CLElBQUksRUFBakVYLFNBQVMsR0FBQUQsU0FBQSxDQUFUQyxTQUFTLEVBQUVDLFFBQVEsR0FBQUYsU0FBQSxDQUFSRSxRQUFRLEVBQUVDLEtBQUssR0FBQUgsU0FBQSxDQUFMRyxLQUFLLEVBQUVDLEtBQUssR0FBQUosU0FBQSxDQUFMSSxLQUFLLEVBQUVDLE9BQU8sR0FBQUwsU0FBQSxDQUFQSyxPQUFPLEVBQUVDLFFBQVEsR0FBQU4sU0FBQSxDQUFSTSxRQUFRO1lBQ3hEQyxZQUFZLEdBQUdNLHdCQUFNLENBQUNDLFFBQVEsQ0FBQ1IsUUFBUSxDQUFDLEVBQzVDO1lBQ0E7WUFDQVMsVUFBRSxDQUFDQyxRQUFRLENBQUNDLE9BQU8sQ0FBQztjQUFFQyxLQUFLLEVBQUU7Z0JBQUVkLEtBQUssRUFBRUE7Y0FBTSxDQUFDO2NBQUVlLFFBQVEsRUFBRTtZQUFNLENBQUMsQ0FBQyxDQUM1REMsSUFBSSxDQUFDLFVBQUFDLElBQUksRUFBSTtjQUNWLElBQUlBLElBQUksRUFBRTtnQkFDTixPQUFPM0IsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMseUJBQXlCLENBQUM7Y0FDMUQ7Y0FDQ1IsVUFBRSxDQUFDQyxRQUFRLENBQUNRLE1BQU0sQ0FBQztnQkFDaEJ2QixTQUFTLEVBQUVBLFNBQVM7Z0JBQ3BCQyxRQUFRLEVBQUVBLFFBQVE7Z0JBQ2xCRSxLQUFLLEVBQUVBLEtBQUs7Z0JBQ1pELEtBQUssRUFBRUEsS0FBSztnQkFDWkUsT0FBTyxFQUFFQSxPQUFPO2dCQUNoQkMsUUFBUSxFQUFFQztjQUNkLENBQUMsQ0FBQztjQUNGLE9BQU9iLEdBQUcsQ0FBQzRCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFDLFNBQVMsRUFBRTtjQUFJLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFFLEdBQUcsRUFBSTtjQUNWQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDO2NBQ2hCOUIsSUFBSSxDQUFDOEIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFmLFFBQUEsQ0FBQWtCLElBQUE7UUFBQTtNQUFBLEdBQUE3QixPQUFBO0lBQUE7RUFDVixDQUFDO0VBRUs4QixRQUFRLFdBQUFBLFNBQUNwQyxHQUFHLEVBQUNDLEdBQUcsRUFBQ0MsSUFBSSxFQUFDO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBZ0MsU0FBQTtNQUFBLE9BQUFqQyxZQUFBLFlBQUFXLElBQUEsVUFBQXVCLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBckIsSUFBQSxHQUFBcUIsU0FBQSxDQUFBckMsSUFBQTtVQUFBO1lBQ3hCb0IsVUFBRSxDQUFDQyxRQUFRLENBQUNDLE9BQU8sQ0FBQztjQUNoQkMsS0FBSyxFQUFFO2dCQUFFZCxLQUFLLEVBQUVYLEdBQUcsQ0FBQ3dDLEtBQUssQ0FBQzdCO2NBQU0sQ0FBQztjQUFFZSxRQUFRLEVBQUUsS0FBSztjQUNsRGUsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRXBCLFVBQUUsQ0FBQ3FCO2NBQVEsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FDRmhCLElBQUksQ0FBQyxVQUFBNUQsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU9rQyxHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztrQkFBRWMsT0FBTyxFQUFFLElBQUk7a0JBQUVDLElBQUksRUFBQzlFO2dCQUFJLENBQUMsQ0FBQztjQUM1RCxDQUFDLE1BRUdrQyxHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUU7Y0FBTSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFBRSxHQUFHLEVBQUk7Y0FDVkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEdBQUcsQ0FBQztjQUNoQjlCLElBQUksQ0FBQzhCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBTyxTQUFBLENBQUFKLElBQUE7UUFBQTtNQUFBLEdBQUFFLFFBQUE7SUFBQTtFQUNOLENBQUM7RUFFS1MsS0FBSyxXQUFBQSxNQUFDOUMsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTBDLFNBQUE7TUFBQSxJQUFBQyxVQUFBLEVBQUFyQyxLQUFBLEVBQUFFLFFBQUEsRUFBQXVCLFFBQUEsRUFBQW5ELEtBQUE7TUFBQSxPQUFBbUIsWUFBQSxZQUFBVyxJQUFBLFVBQUFrQyxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQWhDLElBQUEsR0FBQWdDLFNBQUEsQ0FBQWhELElBQUE7VUFBQTtZQUFBOEMsVUFBQSxHQUNFaEQsR0FBRyxDQUFDbUIsSUFBSSxFQUEzQlIsS0FBSyxHQUFBcUMsVUFBQSxDQUFMckMsS0FBSyxFQUFFRSxRQUFRLEdBQUFtQyxVQUFBLENBQVJuQyxRQUFRLEVBQ3RCO1lBQUFxQyxTQUFBLENBQUFoRCxJQUFBO1lBQUEsT0FDc0JvQixVQUFFLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDO2NBQUNDLEtBQUssRUFBRTtnQkFBQ2QsS0FBSyxFQUFMQTtjQUFLO1lBQUMsQ0FBQyxDQUFDO1VBQUE7WUFBckR5QixRQUFRLEdBQUFjLFNBQUEsQ0FBQUMsSUFBQTtZQUNkbEIsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxFQUFFdkIsS0FBSyxDQUFDO1lBQzNCc0IsT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVSxFQUFFRSxRQUFRLENBQUM7WUFBQSxLQUM5QkEsUUFBUTtjQUFBYyxTQUFBLENBQUFoRCxJQUFBO2NBQUE7WUFBQTtZQUNEakIsS0FBSyxHQUFFaEIsd0JBQUcsQ0FBQ0MsSUFBSSxDQUFDO2NBQUNrRixHQUFHLEVBQUVoQixRQUFRLENBQUNpQixVQUFVLENBQUNqRixFQUFFO2NBQUVBLEVBQUUsRUFBRWdFLFFBQVEsQ0FBQ2lCLFVBQVUsQ0FBQ2pGO1lBQUUsQ0FBQyxFQUFFUyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsVUFBVSxDQUFDO1lBQ3hHa0QsT0FBTyxDQUFDQyxHQUFHLENBQUNFLFFBQVEsQ0FBQ2lCLFVBQVUsQ0FBQ2pGLEVBQUUsQ0FBQztZQUFBLE9BQUE4RSxTQUFBLENBQUFJLE1BQUEsV0FDNUJyRCxHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFYyxPQUFPLEVBQUUsSUFBSTtjQUFFM0QsS0FBSyxFQUFMQSxLQUFLO2NBQUVtRCxRQUFRLEVBQVJBO1lBQVMsQ0FBQyxDQUFDO1VBQUE7WUFBQSxPQUFBYyxTQUFBLENBQUFJLE1BQUEsV0FHeERyRCxHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFYyxPQUFPLEVBQUU7WUFBTSxDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQU0sU0FBQSxDQUFBZixJQUFBO1FBQUE7TUFBQSxHQUFBWSxRQUFBO0lBQUE7RUFFdkQsQ0FBQztFQUVLUSxhQUFhLFdBQUFBLGNBQUN2RCxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUFBLFdBQUFFLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQW1ELFNBQUE7TUFBQSxPQUFBcEQsWUFBQSxZQUFBVyxJQUFBLFVBQUEwQyxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQXhDLElBQUEsR0FBQXdDLFNBQUEsQ0FBQXhELElBQUE7VUFBQTtZQUMxQixJQUFJLElBQUF5RCx3QkFBYSxFQUFDM0QsR0FBRyxDQUFDbUIsSUFBSSxDQUFDUixLQUFLLENBQUMsRUFBRTtjQUMvQlcsVUFBRSxDQUFDdkQsSUFBSSxDQUFDeUQsT0FBTyxDQUFDO2dCQUNaQyxLQUFLLEVBQUU7a0JBQ0hkLEtBQUssRUFBRVgsR0FBRyxDQUFDbUIsSUFBSSxDQUFDUjtnQkFDcEI7Y0FDSixDQUFDLENBQUMsQ0FDR2dCLElBQUksQ0FBQyxVQUFBNUQsSUFBSSxFQUFJO2dCQUNWLElBQUlBLElBQUksRUFBRSxPQUFPa0MsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7a0JBQ2xDYyxPQUFPLEVBQUUsSUFBSTtrQkFDYmdCLFFBQVEsRUFBRSxLQUFLO2tCQUNmakQsS0FBSyxFQUFFWCxHQUFHLENBQUNtQixJQUFJLENBQUNSO2dCQUNwQixDQUFDLENBQUM7Z0JBQ0YsT0FBT1YsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7a0JBQ3hCYyxPQUFPLEVBQUUsS0FBSztrQkFDZGdCLFFBQVEsRUFBRSxLQUFLO2tCQUNmQyxHQUFHLEVBQUU7Z0JBQ1QsQ0FBQyxDQUFDO2NBQ04sQ0FBQyxDQUFDO1lBQ1Y7VUFBQztVQUFBO1lBQUEsT0FBQUgsU0FBQSxDQUFBdkIsSUFBQTtRQUFBO01BQUEsR0FBQXFCLFFBQUE7SUFBQTtFQUNMLENBQUM7RUFFS00sU0FBUyxXQUFBQSxVQUFDOUQsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBRSxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUEwRCxTQUFBO01BQUEsSUFBQXBELEtBQUE7TUFBQSxPQUFBUCxZQUFBLFlBQUFXLElBQUEsVUFBQWlELFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBL0MsSUFBQSxHQUFBK0MsU0FBQSxDQUFBL0QsSUFBQTtVQUFBO1lBQ2RTLEtBQUssR0FBS1gsR0FBRyxDQUFDbUIsSUFBSSxDQUFsQlIsS0FBSztZQUNidUQsa0JBQU0sQ0FBQ0MsaUJBQWlCLENBQUN4RCxLQUFLLENBQUMsQ0FDMUJnQixJQUFJLENBQUMsVUFBQXlDLENBQUMsRUFBSTtjQUNQLE9BQU9uRSxHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWMsT0FBTyxFQUFFO2NBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQVosR0FBRyxFQUFJO2NBQ1ZDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7Y0FDaEIsT0FBTy9CLEdBQUcsQ0FBQzRCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFdUMsTUFBTSxFQUFFLENBQUMsc0JBQXNCO2NBQUUsQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQztVQUFDO1VBQUE7WUFBQSxPQUFBSixTQUFBLENBQUE5QixJQUFBO1FBQUE7TUFBQSxHQUFBNEIsUUFBQTtJQUFBO0VBQ1gsQ0FBQztFQUVLTyxhQUFhLFdBQUFBLGNBQUN0RSxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUFBLFdBQUFFLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQWtFLFNBQUE7TUFBQSxJQUFBQyxVQUFBLEVBQUE3RCxLQUFBLEVBQUE4RCxnQkFBQSxFQUFBNUQsUUFBQTtNQUFBLE9BQUFULFlBQUEsWUFBQVcsSUFBQSxVQUFBMkQsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUF6RCxJQUFBLEdBQUF5RCxTQUFBLENBQUF6RSxJQUFBO1VBQUE7WUFBQXNFLFVBQUEsR0FDb0J4RSxHQUFHLENBQUNtQixJQUFJLEVBQTlDUixLQUFLLEdBQUE2RCxVQUFBLENBQUw3RCxLQUFLLEVBQUU4RCxnQkFBZ0IsR0FBQUQsVUFBQSxDQUFoQkMsZ0JBQWdCLEVBQUU1RCxRQUFRLEdBQUEyRCxVQUFBLENBQVIzRCxRQUFRO1lBQ3pDUyxVQUFFLENBQUN2RCxJQUFJLENBQUN5RCxPQUFPLENBQUM7Y0FDWkMsS0FBSyxFQUFFO2dCQUFFZCxLQUFLLEVBQUVBLEtBQUs7Z0JBQUVpRSxRQUFRLEVBQUVIO2NBQWlCO1lBQ3RELENBQUMsQ0FBQyxDQUNHOUMsSUFBSSxDQUFDLFVBQUFrRCxNQUFNLEVBQUk7Y0FDWixJQUFJQSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSUMsSUFBSSxHQUFHMUQsd0JBQU0sQ0FBQ0MsUUFBUSxDQUFDUixRQUFRLENBQUM7Z0JBQ3BDUyxVQUFFLENBQUN2RCxJQUFJLENBQUNnSCxNQUFNLENBQUM7a0JBQUVsRSxRQUFRLEVBQUVpRSxJQUFJO2tCQUFFRixRQUFRLEVBQUUsSUFBSTtrQkFBRUksT0FBTyxFQUFFLENBQUM7a0JBQUVDLFFBQVEsRUFBRTtnQkFBQyxDQUFDLEVBQUU7a0JBQUV4RCxLQUFLLEVBQUU7b0JBQUVkLEtBQUssRUFBRUE7a0JBQU07Z0JBQUUsQ0FBQyxDQUFDO2dCQUN2RyxPQUFPVixHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztrQkFBRWMsT0FBTyxFQUFFO2dCQUFLLENBQUMsQ0FBQztjQUNsRCxDQUFDLE1BQU07Z0JBQ0gsT0FBTzNDLEdBQUcsQ0FBQzRCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2tCQUFFdUMsTUFBTSxFQUFFLENBQUMsNEJBQTRCO2dCQUFFLENBQUMsQ0FBQztjQUMzRTtZQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQXJDLEdBQUcsRUFBSTtjQUNWQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDO2NBQ2hCLE9BQU8vQixHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRXVDLE1BQU0sRUFBRSxDQUFDLDBCQUEwQjtjQUFFLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQU0sU0FBQSxDQUFBeEMsSUFBQTtRQUFBO01BQUEsR0FBQW9DLFFBQUE7SUFBQTtFQUVWLENBQUM7RUFFS1csY0FBYyxXQUFBQSxlQUFDbEYsR0FBRyxFQUFDQyxHQUFHLEVBQUNDLElBQUksRUFBQztJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQThFLFNBQUE7TUFBQSxPQUFBL0UsWUFBQSxZQUFBVyxJQUFBLFVBQUFxRSxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQW5FLElBQUEsR0FBQW1FLFNBQUEsQ0FBQW5GLElBQUE7VUFBQTtZQUM5Qm9CLFVBQUUsQ0FBQ0MsUUFBUSxDQUFDK0QsT0FBTyxDQUFDLENBQUMsQ0FDcEIzRCxJQUFJLENBQUMsVUFBQTVELElBQUksRUFBSTtjQUNWLElBQUlBLElBQUksRUFBRTtnQkFDTixPQUFPa0MsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7a0JBQUVjLE9BQU8sRUFBRSxJQUFJO2tCQUFFQyxJQUFJLEVBQUM5RTtnQkFBSSxDQUFDLENBQUM7Y0FDNUQsQ0FBQyxNQUVHa0MsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFO2NBQU0sQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQUUsR0FBRyxFQUFJO2NBQ1ZDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7Y0FDaEI5QixJQUFJLENBQUM4QixHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXFELFNBQUEsQ0FBQWxELElBQUE7UUFBQTtNQUFBLEdBQUFnRCxRQUFBO0lBQUE7RUFDTixDQUFDO0VBRUtJLGNBQWMsV0FBQUEsZUFBQ3ZGLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFtRixTQUFBO01BQUEsT0FBQXBGLFlBQUEsWUFBQVcsSUFBQSxVQUFBMEUsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUF4RSxJQUFBLEdBQUF3RSxTQUFBLENBQUF4RixJQUFBO1VBQUE7WUFBQXdGLFNBQUEsQ0FBQXhFLElBQUE7WUFFN0JJLFVBQUUsQ0FBQ0MsUUFBUSxDQUFDQyxPQUFPLENBQUM7Y0FBRUMsS0FBSyxFQUFFO2dCQUFFckQsRUFBRSxFQUFFdUgsUUFBUSxDQUFDM0YsR0FBRyxDQUFDd0MsS0FBSyxDQUFDcEUsRUFBRTtjQUFFO1lBQUUsQ0FBQyxDQUFDLENBQzdEdUQsSUFBSSxDQUFDLFVBQUFKLFFBQVEsRUFBSTtjQUNkLElBQUlBLFFBQVEsRUFBRTtnQkFDVixPQUFPRCxVQUFFLENBQUNDLFFBQVEsQ0FBQ3FFLE9BQU8sQ0FBQztrQkFBRW5FLEtBQUssRUFBRTtvQkFBRXJELEVBQUUsRUFBRW1ELFFBQVEsQ0FBQ25EO2tCQUFHO2dCQUFFLENBQUMsQ0FBQztjQUM5RDtjQUNBLE1BQU0sSUFBSXlILFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FDRGxFLElBQUksQ0FBQyxVQUFBbUUsRUFBRSxFQUFJO2NBQ1IsT0FBTzdGLEdBQUcsQ0FBQzRCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFDLEtBQUssRUFBQyxTQUFTO2dCQUFDLFFBQVEsRUFBRTtjQUFnQyxDQUFDLENBQUM7WUFDN0YsQ0FBQyxDQUFDLFNBQU0sQ0FBQyxVQUFBRSxHQUFHLEVBQUk7Y0FDWjlCLElBQUksQ0FBQzhCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFBMEQsU0FBQSxDQUFBeEYsSUFBQTtZQUFBO1VBQUE7WUFBQXdGLFNBQUEsQ0FBQXhFLElBQUE7WUFBQXdFLFNBQUEsQ0FBQUssRUFBQSxHQUFBTCxTQUFBO1lBQUEsTUFHSSxJQUFJRyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFILFNBQUEsQ0FBQXZELElBQUE7UUFBQTtNQUFBLEdBQUFxRCxRQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUVEO0VBQ01RLGlCQUFpQixXQUFBQSxrQkFBQ2hHLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUE0RixTQUFBO01BQUEsSUFBQUMsY0FBQSxFQUFBOUgsRUFBQSxFQUFBb0MsU0FBQSxFQUFBQyxRQUFBLEVBQUFDLEtBQUEsRUFBQXlGLE1BQUE7TUFBQSxPQUFBL0YsWUFBQSxZQUFBVyxJQUFBLFVBQUFxRixVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQW5GLElBQUEsR0FBQW1GLFNBQUEsQ0FBQW5HLElBQUE7VUFBQTtZQUFBbUcsU0FBQSxDQUFBbkYsSUFBQTtZQUFBZ0YsY0FBQSxHQUVpQmxHLEdBQUcsQ0FBQ21CLElBQUksQ0FBQzBCLElBQUksRUFBdkR6RSxFQUFFLEdBQUE4SCxjQUFBLENBQUY5SCxFQUFFLEVBQUVvQyxTQUFTLEdBQUEwRixjQUFBLENBQVQxRixTQUFTLEVBQUVDLFFBQVEsR0FBQXlGLGNBQUEsQ0FBUnpGLFFBQVEsRUFBRUMsS0FBSyxHQUFBd0YsY0FBQSxDQUFMeEYsS0FBSyxFQUFFeUYsTUFBTSxHQUFBRCxjQUFBLENBQU5DLE1BQU07WUFDN0M3RSxVQUFFLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDO2NBQUVDLEtBQUssRUFBRTtnQkFBRXJELEVBQUUsRUFBRUE7Y0FBRztZQUFFLENBQUMsQ0FBQyxDQUN6Q3VELElBQUksQ0FBQyxVQUFBSixRQUFRLEVBQUk7Y0FDZCxJQUFJQSxRQUFRLEVBQUU7Z0JBQ1YsT0FBT0QsVUFBRSxDQUFDQyxRQUFRLENBQUN3RCxNQUFNLENBQUM7a0JBQ3RCdkUsU0FBUyxFQUFFQSxTQUFTO2tCQUFFQyxRQUFRLEVBQUVBLFFBQVE7a0JBQUVDLEtBQUssRUFBRUEsS0FBSztrQkFBRXlGLE1BQU0sRUFBRUE7Z0JBQ25FLENBQUMsRUFBQztrQkFBQzFFLEtBQUssRUFBRTtvQkFBQ3JELEVBQUUsRUFBRW1ELFFBQVEsQ0FBQ25EO2tCQUFFO2dCQUFDLENBQUMsQ0FBQztjQUNsQztjQUNBLE1BQU0sSUFBSXlILFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FDRGxFLElBQUksQ0FBQyxVQUFBbUUsRUFBRSxFQUFJO2NBQ1IsT0FBTzdGLEdBQUcsQ0FBQzRCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFDLEtBQUssRUFBQyxTQUFTO2dCQUFDLFFBQVEsRUFBRTtjQUFnQyxDQUFDLENBQUM7WUFDN0YsQ0FBQyxDQUFDLFNBQU0sQ0FBQyxVQUFBRSxHQUFHLEVBQUk7Y0FDWjlCLElBQUksQ0FBQzhCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFBcUUsU0FBQSxDQUFBbkcsSUFBQTtZQUFBO1VBQUE7WUFBQW1HLFNBQUEsQ0FBQW5GLElBQUE7WUFBQW1GLFNBQUEsQ0FBQU4sRUFBQSxHQUFBTSxTQUFBO1lBQUEsTUFHSSxJQUFJUixZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFRLFNBQUEsQ0FBQWxFLElBQUE7UUFBQTtNQUFBLEdBQUE4RCxRQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUNLSyxrQkFBa0IsV0FBQUEsbUJBQUN0RyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBa0csVUFBQTtNQUFBLElBQUFuSSxFQUFBO01BQUEsT0FBQWdDLFlBQUEsWUFBQVcsSUFBQSxVQUFBeUYsV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUF2RixJQUFBLEdBQUF1RixVQUFBLENBQUF2RyxJQUFBO1VBQUE7WUFDckMrQixPQUFPLENBQUNDLEdBQUcsQ0FBQ2xDLEdBQUcsQ0FBQ2pDLElBQUksQ0FBQztZQUNkSyxFQUFFLEdBQUk0QixHQUFHLENBQUNtQixJQUFJLENBQWQvQyxFQUFFO1lBQ1RrRCxVQUFFLENBQUNvRixlQUFlLENBQUNwQixPQUFPLENBQUM7Y0FBQzdELEtBQUssRUFBRTtnQkFBQ2tGLFVBQVUsRUFBRXZJO2NBQUU7WUFBQyxDQUFDLENBQUMsQ0FDcER1RCxJQUFJLENBQUMsVUFBQWtCLElBQUk7Y0FBQSxPQUFHNUMsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUM4RSxFQUFFLEVBQUUsSUFBSTtnQkFBRS9ELElBQUksRUFBSkE7Y0FBSSxDQUFDLENBQUM7WUFBQSxFQUFDLFNBQzlDLENBQUMsVUFBQWdFLENBQUM7Y0FBQSxPQUFHM0csSUFBSSxDQUFDMkcsQ0FBQyxDQUFDO1lBQUEsRUFBQztVQUFBO1VBQUE7WUFBQSxPQUFBSixVQUFBLENBQUF0RSxJQUFBO1FBQUE7TUFBQSxHQUFBb0UsU0FBQTtJQUFBO0VBQ3ZCLENBQUM7RUFDS08sbUJBQW1CLFdBQUFBLG9CQUFDOUcsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTBHLFVBQUE7TUFBQSxJQUFBM0QsR0FBQSxFQUFBekMsS0FBQSxFQUFBa0MsSUFBQTtNQUFBLE9BQUF6QyxZQUFBLFlBQUFXLElBQUEsVUFBQWlHLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBL0YsSUFBQSxHQUFBK0YsVUFBQSxDQUFBL0csSUFBQTtVQUFBO1lBQ3RDK0IsT0FBTyxDQUFDQyxHQUFHLENBQUNsQyxHQUFHLENBQUNqQyxJQUFJLENBQUM7WUFDZHFGLEdBQUcsR0FBSXBELEdBQUcsQ0FBQ2pDLElBQUksQ0FBZnFGLEdBQUc7WUFDSHpDLEtBQUssR0FBSVgsR0FBRyxDQUFDd0MsS0FBSyxDQUFsQjdCLEtBQUs7WUFBQXNHLFVBQUEsQ0FBQS9HLElBQUE7WUFBQSxPQUNNb0IsVUFBRSxDQUFDNEYsU0FBUyxDQUFDMUUsS0FBSyxzT0FBQTJFLE1BQUEsQ0FBc08vRCxHQUFHLENBQUUsQ0FBQyxDQUMvUXpCLElBQUksQ0FBQyxVQUFBa0IsSUFBSTtjQUFBLE9BQUc1QyxHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBQzhFLEVBQUUsRUFBRSxJQUFJO2dCQUFFL0QsSUFBSSxFQUFKQTtjQUFJLENBQUMsQ0FBQztZQUFBLEVBQUMsU0FDOUMsQ0FBQyxVQUFBZ0UsQ0FBQztjQUFBLE9BQUczRyxJQUFJLENBQUMyRyxDQUFDLENBQUM7WUFBQSxFQUFDO1VBQUE7WUFGYmhFLElBQUksR0FBQW9FLFVBQUEsQ0FBQTlELElBQUE7VUFBQTtVQUFBO1lBQUEsT0FBQThELFVBQUEsQ0FBQTlFLElBQUE7UUFBQTtNQUFBLEdBQUE0RSxTQUFBO0lBQUE7RUFHZCxDQUFDO0VBQ0tLLG1CQUFtQixXQUFBQSxvQkFBQ3BILEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFnSCxVQUFBO01BQUEsSUFBQWpFLEdBQUEsRUFBQWtFLFNBQUE7TUFBQSxPQUFBbEgsWUFBQSxZQUFBVyxJQUFBLFVBQUF3RyxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQXRHLElBQUEsR0FBQXNHLFVBQUEsQ0FBQXRILElBQUE7VUFBQTtZQUMvQmtELEdBQUcsR0FBSXBELEdBQUcsQ0FBQ2pDLElBQUksQ0FBZnFGLEdBQUc7WUFDSGtFLFNBQVMsR0FBSXRILEdBQUcsQ0FBQ21CLElBQUksQ0FBckJtRyxTQUFTO1lBQ2hCaEcsVUFBRSxDQUFDb0YsZUFBZSxDQUFDM0UsTUFBTSxDQUFBN0UsYUFBQSxDQUFBQSxhQUFBLEtBQUs4QyxHQUFHLENBQUNtQixJQUFJO2NBQUV3RixVQUFVLEVBQUV2RCxHQUFHO2NBQUVxRSxNQUFNLEVBQUU7WUFBSyxFQUFDLENBQUM7WUFBQSxPQUFBRCxVQUFBLENBQUFsRSxNQUFBLFdBQ2pFckQsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBQzhFLEVBQUUsRUFBRTtZQUFJLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBWSxVQUFBLENBQUFyRixJQUFBO1FBQUE7TUFBQSxHQUFBa0YsU0FBQTtJQUFBO0VBQzNDLENBQUM7RUFDS0ssa0JBQWtCLFdBQUFBLG1CQUFDMUgsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXNILFVBQUE7TUFBQSxJQUFBdkUsR0FBQSxFQUFBa0UsU0FBQTtNQUFBLE9BQUFsSCxZQUFBLFlBQUFXLElBQUEsVUFBQTZHLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBM0csSUFBQSxHQUFBMkcsVUFBQSxDQUFBM0gsSUFBQTtVQUFBO1lBQzlCa0QsR0FBRyxHQUFJcEQsR0FBRyxDQUFDakMsSUFBSSxDQUFmcUYsR0FBRztZQUNIa0UsU0FBUyxHQUFJdEgsR0FBRyxDQUFDbUIsSUFBSSxDQUFyQm1HLFNBQVM7WUFDaEJoRyxVQUFFLENBQUNvRixlQUFlLENBQUMzQixNQUFNLENBQUM7Y0FBQzBDLE1BQU0sRUFBRTtZQUFJLENBQUMsRUFBQztjQUFDaEcsS0FBSyxFQUFFO2dCQUM3QzZGLFNBQVMsRUFBVEEsU0FBUztnQkFBRVgsVUFBVSxFQUFFdkQ7Y0FDM0I7WUFBQyxDQUFDLENBQUM7WUFBQSxPQUFBeUUsVUFBQSxDQUFBdkUsTUFBQSxXQUNJckQsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBQzhFLEVBQUUsRUFBRTtZQUFJLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBaUIsVUFBQSxDQUFBMUYsSUFBQTtRQUFBO01BQUEsR0FBQXdGLFNBQUE7SUFBQTtFQUMzQyxDQUFDO0VBRUtHLHFCQUFxQixXQUFBQSxzQkFBQzlILEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUEwSCxVQUFBO01BQUEsSUFBQTNFLEdBQUEsRUFBQWtFLFNBQUE7TUFBQSxPQUFBbEgsWUFBQSxZQUFBVyxJQUFBLFVBQUFpSCxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQS9HLElBQUEsR0FBQStHLFVBQUEsQ0FBQS9ILElBQUE7VUFBQTtZQUNqQ2tELEdBQUcsR0FBSXBELEdBQUcsQ0FBQ2pDLElBQUksQ0FBZnFGLEdBQUc7WUFDSGtFLFNBQVMsR0FBSXRILEdBQUcsQ0FBQ21CLElBQUksQ0FBckJtRyxTQUFTO1lBQ2hCaEcsVUFBRSxDQUFDb0YsZUFBZSxDQUFDZCxPQUFPLENBQUM7Y0FBQ25FLEtBQUssRUFBQXZFLGFBQUEsQ0FBQUEsYUFBQSxLQUMxQjhDLEdBQUcsQ0FBQ21CLElBQUk7Z0JBQUV3RixVQUFVLEVBQUV2RDtjQUFHO1lBQy9CLENBQUMsQ0FBQztZQUFBLE9BQUE2RSxVQUFBLENBQUEzRSxNQUFBLFdBQ0lyRCxHQUFHLENBQUM0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFDOEUsRUFBRSxFQUFFO1lBQUksQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFxQixVQUFBLENBQUE5RixJQUFBO1FBQUE7TUFBQSxHQUFBNEYsU0FBQTtJQUFBO0VBQzNDO0FBQ0osQ0FBQztBQUFBRyxPQUFBLGNBQUFwSSxRQUFBIn0=