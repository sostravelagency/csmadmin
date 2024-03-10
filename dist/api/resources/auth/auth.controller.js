"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _config = _interopRequireDefault(require("../../../config"));
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _axios = _interopRequireDefault(require("axios"));
// import { validateEmail } from './../../../functions'

var JWTSign = function JWTSign(user, date) {
  return _jsonwebtoken["default"].sign({
    iss: _config["default"].app.name,
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
      var _req$body, firstName, lastName, phoneNo, email, address, password, role, verify, passwordHash, token, otp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNo = _req$body.phoneNo, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify;
            passwordHash = (0, _md["default"])(password);
            token = generateOtp();
            otp = verifyOtp(token);
            _models.db.user.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (find) {
              if (find) {
                return res.status(409).json("Email is already in use");
              }
              return _models.db.user.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNo: phoneNo,
                address: address,
                password: passwordHash,
                verify: verify,
                role: role
              });
            }).then(function (user) {
              if (user) {
                _mailer["default"].sendEmployeePassword(email, token);
                return res.status(200).json({
                  success: true,
                  key: otp,
                  msg: "New Registration added and password has been sent to " + email + " ."
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 5:
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
            _models.db.user.findOne({
              attributes: ["firstName", "lastName", "email"],
              where: {
                id: req.query.user_id
              }
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user,
                  ok: true
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
  getAllUserList: function getAllUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _models.db.user.findAll().then(function (user) {
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
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  userUpdate: function userUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, passwordHash;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, address = _req$body2.address, password = _req$body2.password, role = _req$body2.role, verify = _req$body2.verify;
            passwordHash = _bcryptNodejs["default"].hashSync(password);
            _models.db.user.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (user) {
              if (!user) {
                throw new RequestError('User is not found', 409);
              }
              return _models.db.user.update({
                firstName: firstName ? firstName : user.firstName,
                lastName: lastName ? lastName : user.lastName,
                password: password ? passwordHash : user.passwordHash,
                address: address ? address : user.address,
                role: role ? role : user.role,
                verify: verify ? verify : user.verify
              }, {
                where: {
                  id: id
                }
              });
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  msg: "User update successsfully"
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  // async login(req, res, next) {
  //     var date = new Date();
  //     var token = JWTSign(req.user, date);
  //     res.cookie('XSRF-token',token, {
  //         expire: new Date().setMinutes(date.getMinutes() + 30),
  //         httpOnly: true, secure: config.app.secure
  //     });
  //     return res.status(200).json({ success: true ,token, role: req.user.role});
  // },
  login: function login(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body3, email, password, findUser, token;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password; // var date = new Date();
            // console.log(password)
            // console.log(bcrypt.hashSync(password))
            _context5.next = 3;
            return _models.db.user.findOne({
              where: {
                email: email,
                password: (0, _md["default"])(password)
              }
            });
          case 3:
            findUser = _context5.sent;
            if (!findUser) {
              _context5.next = 9;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role
            }));
          case 9:
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  deleteUserList: function deleteUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _models.db.user.findOne({
              where: {
                id: req.body.id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.user.destroy({
                  where: {
                    id: req.body.id
                  }
                }).then(function (r) {
                  return [r, data];
                });
              }
              throw new RequestError('User is not found', 409);
            }).then(function (re) {
              return res.status(200).json({
                'status': "deleted userlist Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  verifyMail: function verifyMail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$body4, email, password, firstName, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            // Nhận email từ request body
            _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password, firstName = _req$body4.firstName; // Tạo một mã xác thực ngẫu nhiên
            // Cấu hình thông tin mail server (dùng Gmail làm ví dụ)
            transporter = _nodemailer["default"].createTransport({
              service: 'gmail',
              auth: {
                user: process.env.MAIL_USERNAME,
                // Thay bằng địa chỉ email của bạn
                pass: process.env.MAIL_PASSWORD // Thay bằng mật khẩu email của bạn
              }
            }); // Cấu hình nội dung email
            mailOptions = {
              from: process.env.MAIL_USERNAME,
              // Thay bằng địa chỉ email của bạn
              to: email,
              // Địa chỉ email người dùng cần xác thực
              subject: 'Email Verification',
              // Tiêu đề email
              html: "\n                    <a href=\"".concat(process.env.URL_FRONTEND, "/signup/success\" style=\"padding: 10px; border-radius: 10px; background-color: #2e89ff; color: #fff; width: 100%\">Click here to complete singup process</a>\n                ") // Nội dung email chứa mã xác thực
            }; // Gửi email
            _context7.next = 6;
            return transporter.sendMail(mailOptions);
          case 6:
            // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
            res.json({
              success: true
            });
            _context7.next = 13;
            break;
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            // Xử lý lỗi nếu có
            console.error('Error sending verification email:', _context7.t0);
            res.status(500).json({
              success: false,
              error: 'Error sending verification email'
            });
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 9]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiX2F4aW9zIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZU90cCIsInRva2VuIiwic3BlYWtlYXN5IiwidG90cCIsInNlY3JldCIsIk9UUF9LRVkiLCJlbmNvZGluZyIsInN0ZXAiLCJNYXRoIiwiZmxvb3IiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lTm8iLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJiY3J5cHQiLCJoYXNoU3luYyIsIlJlcXVlc3RFcnJvciIsInVwZGF0ZSIsImxvZ2luIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsInVpZCIsImRhdGFWYWx1ZXMiLCJhYnJ1cHQiLCJhdWlkIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTciLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcclxuaW1wb3J0IEpXVCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5pbXBvcnQgbWFpbGVyIGZyb20gJy4uLy4uLy4uL21haWxlcic7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJztcclxuaW1wb3J0IHNwZWFrZWFzeSBmcm9tICdzcGVha2Vhc3knO1xyXG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXHJcbmltcG9ydCBtZDUgZnJvbSBcIm1kNVwiXHJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCJcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiXHJcblxyXG52YXIgSldUU2lnbiA9IGZ1bmN0aW9uICh1c2VyLCBkYXRlKSB7XHJcbiAgICByZXR1cm4gSldULnNpZ24oe1xyXG4gICAgICAgIGlzczogY29uZmlnLmFwcC5uYW1lLFxyXG4gICAgICAgIHN1YjogdXNlci5pZCxcclxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXHJcbiAgICAgICAgaWF0OiBkYXRlLmdldFRpbWUoKSxcclxuICAgICAgICBleHA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKVxyXG4gICAgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xyXG4gICAgbGV0IHRva2VuID0gc3BlYWtlYXN5LnRvdHAoe1xyXG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcclxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXHJcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdG9rZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xyXG4gICAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XHJcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxyXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcclxuICAgICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKSxcclxuICAgICAgICB3aW5kb3c6IDBcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGV4cGlyeVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmVObywgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnkgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xyXG4gICAgICAgIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XHJcbiAgICAgICAgdmFyIG90cCA9IHZlcmlmeU90cCh0b2tlbik7XHJcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAudGhlbihmaW5kID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChmaW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGhvbmVObzogcGhvbmVObyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiB2ZXJpZnksXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZEVtcGxveWVlUGFzc3dvcmQoZW1haWwsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBrZXk6IG90cCwgbXNnOiBcIk5ldyBSZWdpc3RyYXRpb24gYWRkZWQgYW5kIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8gXCIgKyBlbWFpbCArIFwiIC5cIiB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpe1xyXG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IGF0dHJpYnV0ZXM6W1wiZmlyc3ROYW1lXCIsXCJsYXN0TmFtZVwiLCBcImVtYWlsXCJdLCB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LnVzZXJfaWQgfX0pXHJcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXIsIG9rOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgICBhc3luYyBnZXRBbGxVc2VyTGlzdChyZXEscmVzLG5leHQpe1xyXG4gICAgICAgIGRiLnVzZXIuZmluZEFsbCgpXHJcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgIGFzeW5jIHVzZXJVcGRhdGUocmVxLHJlcyxuZXh0KXtcclxuICAgICAgICBjb25zdCB7IGlkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XHJcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCA/IHBhc3N3b3JkSGFzaDogdXNlci5wYXNzd29yZEhhc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiB1c2VyLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGU6IHVzZXIucm9sZSxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnkgOiB2ZXJpZnk/IHZlcmlmeTogdXNlci52ZXJpZnlcclxuICAgICAgICAgICAgICAgIH0sIHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcclxuICAgIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAvLyAgICAgdmFyIHRva2VuID0gSldUU2lnbihyZXEudXNlciwgZGF0ZSk7XHJcbiAgICAvLyAgICAgcmVzLmNvb2tpZSgnWFNSRi10b2tlbicsdG9rZW4sIHtcclxuICAgIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXHJcbiAgICAvLyAgICAgICAgIGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGNvbmZpZy5hcHAuc2VjdXJlXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSAsdG9rZW4sIHJvbGU6IHJlcS51c2VyLnJvbGV9KTtcclxuICAgIC8vIH0sXHJcbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGNvbnN0IHtlbWFpbCwgcGFzc3dvcmQgfT0gcmVxLmJvZHlcclxuICAgICAgICAvLyB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkKSlcclxuICAgICAgICBjb25zdCBmaW5kVXNlcj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge2VtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxyXG4gICAgICAgIGlmKGZpbmRVc2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZH0gfSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KS50aGVuKHIgPT4gW3IsIGRhdGFdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyB2ZXJpZnlNYWlsKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gTmjhuq1uIGVtYWlsIHThu6sgcmVxdWVzdCBib2R5XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBmaXJzdE5hbWUgfSA9IHJlcS5ib2R5O1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIFThuqFvIG3hu5l0IG3DoyB4w6FjIHRo4buxYyBuZ+G6q3Ugbmhpw6puXHJcbiAgICAgICAgICAgXHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQ+G6pXUgaMOsbmggdGjDtG5nIHRpbiBtYWlsIHNlcnZlciAoZMO5bmcgR21haWwgbMOgbSB2w60gZOG7pSlcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxyXG4gICAgICAgICAgICAgICAgYXV0aDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIG7hu5lpIGR1bmcgZW1haWxcclxuICAgICAgICAgICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cclxuICAgICAgICAgICAgICAgIHRvOiBlbWFpbCwgLy8gxJDhu4thIGNo4buJIGVtYWlsIG5nxrDhu51pIGTDuW5nIGPhuqduIHjDoWMgdGjhu7FjXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiAnRW1haWwgVmVyaWZpY2F0aW9uJywgLy8gVGnDqnUgxJHhu4EgZW1haWxcclxuICAgICAgICAgICAgICAgIGh0bWw6IGBcclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5VUkxfRlJPTlRFTkR9L3NpZ251cC9zdWNjZXNzXCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMmU4OWZmOyBjb2xvcjogI2ZmZjsgd2lkdGg6IDEwMCVcIj5DbGljayBoZXJlIHRvIGNvbXBsZXRlIHNpbmd1cCBwcm9jZXNzPC9hPlxyXG4gICAgICAgICAgICAgICAgYCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEfhu61pIGVtYWlsXHJcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgLy8gVHLhuqMgduG7gSBtw6MgeMOhYyB0aOG7sWMgxJHhu4Mgc+G7rSBk4bulbmcgc2F1IG7DoHkgKHbDrSBk4bulIMSR4buDIGtp4buDbSB0cmEgbcOjIGtoaSBuZ8aw4budaSBkw7luZyBuaOG6rXAgdsOgbylcclxuICAgICAgICAgICAgcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIFjhu60gbMO9IGzhu5dpIG7hur91IGPDs1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWwnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxhQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBRyxPQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxPQUFBLEdBQUFGLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSyxhQUFBLEdBQUFILHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBTSxVQUFBLEdBQUFKLHNCQUFBLENBQUFGLE9BQUE7QUFFQSxJQUFBTyxHQUFBLEdBQUFMLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBUSxXQUFBLEdBQUFOLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBUyxNQUFBLEdBQUFQLHNCQUFBLENBQUFGLE9BQUE7QUFIQTs7QUFLQSxJQUFJVSxPQUFPLEdBQUcsU0FBVkEsT0FBT0EsQ0FBYUMsSUFBSSxFQUFFQyxJQUFJLEVBQUU7RUFDaEMs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