"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _order = _interopRequireDefault(require("./order.controller"));
var _strategy = require("../../../middleware/strategy");
var _sanitizer = require("../../../middleware/sanitizer");
// import { validateBody, schemas } from '../../../middleware/validator';

var orderRouter = _express["default"].Router();
exports.orderRouter = orderRouter;
orderRouter.route('/create').post(_order["default"].index);
orderRouter.route('/list').get(_order["default"].getAllOrderList);
orderRouter.route('/status/update').post(_order["default"].statusUpdate);
orderRouter.route('/list').post(_order["default"].getAllOrderListById);
orderRouter.route('/status').post(_order["default"].getAllOrderStatus);
orderRouter.route('/count').get(_order["default"].getAllOrderCount);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX29yZGVyIiwiX3N0cmF0ZWd5IiwiX3Nhbml0aXplciIsIm9yZGVyUm91dGVyIiwiZXhwcmVzcyIsIlJvdXRlciIsImV4cG9ydHMiLCJyb3V0ZSIsInBvc3QiLCJvcmRlckNvbnRyb2xsZXIiLCJpbmRleCIsImdldCIsImdldEFsbE9yZGVyTGlzdCIsInN0YXR1c1VwZGF0ZSIsImdldEFsbE9yZGVyTGlzdEJ5SWQiLCJnZXRBbGxPcmRlclN0YXR1cyIsImdldEFsbE9yZGVyQ291bnQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9vcmRlci9vcmRlci5yb3V0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBvcmRlckNvbnRyb2xsZXIgZnJvbSAnLi9vcmRlci5jb250cm9sbGVyJztcclxuaW1wb3J0IHsgand0U3RyYXRlZ3kgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3N0cmF0ZWd5JztcclxuaW1wb3J0IHsgc2FuaXRpemUgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3Nhbml0aXplcic7XHJcbi8vIGltcG9ydCB7IHZhbGlkYXRlQm9keSwgc2NoZW1hcyB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvdmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCBjb25zdCBvcmRlclJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbm9yZGVyUm91dGVyLnJvdXRlKCcvY3JlYXRlJykucG9zdChvcmRlckNvbnRyb2xsZXIuaW5kZXgpO1xyXG5vcmRlclJvdXRlci5yb3V0ZSgnL2xpc3QnKS5nZXQob3JkZXJDb250cm9sbGVyLmdldEFsbE9yZGVyTGlzdCk7XHJcbm9yZGVyUm91dGVyLnJvdXRlKCcvc3RhdHVzL3VwZGF0ZScpLnBvc3Qob3JkZXJDb250cm9sbGVyLnN0YXR1c1VwZGF0ZSk7XHJcbm9yZGVyUm91dGVyLnJvdXRlKCcvbGlzdCcpLnBvc3Qob3JkZXJDb250cm9sbGVyLmdldEFsbE9yZGVyTGlzdEJ5SWQpO1xyXG5vcmRlclJvdXRlci5yb3V0ZSgnL3N0YXR1cycpLnBvc3Qob3JkZXJDb250cm9sbGVyLmdldEFsbE9yZGVyU3RhdHVzKTtcclxub3JkZXJSb3V0ZXIucm91dGUoJy9jb3VudCcpLmdldChvcmRlckNvbnRyb2xsZXIuZ2V0QWxsT3JkZXJDb3VudCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFBQSxRQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxNQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxTQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxVQUFBLEdBQUFILE9BQUE7QUFDQTs7QUFFTyxJQUFNSSxXQUFXLEdBQUdDLG1CQUFPLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0FBQUNDLE9BQUEsQ0FBQUgsV0FBQSxHQUFBQSxXQUFBO0FBQzVDQSxXQUFXLENBQUNJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxpQkFBZSxDQUFDQyxLQUFLLENBQUM7QUFDeERQLFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDSSxHQUFHLENBQUNGLGlCQUFlLENBQUNHLGVBQWUsQ0FBQztBQUMvRFQsV0FBVyxDQUFDSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxpQkFBZSxDQUFDSSxZQUFZLENBQUM7QUFDdEVWLFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLENBQUNDLGlCQUFlLENBQUNLLG1CQUFtQixDQUFDO0FBQ3BFWCxXQUFXLENBQUNJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxpQkFBZSxDQUFDTSxpQkFBaUIsQ0FBQztBQUNwRVosV0FBVyxDQUFDSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUNJLEdBQUcsQ0FBQ0YsaUJBQWUsQ0FBQ08sZ0JBQWdCLENBQUMifQ==