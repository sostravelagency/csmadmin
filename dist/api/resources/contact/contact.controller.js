"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _models = require("../../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  submit_contact: function submit_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _models.db.contact.create(_objectSpread({}, req.body));
            return _context.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  delete_contact: function delete_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var contactId;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            contactId = req.body.contactId;
            _models.db.contact.destroy({
              where: {
                id: contactId
              }
            });
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
  reply_contact: function reply_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body, email, content, contactId, replyText, user_reply;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, content = _req$body.content, contactId = _req$body.contactId, replyText = _req$body.replyText, user_reply = _req$body.user_reply;
            _mailer["default"].replyContact(email, content).then(function () {
              _models.db.contact.update({
                status: "replied",
                reply_text: replyText,
                user_reply: user_reply
              }, {
                where: {
                  id: contactId
                }
              });
              return res.status(200).json({
                ok: true
              });
            })["catch"](function (e) {
              return res.status(200).json({
                ok: false
              });
            });
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  get_list_contact: function get_list_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var contactList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.contact.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            contactList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              data: contactList
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbWFpbGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfbW9kZWxzIiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfZGVmYXVsdCIsInN1Ym1pdF9jb250YWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJjb250YWN0IiwiY3JlYXRlIiwiYm9keSIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInN0b3AiLCJkZWxldGVfY29udGFjdCIsIl9jYWxsZWUyIiwiY29udGFjdElkIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZGVzdHJveSIsIndoZXJlIiwiaWQiLCJyZXBseV9jb250YWN0IiwiX2NhbGxlZTMiLCJfcmVxJGJvZHkiLCJlbWFpbCIsImNvbnRlbnQiLCJyZXBseVRleHQiLCJ1c2VyX3JlcGx5IiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwibWFpbGVyIiwicmVwbHlDb250YWN0IiwidGhlbiIsInVwZGF0ZSIsInJlcGx5X3RleHQiLCJlIiwiZ2V0X2xpc3RfY29udGFjdCIsIl9jYWxsZWU0IiwiY29udGFjdExpc3QiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJmaW5kQWxsIiwib3JkZXIiLCJzZW50IiwiZGF0YSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9jb250YWN0L2NvbnRhY3QuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFpbGVyIGZyb20gXCIuLi8uLi8uLi9tYWlsZXJcIlxyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgYXN5bmMgc3VibWl0X2NvbnRhY3QocmVxLCByZXMpIHtcclxuICAgICAgICBkYi5jb250YWN0LmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIC4uLnJlcS5ib2R5XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGRlbGV0ZV9jb250YWN0KHJlcSwgcmVzKSB7XHJcbiAgICAgICAgY29uc3Qge2NvbnRhY3RJZCB9PSByZXEuYm9keVxyXG4gICAgICAgIGRiLmNvbnRhY3QuZGVzdHJveSh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogY29udGFjdElkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyByZXBseV9jb250YWN0KHJlcSwgcmVzKSB7XHJcbiAgICAgICAgY29uc3Qge2VtYWlsLCBjb250ZW50LCBjb250YWN0SWQsIHJlcGx5VGV4dCwgdXNlcl9yZXBseX09IHJlcS5ib2R5XHJcbiAgICAgICAgbWFpbGVyLnJlcGx5Q29udGFjdChlbWFpbCwgY29udGVudClcclxuICAgICAgICAudGhlbigoKT0+IHtcclxuICAgICAgICAgICAgZGIuY29udGFjdC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcInJlcGxpZWRcIiwgXHJcbiAgICAgICAgICAgICAgICByZXBseV90ZXh0OiByZXBseVRleHQsXHJcbiAgICAgICAgICAgICAgICB1c2VyX3JlcGx5XHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHtpZDogY29udGFjdElkfVxyXG4gICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZT0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogZmFsc2V9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0X2xpc3RfY29udGFjdChyZXEsIHJlcykge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RMaXN0PSBhd2FpdCBkYi5jb250YWN0LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCBkYXRhOiBjb250YWN0TGlzdH0pXHJcblxyXG4gICAgfVxyXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQW9DLFNBQUFFLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFK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