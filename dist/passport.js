"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _passport = _interopRequireDefault(require("passport"));
var _passportJwt = require("passport-jwt");
var _passportLocal = require("passport-local");
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _config = _interopRequireDefault(require("./config"));
var _models = require("./models");
var TokenExtractor = function TokenExtractor(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['XSRF-token'];
  }
  if (!token && req.headers['authorization']) {
    token = req.headers['authorization'];
  }
  return token;
};
_passport["default"].use('user-jwt', new _passportJwt.Strategy({
  jwtFromRequest: TokenExtractor,
  secretOrKey: _config["default"].app.secret
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _models.db.user.findOne({
            where: {
              id: payload.sub
            }
          });
        case 3:
          user = _context.sent;
          if (!(new Date(payload.exp) < new Date())) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", done('expired', false));
        case 6:
          if (user) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", done('user', false));
        case 8:
          done(null, user);
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          done(_context.t0, false);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
_passport["default"].use('user-local', new _passportLocal.Strategy({
  usernameField: 'email',
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, email, password, done) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _models.db.user.findOne({
            where: {
              email: email
            }
          });
        case 3:
          user = _context2.sent;
          if (user) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", done(null, false));
        case 6:
          if (!(user.status == 'inactive')) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", done('invalid', false));
        case 8:
          if (!(user.attempt == 5)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", done('attempt', false));
        case 10:
          isMatch = _bcryptNodejs["default"].compareSync(password, user.password);
          if (isMatch) {
            _context2.next = 16;
            break;
          }
          user.update({
            attempt: user.attempt + 1
          });
          return _context2.abrupt("return", done('attempt:' + (5 - user.attempt), false));
        case 16:
          user.update({
            attempt: 0
          });
        case 17:
          done(null, user);
          _context2.next = 24;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          done(_context2.t0, false);
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function (_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()));
_passport["default"].use('customer-local', new _passportLocal.Strategy({
  usernameField: 'email',
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, email, password, done) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _models.db.customer.findOne({
            where: {
              email: email
            }
          });
        case 3:
          user = _context3.sent;
          if (user) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", done(null, false));
        case 6:
          if (!(user.status == 'inactive')) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", done('invalid', false));
        case 8:
          if (!(user.attempt == 5)) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", done('attempt', false));
        case 10:
          isMatch = _bcryptNodejs["default"].compareSync(password, user.password);
          if (isMatch) {
            _context3.next = 16;
            break;
          }
          user.update({
            attempt: user.attempt + 1
          });
          return _context3.abrupt("return", done('attempt:' + (5 - user.attempt), false));
        case 16:
          user.update({
            attempt: 0
          });
        case 17:
          done(null, user);
          _context3.next = 24;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          done(_context3.t0, false);
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function (_x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}()));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGFzc3BvcnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9wYXNzcG9ydEp3dCIsIl9wYXNzcG9ydExvY2FsIiwiX2JjcnlwdE5vZGVqcyIsIl9jb25maWciLCJfbW9kZWxzIiwiVG9rZW5FeHRyYWN0b3IiLCJyZXEiLCJ0b2tlbiIsImNvb2tpZXMiLCJoZWFkZXJzIiwicGFzc3BvcnQiLCJ1c2UiLCJKd3RTdHJhdGVneSIsImp3dEZyb21SZXF1ZXN0Iiwic2VjcmV0T3JLZXkiLCJjb25maWciLCJhcHAiLCJzZWNyZXQiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwYXlsb2FkIiwiZG9uZSIsInVzZXIiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJpZCIsInN1YiIsInNlbnQiLCJEYXRlIiwiZXhwIiwiYWJydXB0IiwidDAiLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsIkxvY2FsU3RyYXRlZ3kiLCJ1c2VybmFtZUZpZWxkIiwicGFzc1JlcVRvQ2FsbGJhY2siLCJfcmVmMiIsIl9jYWxsZWUyIiwiZW1haWwiLCJwYXNzd29yZCIsImlzTWF0Y2giLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJzdGF0dXMiLCJhdHRlbXB0IiwiYmNyeXB0IiwiY29tcGFyZVN5bmMiLCJ1cGRhdGUiLCJjb25zb2xlIiwibG9nIiwiX3gzIiwiX3g0IiwiX3g1IiwiX3g2IiwiX3JlZjMiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImN1c3RvbWVyIiwiX3g3IiwiX3g4IiwiX3g5IiwiX3gxMCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXNzcG9ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xyXG5pbXBvcnQgeyBTdHJhdGVneSBhcyBKd3RTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCc7XHJcbmltcG9ydCB7IFN0cmF0ZWd5IGFzIExvY2FsU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1sb2NhbCc7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuL21vZGVscyc7XHJcblxyXG52YXIgVG9rZW5FeHRyYWN0b3IgPSBmdW5jdGlvbihyZXEpe1xyXG4gICAgdmFyIHRva2VuID0gbnVsbDtcclxuICAgIGlmIChyZXEgJiYgcmVxLmNvb2tpZXMpe1xyXG4gICAgICAgIHRva2VuID0gcmVxLmNvb2tpZXNbJ1hTUkYtdG9rZW4nXTtcclxuICAgIH1cclxuICAgIGlmKCF0b2tlbiAmJiByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddKXtcclxuICAgICAgICB0b2tlbiA9IHJlcS5oZWFkZXJzWydhdXRob3JpemF0aW9uJ107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9rZW47XHJcbn1cclxuXHJcbnBhc3Nwb3J0LnVzZSgndXNlci1qd3QnLCBuZXcgSnd0U3RyYXRlZ3koe1xyXG4gICAgand0RnJvbVJlcXVlc3Q6IFRva2VuRXh0cmFjdG9yLFxyXG4gICAgc2VjcmV0T3JLZXk6IGNvbmZpZy5hcHAuc2VjcmV0LFxyXG59LCBhc3luYyAocGF5bG9hZCwgZG9uZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2YXIgdXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXlsb2FkLnN1YiB9fSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG5ldyBEYXRlKHBheWxvYWQuZXhwKSA8IG5ldyBEYXRlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ2V4cGlyZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ3VzZXInLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvbmUobnVsbCwgdXNlcik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGRvbmUoZXJyb3IsIGZhbHNlKTtcclxuICAgIH1cclxufSkpO1xyXG5cclxuXHJcbnBhc3Nwb3J0LnVzZSgndXNlci1sb2NhbCcsIG5ldyBMb2NhbFN0cmF0ZWd5KHtcclxuICAgIHVzZXJuYW1lRmllbGQ6ICdlbWFpbCcsXHJcbiAgICBwYXNzUmVxVG9DYWxsYmFjazogdHJ1ZVxyXG59LCBhc3luYyAocmVxLCBlbWFpbCwgcGFzc3dvcmQsIGRvbmUpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9IH0pO1xyXG4gICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih1c2VyLnN0YXR1cyA9PSAnaW5hY3RpdmUnKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ2ludmFsaWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXNlci5hdHRlbXB0ID09IDUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ2F0dGVtcHQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBpc01hdGNoPSAgYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgaWYgKCFpc01hdGNoKSB7XHJcbiAgICAgICAgICAgIHVzZXIudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGF0dGVtcHQ6IHVzZXIuYXR0ZW1wdCArIDFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ2F0dGVtcHQ6JyArICg1IC0gdXNlci5hdHRlbXB0KSwgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVzZXIudXBkYXRlKHsgYXR0ZW1wdDogMCB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBkb25lKG51bGwsIHVzZXIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICBkb25lKGVycm9yLCBmYWxzZSk7XHJcbiAgICB9XHJcbn0pKTtcclxuXHJcbnBhc3Nwb3J0LnVzZSgnY3VzdG9tZXItbG9jYWwnLCBuZXcgTG9jYWxTdHJhdGVneSh7XHJcbiAgICB1c2VybmFtZUZpZWxkOiAnZW1haWwnLFxyXG4gICAgcGFzc1JlcVRvQ2FsbGJhY2s6IHRydWVcclxufSwgYXN5bmMgKHJlcSwgZW1haWwsIHBhc3N3b3JkLCBkb25lKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBkYi5jdXN0b21lci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0gfSk7XHJcbiAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHVzZXIuc3RhdHVzID09ICdpbmFjdGl2ZScpe1xyXG4gICAgICAgICAgICByZXR1cm4gZG9uZSgnaW52YWxpZCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1c2VyLmF0dGVtcHQgPT0gNSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9uZSgnYXR0ZW1wdCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGlzTWF0Y2g9ICBiY3J5cHQuY29tcGFyZVN5bmMocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG5cclxuICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcclxuICAgICAgICAgICAgdXNlci51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgYXR0ZW1wdDogdXNlci5hdHRlbXB0ICsgMVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZG9uZSgnYXR0ZW1wdDonICsgKDUgLSB1c2VyLmF0dGVtcHQpLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlci51cGRhdGUoeyBhdHRlbXB0OiAwIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvbmUobnVsbCwgdXNlcik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIGRvbmUoZXJyb3IsIGZhbHNlKTtcclxuICAgIH1cclxufSkpOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFBQSxTQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxZQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxjQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxhQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFBSSxPQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSyxPQUFBLEdBQUFMLE9BQUE7QUFFQSxJQUFJTSxjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQVlDLEdBQUcsRUFBQztFQUM5QixJQUFJQyxLQUFLLEdBQUcsSUFBSTtFQUNoQixJQUFJRCxHQUFHLElBQUlBLEdBQUcsQ0FBQ0UsT0FBTyxFQUFDO0lBQ25CRCxLQUFLLEdBQUdELEdBQUcsQ0FBQ0UsT0FBTyxDQUFDLFlBQVksQ0FBQztFQUNyQztFQUNBLElBQUcsQ0FBQ0QsS0FBSyxJQUFJRCxHQUFHLENBQUNHLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBQztJQUN0Q0YsS0FBSyxHQUFHRCxHQUFHLENBQUNHLE9BQU8s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