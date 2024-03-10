"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _config = _interopRequireDefault(require("./config"));
var _models = require("./models");
var _default = {
  sendEmployeePassword: function sendEmployeePassword(email, otp) {
    return new Promise(function (resolve, reject) {
      try {
        _models.db.customer.findOne({
          where: {
            email: email
          }
        }).then(function (user) {
          if (user) {
            var smtpTransport = _nodemailer["default"].createTransport({
              host: process.env.MAIL_HOST,
              port: process.env.MAIL_PORT,
              auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            smtpTransport.sendMail({
              from: process.env.MAIL_FROM,
              to: email,
              subject: "Grocery blogging website",
              html: "Dear user,<br><br> Thank you for registering with Janakpur.<br> <br> <b>" + otp + "</b><br> <br> This link will expire in 30sec. <br> This is a system generated mail. Please do not reply to this email ID.<br>Warm Regards,<br> Customer Care<br> Grocerry"
              // html: "Hi <br>" + "Your One Time Password(OTP) for completing your registeration on KDMARC is  " + password + " .Please do not share OTP with anyone .<br> Best Regards, <br> Team KDMARC",
            }, function (error, info) {
              if (error) {
                return reject({
                  name: "GrocerryException",
                  msg: "Email Sending Failed"
                });
              }
              return resolve(true);
            });
          } else throw {
            name: "GrocerrryException",
            msg: "Email Body not available"
          };
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  replyContact: function () {
    var _replyContact = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, content) {
      var transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
              }
            });
            mailOptions = {
              from: process.env.MAIL_USERNAME,
              to: email,
              subject: "Sending Email from FPT shop",
              text: content
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                throw error;
              } else {
                console.log('Email sent: ' + info.response);
                return 1;
              }
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function replyContact(_x, _x2) {
      return _replyContact.apply(this, arguments);
    }
    return replyContact;
  }(),
  sendUserOrder: function () {
    var _sendUserOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, content) {
      var transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
              }
            });
            mailOptions = {
              from: process.env.MAIL_USERNAME,
              to: email,
              subject: "Sending Email from FPT shop",
              text: content
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                throw error;
              } else {
                console.log('Email sent: ' + info.response);
                return 1;
              }
            });
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function sendUserOrder(_x3, _x4) {
      return _sendUserOrder.apply(this, arguments);
    }
    return sendUserOrder;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbm9kZW1haWxlciIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2NvbmZpZyIsIl9tb2RlbHMiLCJfZGVmYXVsdCIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwiZW1haWwiLCJvdHAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRiIiwiY3VzdG9tZXIiLCJmaW5kT25lIiwid2hlcmUiLCJ0aGVuIiwidXNlciIsInNtdHBUcmFuc3BvcnQiLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0IiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJNQUlMX0hPU1QiLCJwb3J0IiwiTUFJTF9QT1JUIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsInRscyIsInJlamVjdFVuYXV0aG9yaXplZCIsInNlbmRNYWlsIiwiZnJvbSIsIk1BSUxfRlJPTSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJlcnJvciIsImluZm8iLCJuYW1lIiwibXNnIiwiZXJyIiwicmVwbHlDb250YWN0IiwiX3JlcGx5Q29udGFjdCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiY29udGVudCIsInRyYW5zcG9ydGVyIiwibWFpbE9wdGlvbnMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0Iiwic2VydmljZSIsInRleHQiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsInNlbmRVc2VyT3JkZXIiLCJfc2VuZFVzZXJPcmRlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiX3gzIiwiX3g0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWlsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi9tb2RlbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZW5kRW1wbG95ZWVQYXNzd29yZDogKGVtYWlsLCBvdHApID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZGIuY3VzdG9tZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9IH0pLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIHZhciBzbXRwVHJhbnNwb3J0ID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICAgICAgICAgIGhvc3Q6IHByb2Nlc3MuZW52Lk1BSUxfSE9TVCxcclxuICAgICAgICAgICAgICBwb3J0OiBwcm9jZXNzLmVudi5NQUlMX1BPUlQsXHJcbiAgICAgICAgICAgICAgYXV0aDoge1xyXG4gICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSxcclxuICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB0bHM6IHsgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc210cFRyYW5zcG9ydC5zZW5kTWFpbChcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX0ZST00sXHJcbiAgICAgICAgICAgICAgICB0bzogZW1haWwsXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiBcIkdyb2NlcnkgYmxvZ2dpbmcgd2Vic2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgaHRtbDpcclxuICAgICAgICAgICAgICAgICAgXCJEZWFyIHVzZXIsPGJyPjxicj4gVGhhbmsgeW91IGZvciByZWdpc3RlcmluZyB3aXRoIEphbmFrcHVyLjxicj4gPGJyPiA8Yj5cIiArXHJcbiAgICAgICAgICAgICAgICAgIG90cCArXHJcbiAgICAgICAgICAgICAgICAgIFwiPC9iPjxicj4gPGJyPiBUaGlzIGxpbmsgd2lsbCBleHBpcmUgaW4gMzBzZWMuIDxicj4gVGhpcyBpcyBhIHN5c3RlbSBnZW5lcmF0ZWQgbWFpbC4gUGxlYXNlIGRvIG5vdCByZXBseSB0byB0aGlzIGVtYWlsIElELjxicj5XYXJtIFJlZ2FyZHMsPGJyPiBDdXN0b21lciBDYXJlPGJyPiBHcm9jZXJyeVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gaHRtbDogXCJIaSA8YnI+XCIgKyBcIllvdXIgT25lIFRpbWUgUGFzc3dvcmQoT1RQKSBmb3IgY29tcGxldGluZyB5b3VyIHJlZ2lzdGVyYXRpb24gb24gS0RNQVJDIGlzICBcIiArIHBhc3N3b3JkICsgXCIgLlBsZWFzZSBkbyBub3Qgc2hhcmUgT1RQIHdpdGggYW55b25lIC48YnI+IEJlc3QgUmVnYXJkcywgPGJyPiBUZWFtIEtETUFSQ1wiLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yLCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHcm9jZXJyeUV4Y2VwdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZzogXCJFbWFpbCBTZW5kaW5nIEZhaWxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyB7XHJcbiAgICAgICAgICAgICAgbmFtZTogXCJHcm9jZXJycnlFeGNlcHRpb25cIixcclxuICAgICAgICAgICAgICBtc2c6IFwiRW1haWwgQm9keSBub3QgYXZhaWxhYmxlXCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlcGx5Q29udGFjdDogYXN5bmMgKGVtYWlsLCBjb250ZW50KSA9PiB7XHJcbiAgICB2YXIgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgICAgIHNlcnZpY2U6IFwiZ21haWxcIixcclxuICAgICAgYXV0aDoge1xyXG4gICAgICAgIHVzZXI6IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsXHJcbiAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuTUFJTF9QQVNTV09SRCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgdmFyIG1haWxPcHRpb25zID0ge1xyXG4gICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLFxyXG4gICAgICB0bzogZW1haWwsXHJcbiAgICAgIHN1YmplY3Q6IFwiU2VuZGluZyBFbWFpbCBmcm9tIEZQVCBzaG9wXCIsXHJcbiAgICAgIHRleHQ6IGNvbnRlbnQsXHJcbiAgICB9O1xyXG4gICAgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMsIGZ1bmN0aW9uKGVycm9yLCBpbmZvKXtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0VtYWlsIHNlbnQ6ICcgKyBpbmZvLnJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNlbmRVc2VyT3JkZXI6IGFzeW5jIChlbWFpbCwgY29udGVudCkgPT4ge1xyXG4gICAgdmFyIHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICBzZXJ2aWNlOiBcImdtYWlsXCIsXHJcbiAgICAgIGF1dGg6IHtcclxuICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLFxyXG4gICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSxcclxuICAgICAgdG86IGVtYWlsLFxyXG4gICAgICBzdWJqZWN0OiBcIlNlbmRpbmcgRW1haWwgZnJvbSBGUFQgc2hvcFwiLFxyXG4gICAgICB0ZXh0OiBjb250ZW50LFxyXG4gICAgfTtcclxuICAgIHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zLCBmdW5jdGlvbihlcnJvciwgaW5mbyl7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdFbWFpbCBzZW50OiAnICsgaW5mby5yZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIDFcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxufTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxXQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxPQUFBLEdBQUFGLE9BQUE7QUFBOEIsSUFB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