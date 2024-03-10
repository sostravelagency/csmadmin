"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _location = _interopRequireDefault(require("./location.controller"));
var _sanitizer = require("../../../middleware/sanitizer");
var _strategy = require("../../../middleware/strategy");
var _validator = require("../../../middleware/validator");
var locationRouter = _express["default"].Router();
exports.locationRouter = locationRouter;
locationRouter.route('/create').post(_location["default"].index);
locationRouter.route('/list').get(_location["default"].List);
locationRouter.route('/delete')["delete"](_location["default"].getLocationDelete);
locationRouter.route('/update').post(_location["default"].getLocationUpdate);

//area create
locationRouter.route('/area/create').post(_location["default"].areaCreate);
locationRouter.route('/area/list').get(_location["default"].areaList);
locationRouter.route('/area/delete')["delete"](_location["default"].getAreaDeleteById);
locationRouter.route('/area/update').post(_location["default"].getAreaUpdate);
locationRouter.route('/area/getAllAreaList').get(_location["default"].getAreaList);
// get location 
locationRouter.route('/area/list/getbyid').get(_location["default"].getAreaListById);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2xvY2F0aW9uIiwiX3Nhbml0aXplciIsIl9zdHJhdGVneSIsIl92YWxpZGF0b3IiLCJsb2NhdGlvblJvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJleHBvcnRzIiwicm91dGUiLCJwb3N0IiwibG9jYXRpb25Db250cm9sbGVyIiwiaW5kZXgiLCJnZXQiLCJMaXN0IiwiZ2V0TG9jYXRpb25EZWxldGUiLCJnZXRMb2NhdGlvblVwZGF0ZSIsImFyZWFDcmVhdGUiLCJhcmVhTGlzdCIsImdldEFyZWFEZWxldGVCeUlkIiwiZ2V0QXJlYVVwZGF0ZSIsImdldEFyZWFMaXN0IiwiZ2V0QXJlYUxpc3RCeUlkIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvbG9jYXRpb24vbG9jYXRpb24ucm91dGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgbG9jYXRpb25Db250cm9sbGVyIGZyb20gJy4vbG9jYXRpb24uY29udHJvbGxlcic7XHJcbmltcG9ydCB7IHNhbml0aXplIH0gZnJvbSAnLi4vLi4vLi4vbWlkZGxld2FyZS9zYW5pdGl6ZXInO1xyXG5pbXBvcnQgeyBqd3RTdHJhdGVneSB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUJvZHksIHNjaGVtYXMgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3ZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgY29uc3QgbG9jYXRpb25Sb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5sb2NhdGlvblJvdXRlci5yb3V0ZSgnL2NyZWF0ZScpLnBvc3QobG9jYXRpb25Db250cm9sbGVyLmluZGV4KTtcclxubG9jYXRpb25Sb3V0ZXIucm91dGUoJy9saXN0JykuZ2V0KGxvY2F0aW9uQ29udHJvbGxlci5MaXN0KTtcclxubG9jYXRpb25Sb3V0ZXIucm91dGUoJy9kZWxldGUnKS5kZWxldGUobG9jYXRpb25Db250cm9sbGVyLmdldExvY2F0aW9uRGVsZXRlKTtcclxubG9jYXRpb25Sb3V0ZXIucm91dGUoJy91cGRhdGUnKS5wb3N0KGxvY2F0aW9uQ29udHJvbGxlci5nZXRMb2NhdGlvblVwZGF0ZSk7XHJcblxyXG4vL2FyZWEgY3JlYXRlXHJcbmxvY2F0aW9uUm91dGVyLnJvdXRlKCcvYXJlYS9jcmVhdGUnKS5wb3N0KGxvY2F0aW9uQ29udHJvbGxlci5hcmVhQ3JlYXRlKTtcclxubG9jYXRpb25Sb3V0ZXIucm91dGUoJy9hcmVhL2xpc3QnKS5nZXQobG9jYXRpb25Db250cm9sbGVyLmFyZWFMaXN0KTtcclxubG9jYXRpb25Sb3V0ZXIucm91dGUoJy9hcmVhL2RlbGV0ZScpLmRlbGV0ZShsb2NhdGlvbkNvbnRyb2xsZXIuZ2V0QXJlYURlbGV0ZUJ5SWQpO1xyXG5sb2NhdGlvblJvdXRlci5yb3V0ZSgnL2FyZWEvdXBkYXRlJykucG9zdChsb2NhdGlvbkNvbnRyb2xsZXIuZ2V0QXJlYVVwZGF0ZSk7XHJcbmxvY2F0aW9uUm91dGVyLnJvdXRlKCcvYXJlYS9nZXRBbGxBcmVhTGlzdCcpLmdldChsb2NhdGlvbkNvbnRyb2xsZXIuZ2V0QXJlYUxpc3QpO1xyXG4vLyBnZXQgbG9jYXRpb24gXHJcbmxvY2F0aW9uUm91dGVyLnJvdXRlKCcvYXJlYS9saXN0L2dldGJ5aWQnKS5nZXQobG9jYXRpb25Db250cm9sbGVyLmdldEFyZWFMaXN0QnlJZCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLFNBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLFVBQUEsR0FBQUYsT0FBQTtBQUNBLElBQUFHLFNBQUEsR0FBQUgsT0FBQTtBQUNBLElBQUFJLFVBQUEsR0FBQUosT0FBQTtBQUVPLElBQU1LLGNBQWMsR0FBR0MsbUJBQU8sQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFBQ0MsT0FBQSxDQUFBSCxjQUFBLEdBQUFBLGNBQUE7QUFDL0NBLGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLG9CQUFrQixDQUFDQyxLQUFLLENBQUM7QUFDOURQLGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDSSxHQUFHLENBQUNGLG9CQUFrQixDQUFDRyxJQUFJLENBQUM7QUFDMURULGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFPLENBQUNFLG9CQUFrQixDQUFDSSxpQkFBaUIsQ0FBQztBQUM1RVYsY0FBYyxDQUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUNDLElBQUksQ0FBQ0Msb0JBQWtCLENBQUNLLGlCQUFpQixDQUFDOztBQUUxRTtBQUNBWCxjQUFjLENBQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxvQkFBa0IsQ0FBQ00sVUFBVSxDQUFDO0FBQ3hFWixjQUFjLENBQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQ0ksR0FBRyxDQUFDRixvQkFBa0IsQ0FBQ08sUUFBUSxDQUFDO0FBQ25FYixjQUFjLENBQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBTyxDQUFDRSxvQkFBa0IsQ0FBQ1EsaUJBQWlCLENBQUM7QUFDakZkLGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLG9CQUFrQixDQUFDUyxhQUFhLENBQUM7QUFDM0VmLGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUNJLEdBQUcsQ0FBQ0Ysb0JBQWtCLENBQUNVLFdBQVcsQ0FBQztBQUNoRjtBQUNBaEIsY0FBYyxDQUFDSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQ0ksR0FBRyxDQUFDRixvQkFBa0IsQ0FBQ1csZUFBZSxDQUFDIn0=