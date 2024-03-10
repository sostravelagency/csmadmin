"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _stackTrace = _interopRequireDefault(require("stack-trace"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
global.RequestError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(RequestError, _Error);
  var _super = _createSuper(RequestError);
  function RequestError(message, code, realError) {
    var _this;
    (0, _classCallCheck2["default"])(this, RequestError);
    if (realError instanceof RequestError) {
      _this = _super.call(this, realError.message, realError.code);
      _this.copyObject(realError);
      return (0, _possibleConstructorReturn2["default"])(_this);
    }
    if (!code) code = 500;
    _this = _super.call(this, message, code);
    _this.status = code;
    _this.errorList = [];
    if (message instanceof Array) {
      for (var i = 0; i < message.length; i++) {
        _this.errorList.push(message[i]);
      }
    } else {
      _this.errorList.push(message);
    }
    var trace = _stackTrace["default"].get();
    var consoleMessage = message;
    if (realError) consoleMessage = realError;
    console.error('\x1b[31mRequestError\x1b[0m', '\x1b[35m' + trace[1].getFileName().replace(__dirname, '') + '\x1b[0m', '\x1b[32m' + trace[1].getLineNumber() + ':' + trace[1].getColumnNumber() + '\x1b[0m', consoleMessage);
    return (0, _possibleConstructorReturn2["default"])(_this);
  }
  (0, _createClass2["default"])(RequestError, [{
    key: "copyObject",
    value: function copyObject(requestError) {
      this.errorList = requestError.errorList;
    }
  }]);
  return RequestError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc3RhY2tUcmFjZSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2NyZWF0ZVN1cGVyIiwiRGVyaXZlZCIsImhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiX2NyZWF0ZVN1cGVySW50ZXJuYWwiLCJTdXBlciIsIl9nZXRQcm90b3R5cGVPZjIiLCJyZXN1bHQiLCJOZXdUYXJnZXQiLCJjb25zdHJ1Y3RvciIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiIsInNoYW0iLCJQcm94eSIsIkJvb2xlYW4iLCJwcm90b3R5cGUiLCJ2YWx1ZU9mIiwiY2FsbCIsImUiLCJnbG9iYWwiLCJSZXF1ZXN0RXJyb3IiLCJfRXJyb3IiLCJfaW5oZXJpdHMyIiwiX3N1cGVyIiwibWVzc2FnZSIsImNvZGUiLCJyZWFsRXJyb3IiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjazIiLCJjb3B5T2JqZWN0Iiwic3RhdHVzIiwiZXJyb3JMaXN0IiwiQXJyYXkiLCJpIiwibGVuZ3RoIiwicHVzaCIsInRyYWNlIiwic3RhY2tUcmFjZSIsImdldCIsImNvbnNvbGVNZXNzYWdlIiwiY29uc29sZSIsImVycm9yIiwiZ2V0RmlsZU5hbWUiLCJyZXBsYWNlIiwiX19kaXJuYW1lIiwiZ2V0TGluZU51bWJlciIsImdldENvbHVtbk51bWJlciIsIl9jcmVhdGVDbGFzczIiLCJrZXkiLCJ2YWx1ZSIsInJlcXVlc3RFcnJvciIsIl93cmFwTmF0aXZlU3VwZXIyIiwiRXJyb3IiXSwic291cmNlcyI6WyIuLi9zcmMvZXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdGFja1RyYWNlIGZyb20gJ3N0YWNrLXRyYWNlJztcclxuXHJcbmdsb2JhbC5SZXF1ZXN0RXJyb3IgPSAgY2xhc3MgUmVxdWVzdEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29weU9iamVjdChyZXF1ZXN0RXJyb3IpIHtcclxuICAgICAgICB0aGlzLmVycm9yTGlzdCA9IHJlcXVlc3RFcnJvci5lcnJvckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY29kZSwgcmVhbEVycm9yKSB7XHJcbiAgICAgICAgaWYocmVhbEVycm9yIGluc3RhbmNlb2YgUmVxdWVzdEVycm9yKXtcclxuICAgICAgICAgICAgc3VwZXIocmVhbEVycm9yLm1lc3NhZ2UsIHJlYWxFcnJvci5jb2RlKVxyXG4gICAgICAgICAgICB0aGlzLmNvcHlPYmplY3QocmVhbEVycm9yKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFjb2RlKVxyXG4gICAgICAgICAgICBjb2RlID0gNTAwO1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsIGNvZGUpO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gY29kZTtcclxuICAgICAgICB0aGlzLmVycm9yTGlzdCA9IFtdO1xyXG4gICAgICAgIGlmKG1lc3NhZ2UgaW5zdGFuY2VvZiBBcnJheSl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8bWVzc2FnZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMaXN0LnB1c2gobWVzc2FnZVtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yTGlzdC5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdHJhY2UgPSBzdGFja1RyYWNlLmdldCgpO1xyXG4gICAgICAgIHZhciBjb25zb2xlTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgaWYocmVhbEVycm9yKVxyXG4gICAgICAgICAgICBjb25zb2xlTWVzc2FnZSA9IHJlYWxFcnJvcjtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdcXHgxYlszMW1SZXF1ZXN0RXJyb3JcXHgxYlswbScsICdcXHgxYlszNW0nK3RyYWNlWzFdLmdldEZpbGVOYW1lKCkucmVwbGFjZShfX2Rpcm5hbWUsICcnKSsnXFx4MWJbMG0nLCAnXFx4MWJbMzJtJyt0cmFjZVsxXS5nZXRMaW5lTnVtYmVyKCkrJzonK3RyYWNlWzFdLmdldENvbHVtbk51bWJlcigpKydcXHgxYlswbScsIGNvbnNvbGVNZXNzYWdlKTtcclxuICAgIH1cclxufTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLFdBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUFxQyxTQUFBQyxhQUFBQyxPQUFBLFFBQUFDLHlCQUFBLEdBQUFDLHlCQUFBLG9CQUFBQyxxQkFBQSxRQUFBQyxLQUFBLE9BQUFDLGdCQUFBLGFBQUFMLE9BQUEsR0FBQU0sTUFBQSxNQUFBTCx5QkFBQSxRQUFBTSxTQUFBLE9BQUFGLGdCQUFBLG1CQUFBRyxXQUFBLEVBQUFGLE1BQUEsR0FBQUcsT0FBQSxDQUFBQyxTQUFBLENBQUFOLEtBQUEsRUFBQU8sU0FBQSxFQUFBSixTQUFBLFlBQUFELE1BQUEsR0FBQUYsS0FBQSxDQUFBUSxLQUFBLE9BQUFELFNBQUEsZ0JBQUFFLDJCQUFBLG1CQUFBUCxNQUFBO0FBQUEsU0FBQUosMEJBQUEsZUFBQU8sT0FBQSxxQkFBQUEsT0FBQSxDQUFBQyxTQUFBLG9CQUFBRCxPQUFBLENBQUFDLFNBQUEsQ0FBQUksSUFBQSwyQkFBQUMsS0FBQSxvQ0FBQUMsT0FBQSxDQUFBQyxTQUFBLENBQUFDLE9BQUEsQ0FBQUMsSUFBQSxDQUFBVixPQUFBLENBQUFDLFNBQUEsQ0FBQU0sT0FBQSw4Q0FBQUksQ0FBQTtBQUVyQ0MsTUFBTSxDQUFDQyxZQUFZLDBCQUFBQyxNQUFBO0VBQUEsSUFBQUMsVUFBQSxhQUFBRixZQUFBLEVBQUFDLE1BQUE7RUFBQSxJQUFBRSxNQUFBLEdBQUExQixZQUFBLENBQUF1QixZQUFBO0VBS2YsU0FBQUEsYUFBWUksT0FBTyxFQUFFQyxJQUFJLEVBQUVDLFNBQVMsRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFBQSxJQUFBQyxnQkFBQSxtQkFBQVIsWUFBQTtJQUNsQyxJQUFHTSxTQUFTLFlBQVlOLFlBQVksRUFBQztNQUNqQ08sS0FBQSxHQUFBSixNQUFBLENBQUFOLElBQUEsT0FBTVMsU0FBUyxDQUFDRixPQUFPLEVBQUVFLFNBQVMsQ0FBQ0QsSUFBSTtNQUN2Q0UsS0FBQSxDQUFLRSxVQUFVLENBQUNILFNBQVMsQ0FBQztNQUMxQixXQUFBZiwyQkFBQSxhQUFBZ0IsS0FBQTtJQUNKO0lBQ0EsSUFBRyxDQUFDRixJQUFJLEVBQ0pBLElBQUksR0FBRyxHQUFHO0lBQ2RFLEtBQUEsR0FBQUosTUFBQSxDQUFBTixJQUFBLE9BQU1PLE9BQU8sRUFBRUMsSUFBSTtJQUNuQkUsS0FBQSxDQUFLRyxNQUFNLEdBQUdMLElBQUk7SUFDbEJFLEtBQUEsQ0FBS0ksU0FBUyxHQUFHLEVBQUU7SUFDbkIsSUFBR1AsT0FBTyxZQUFZUSxLQUFLLEVBQUM7TUFDeEIsS0FBSSxJQUFJQyxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUNULE9BQU8sQ0FBQ1UsTUFBTSxFQUFDRCxDQUFDLEVBQUUsRUFBQztRQUM3Qk4sS0FBQSxDQUFLSSxTQUFTLENBQUNJLElBQUksQ0FBQ1gsT0FBTyxDQUFDUyxDQUFDLENBQUMsQ0FBQztNQUNuQztJQUNKLENBQUMsTUFBSTtNQUNETixLQUFBLENBQUtJLFNBQVMsQ0FBQ0ksSUFBSSxDQUFDWCxPQUFPLENBQUM7SUFDaEM7SUFDQSxJQUFJWSxLQUFLLEdBQUdDLHNCQUFVLENBQUNDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLElBQUlDLGNBQWMsR0FBR2YsT0FBTztJQUM1QixJQUFHRSxTQUFTLEVBQ1JhLGNBQWMsR0FBR2IsU0FBUztJQUM5QmMsT0FBTyxDQUFDQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxHQUFDTCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNNLFdBQVcsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxFQUFFLEVBQUUsQ0FBQyxHQUFDLFNBQVMsRUFBRSxVQUFVLEdBQUNSLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ1MsYUFBYSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUNULEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ1UsZUFBZSxDQUFDLENBQUMsR0FBQyxTQUFTLEVBQUVQLGNBQWMsQ0FBQztJQUFDLFdBQUE1QiwyQkFBQSxhQUFBZ0IsS0FBQTtFQUNuTjtFQUFDLElBQUFvQixhQUFBLGFBQUEzQixZQUFBO0lBQUE0QixHQUFBO0lBQUFDLEtBQUEsRUEzQkQsU0FBQXBCLFdBQVdxQixZQUFZLEVBQUU7TUFDckIsSUFBSSxDQUFDbkIsU0FBUyxHQUFHbUIsWUFBWSxDQUFDbkIsU0FBUztJQUMzQztFQUFDO0VBQUEsT0FBQVgsWUFBQTtBQUFBLG9CQUFBK0IsaUJBQUEsYUFINkNDLEtBQUssRUE2QnREIn0=