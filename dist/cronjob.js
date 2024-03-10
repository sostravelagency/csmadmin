"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("./models");
var _moment = _interopRequireDefault(require("moment"));
var cron = require("node-cron");
var checkExpiredVouchers = cron.schedule("* * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  var vouchers, vouchersSchedule;
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.prev = 0;
        _context3.next = 3;
        return _models.db.voucher.findAll();
      case 3:
        vouchers = _context3.sent;
        _context3.next = 6;
        return _models.db.voucherschedule.findAll();
      case 6:
        vouchersSchedule = _context3.sent;
        // Lặp qua từng voucher và kiểm tra ngày hết hạn
        vouchersSchedule.forEach( /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(v) {
            var expireDate, currentDate;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  expireDate = new Date(v.date_end);
                  currentDate = new Date(); // So sánh ngày hết hạn với ngày hiện tại
                  if (!(expireDate.getTime() < currentDate.getTime())) {
                    _context.next = 5;
                    break;
                  }
                  _context.next = 5;
                  return _models.db.voucherschedule.destroy({
                    where: {
                      id: v.id
                    }
                  });
                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());
        vouchers.forEach( /*#__PURE__*/function () {
          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(v) {
            var expireDate, currentDate;
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  expireDate = new Date(v.expire);
                  currentDate = new Date(); // So sánh ngày hết hạn với ngày hiện tại
                  if (!(expireDate.getTime() < currentDate.getTime())) {
                    _context2.next = 5;
                    break;
                  }
                  _context2.next = 5;
                  return _models.db.voucher.destroy({
                    where: {
                      id: v.id
                    }
                  });
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          return function (_x2) {
            return _ref3.apply(this, arguments);
          };
        }());
        console.log("Cron job completed");
        _context3.next = 15;
        break;
      case 12:
        _context3.prev = 12;
        _context3.t0 = _context3["catch"](0);
        console.error("Error in cron job:", _context3.t0);
      case 15:
      case "end":
        return _context3.stop();
    }
  }, _callee3, null, [[0, 12]]);
})));
checkExpiredVouchers.start();
var _default = checkExpiredVouchers;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9tb21lbnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiY3JvbiIsImNoZWNrRXhwaXJlZFZvdWNoZXJzIiwic2NoZWR1bGUiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZTMiLCJ2b3VjaGVycyIsInZvdWNoZXJzU2NoZWR1bGUiLCJ3cmFwIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwicHJldiIsIm5leHQiLCJkYiIsInZvdWNoZXIiLCJmaW5kQWxsIiwic2VudCIsInZvdWNoZXJzY2hlZHVsZSIsImZvckVhY2giLCJfcmVmMiIsIl9jYWxsZWUiLCJ2IiwiZXhwaXJlRGF0ZSIsImN1cnJlbnREYXRlIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsIkRhdGUiLCJkYXRlX2VuZCIsImdldFRpbWUiLCJkZXN0cm95Iiwid2hlcmUiLCJpZCIsInN0b3AiLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiX3JlZjMiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImV4cGlyZSIsIl94MiIsImNvbnNvbGUiLCJsb2ciLCJ0MCIsImVycm9yIiwic3RhcnQiLCJfZGVmYXVsdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvY3JvbmpvYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuL21vZGVsc1wiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIlxyXG5cclxuY29uc3QgY3JvbiA9IHJlcXVpcmUoXCJub2RlLWNyb25cIik7XHJcblxyXG5jb25zdCBjaGVja0V4cGlyZWRWb3VjaGVycyA9IGNyb24uc2NoZWR1bGUoXCIqICogKiAqICpcIiwgYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBM4bqleSB04bqldCBj4bqjIGPDoWMgdm91Y2hlciB04burIGPGoSBz4bufIGThu68gbGnhu4d1XHJcbiAgICBjb25zdCB2b3VjaGVycyA9IGF3YWl0IGRiLnZvdWNoZXIuZmluZEFsbCgpO1xyXG4gICAgY29uc3Qgdm91Y2hlcnNTY2hlZHVsZT0gYXdhaXQgZGIudm91Y2hlcnNjaGVkdWxlLmZpbmRBbGwoKVxyXG4gICAgLy8gTOG6t3AgcXVhIHThu6tuZyB2b3VjaGVyIHbDoCBraeG7g20gdHJhIG5nw6B5IGjhur90IGjhuqFuXHJcbiAgICB2b3VjaGVyc1NjaGVkdWxlLmZvckVhY2goYXN5bmMgKHYpID0+IHtcclxuICAgICAgY29uc3QgZXhwaXJlRGF0ZSA9IG5ldyBEYXRlKHYuZGF0ZV9lbmQpO1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAvLyBTbyBzw6FuaCBuZ8OgeSBo4bq/dCBo4bqhbiB24bubaSBuZ8OgeSBoaeG7h24gdOG6oWlcclxuICAgICAgaWYgKGV4cGlyZURhdGUuZ2V0VGltZSgpIDwgY3VycmVudERhdGUuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgLy8gTuG6v3Ugdm91Y2hlciDEkcOjIGjhur90IGjhuqFuLCB4w7NhIHZvdWNoZXIga2jhu49pIGPGoSBz4bufIGThu68gbGnhu4d1XHJcbiAgICAgICAgYXdhaXQgZGIudm91Y2hlcnNjaGVkdWxlLmRlc3Ryb3koe1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgaWQ6IHYuaWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZvdWNoZXJzLmZvckVhY2goYXN5bmMgKHYpID0+IHtcclxuICAgICAgY29uc3QgZXhwaXJlRGF0ZSA9IG5ldyBEYXRlKHYuZXhwaXJlKTtcclxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgLy8gU28gc8OhbmggbmfDoHkgaOG6v3QgaOG6oW4gduG7m2kgbmfDoHkgaGnhu4duIHThuqFpXHJcbiAgICAgIGlmIChleHBpcmVEYXRlLmdldFRpbWUoKSA8IGN1cnJlbnREYXRlLmdldFRpbWUoKSkge1xyXG4gICAgICAgIC8vIE7hur91IHZvdWNoZXIgxJHDoyBo4bq/dCBo4bqhbiwgeMOzYSB2b3VjaGVyIGto4buPaSBjxqEgc+G7nyBk4buvIGxp4buHdVxyXG4gICAgICAgIGF3YWl0IGRiLnZvdWNoZXIuZGVzdHJveSh7XHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBpZDogdi5pZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiQ3JvbiBqb2IgY29tcGxldGVkXCIpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gY3JvbiBqb2I6XCIsIGVycm9yKTtcclxuICB9XHJcbn0pO1xyXG5cclxuY2hlY2tFeHBpcmVkVm91Y2hlcnMuc3RhcnQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNoZWNrRXhwaXJlZFZvdWNoZXJzOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBQyxzQkFBQSxDQUFBRixPQUFBO0FBRUEsSUFBTUcsSUFBSSxHQUFHSCxPQUFPLENBQUMsV0FBVyxDQUFDO0FBRWpDLElBQU1JLG9CQUFvQixHQUFHRCxJQUFJLENBQUNFLFFBQVEsQ0FBQyxXQUFXLG1CQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUUsU0FBQUMsU0FBQTtFQUFBLElBQUFDLFFBQUEsRUFBQUMsZ0JBQUE7RUFBQSxPQUFBSixZQUFBLFlBQUFLLElBQUEsVUFBQUMsVUFBQUMsU0FBQTtJQUFBLGtCQUFBQSxTQUFBLENBQUFDLElBQUEsR0FBQUQsU0FBQSxDQUFBRSxJQUFBO01BQUE7UUFBQUYsU0FBQSxDQUFBQyxJQUFBO1FBQUFELFNBQUEsQ0FBQUUsSUFBQTtRQUFBLE9BRzdCQyxV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