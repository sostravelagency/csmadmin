"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("./auth.controller"));
// import { localStrategy , jwtStrategy} from '../../../middleware/strategy';
// import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

var authRouter = _express["default"].Router();
exports.authRouter = authRouter;
authRouter.route('/register').post( /*sanitize(),/* validateBody(schemas.registerSchema), */_auth["default"].addUser);
authRouter.route('/user/getAllUserList').get(_auth["default"].getAllUserList);
authRouter.route('/user/update').post(_auth["default"].userUpdate);
authRouter.route('/user/delete').post(_auth["default"].deleteUserList);
authRouter.route('/info').get(_auth["default"].findUser);
authRouter.route('/rootLogin').post(_auth["default"].login);
authRouter.route('/verification').post(_auth["default"].verifyMail);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2F1dGgiLCJhdXRoUm91dGVyIiwiZXhwcmVzcyIsIlJvdXRlciIsImV4cG9ydHMiLCJyb3V0ZSIsInBvc3QiLCJhdXRoQ29udHJvbGxlciIsImFkZFVzZXIiLCJnZXQiLCJnZXRBbGxVc2VyTGlzdCIsInVzZXJVcGRhdGUiLCJkZWxldGVVc2VyTGlzdCIsImZpbmRVc2VyIiwibG9naW4iLCJ2ZXJpZnlNYWlsIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYXV0aC9hdXRoLnJvdXRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IGF1dGhDb250cm9sbGVyIGZyb20gJy4vYXV0aC5jb250cm9sbGVyJztcclxuLy8gaW1wb3J0IHsgbG9jYWxTdHJhdGVneSAsIGp3dFN0cmF0ZWd5fSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3N0cmF0ZWd5JztcclxuLy8gaW1wb3J0IHsgc2FuaXRpemUgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3Nhbml0aXplcic7XHJcbi8vIGltcG9ydCB7IHZhbGlkYXRlQm9keSwgc2NoZW1hcyB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvdmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuYXV0aFJvdXRlci5yb3V0ZSgnL3JlZ2lzdGVyJykucG9zdCgvKnNhbml0aXplKCksLyogdmFsaWRhdGVCb2R5KHNjaGVtYXMucmVnaXN0ZXJTY2hlbWEpLCAqLyBhdXRoQ29udHJvbGxlci5hZGRVc2VyKTtcclxuYXV0aFJvdXRlci5yb3V0ZSgnL3VzZXIvZ2V0QWxsVXNlckxpc3QnKS5nZXQoYXV0aENvbnRyb2xsZXIuZ2V0QWxsVXNlckxpc3QpO1xyXG5hdXRoUm91dGVyLnJvdXRlKCcvdXNlci91cGRhdGUnKS5wb3N0KGF1dGhDb250cm9sbGVyLnVzZXJVcGRhdGUpO1xyXG5hdXRoUm91dGVyLnJvdXRlKCcvdXNlci9kZWxldGUnKS5wb3N0KGF1dGhDb250cm9sbGVyLmRlbGV0ZVVzZXJMaXN0KTtcclxuYXV0aFJvdXRlci5yb3V0ZSgnL2luZm8nKS5nZXQoYXV0aENvbnRyb2xsZXIuZmluZFVzZXIpO1xyXG5hdXRoUm91dGVyLnJvdXRlKCcvcm9vdExvZ2luJykucG9zdChhdXRoQ29udHJvbGxlci5sb2dpbik7XHJcbmF1dGhSb3V0ZXIucm91dGUoJy92ZXJpZmljYXRpb24nKS5wb3N0KGF1dGhDb250cm9sbGVyLnZlcmlmeU1haWwpXHJcblxyXG5cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBQUEsUUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsS0FBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLElBQU1FLFVBQVUsR0FBR0MsbUJBQU8sQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFBQ0MsT0FBQSxDQUFBSCxVQUFBLEdBQUFBLFVBQUE7QUFDM0NBLFVBQVUsQ0FBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxJQUFJLEVBQUMsd0RBQXlEQyxnQkFBYyxDQUFDQyxPQUFPLENBQUM7QUFDbkhQLFVBQVUsQ0FBQ0ksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUNJLEdBQUcsQ0FBQ0YsZ0JBQWMsQ0FBQ0csY0FBYyxDQUFDO0FBQzNFVCxVQUFVLENBQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxnQkFBYyxDQUFDSSxVQUFVLENBQUM7QUFDaEVWLFVBQVUsQ0FBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLGdCQUFjLENBQUNLLGNBQWMsQ0FBQztBQUNwRVgsVUFBVSxDQUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUNJLEdBQUcsQ0FBQ0YsZ0JBQWMsQ0FBQ00sUUFBUSxDQUFDO0FBQ3REWixVQUFVLENBQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxnQkFBYyxDQUFDTyxLQUFLLENBQUM7QUFDekRiLFVBQVUsQ0FBQ0ksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLGdCQUFjLENBQUNRLFVBQVUsQ0FBQyJ9