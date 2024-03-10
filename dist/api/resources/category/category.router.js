"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _category = _interopRequireDefault(require("./category.controller"));
// import { jwtStrategy } from '../../../middleware/strategy';
// import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

var categoryRouter = _express["default"].Router();
exports.categoryRouter = categoryRouter;
categoryRouter.route("/getCategoryHeader", _category["default"].getCategoryListHeader);
categoryRouter.route('/getAllCategory').get(_category["default"].getCategoryList);
categoryRouter.route('/getAllSubCategory').get(_category["default"].getSubCategoryList);
categoryRouter.route('/getAllSubChildCategory').get(_category["default"].getSubChildCategoryList);
categoryRouter.route('/create').post(_category["default"].addCategory);
categoryRouter.route('/list').get(_category["default"].getList);
categoryRouter.route('/getCategoryById').get(_category["default"].getCategoryById);
categoryRouter.route('/create-sub').post(_category["default"].addSubCategory);
categoryRouter.route('/create-sub-child').post(_category["default"].addSubChildCategory);
categoryRouter.route('/update').post(_category["default"].updateCategory);

//category list 
categoryRouter.route('/main-list').get(_category["default"].getMainList);
categoryRouter.route('/main-list/update').post(_category["default"].getMainListUpdate);
//sub category list 
categoryRouter.route('/sub-list').get(_category["default"].getSubCategory);
categoryRouter.route('/sub-list/update').post(_category["default"].getSubCatListUpdate);
categoryRouter.route('/sub-list/delete')["delete"](_category["default"].getDeletedSubCatList);
//child category
categoryRouter.route('/child/deleteById')["delete"](_category["default"].deleteCategory);

//get all category by slug
categoryRouter.route('/cn/list').get(_category["default"].getAllCategoryBySlug);
categoryRouter.route('/c/:slug/:id').get(_category["default"].filterByCategoryList);

//Searching filter category
categoryRouter.route('/catlogsearch/child-category').post(_category["default"].getFilterbyCategory);
categoryRouter.route('/catlogsearch/product').post(_category["default"].getProductBySubcategory);

//mobile view
categoryRouter.route('/mobile/getAllCategory').get(_category["default"].getAllMobileCategory);
categoryRouter.route('/mobile/getAllSubCategoryById').post(_category["default"].getAllSubCategoryById);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2NhdGVnb3J5IiwiY2F0ZWdvcnlSb3V0ZXIiLCJleHByZXNzIiwiUm91dGVyIiwiZXhwb3J0cyIsInJvdXRlIiwiY2F0ZWdvcnlDb250cm9sbGVyIiwiZ2V0Q2F0ZWdvcnlMaXN0SGVhZGVyIiwiZ2V0IiwiZ2V0Q2F0ZWdvcnlMaXN0IiwiZ2V0U3ViQ2F0ZWdvcnlMaXN0IiwiZ2V0U3ViQ2hpbGRDYXRlZ29yeUxpc3QiLCJwb3N0IiwiYWRkQ2F0ZWdvcnkiLCJnZXRMaXN0IiwiZ2V0Q2F0ZWdvcnlCeUlkIiwiYWRkU3ViQ2F0ZWdvcnkiLCJhZGRTdWJDaGlsZENhdGVnb3J5IiwidXBkYXRlQ2F0ZWdvcnkiLCJnZXRNYWluTGlzdCIsImdldE1haW5MaXN0VXBkYXRlIiwiZ2V0U3ViQ2F0ZWdvcnkiLCJnZXRTdWJDYXRMaXN0VXBkYXRlIiwiZ2V0RGVsZXRlZFN1YkNhdExpc3QiLCJkZWxldGVDYXRlZ29yeSIsImdldEFsbENhdGVnb3J5QnlTbHVnIiwiZmlsdGVyQnlDYXRlZ29yeUxpc3QiLCJnZXRGaWx0ZXJieUNhdGVnb3J5IiwiZ2V0UHJvZHVjdEJ5U3ViY2F0ZWdvcnkiLCJnZXRBbGxNb2JpbGVDYXRlZ29yeSIsImdldEFsbFN1YkNhdGVnb3J5QnlJZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2NhdGVnb3J5L2NhdGVnb3J5LnJvdXRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IGNhdGVnb3J5Q29udHJvbGxlciBmcm9tICcuL2NhdGVnb3J5LmNvbnRyb2xsZXInO1xyXG4vLyBpbXBvcnQgeyBqd3RTdHJhdGVneSB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvc3RyYXRlZ3knO1xyXG4vLyBpbXBvcnQgeyBzYW5pdGl6ZSB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvc2FuaXRpemVyJztcclxuLy8gaW1wb3J0IHsgdmFsaWRhdGVCb2R5LCBzY2hlbWFzIH0gZnJvbSAnLi4vLi4vLi4vbWlkZGxld2FyZS92YWxpZGF0b3InO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhdGVnb3J5Um91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2F0ZWdvcnlSb3V0ZXIucm91dGUoXCIvZ2V0Q2F0ZWdvcnlIZWFkZXJcIiwgY2F0ZWdvcnlDb250cm9sbGVyLmdldENhdGVnb3J5TGlzdEhlYWRlcilcclxuY2F0ZWdvcnlSb3V0ZXIucm91dGUoJy9nZXRBbGxDYXRlZ29yeScpLmdldCggY2F0ZWdvcnlDb250cm9sbGVyLmdldENhdGVnb3J5TGlzdCk7XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvZ2V0QWxsU3ViQ2F0ZWdvcnknKS5nZXQoIGNhdGVnb3J5Q29udHJvbGxlci5nZXRTdWJDYXRlZ29yeUxpc3QpO1xyXG5jYXRlZ29yeVJvdXRlci5yb3V0ZSgnL2dldEFsbFN1YkNoaWxkQ2F0ZWdvcnknKS5nZXQoIGNhdGVnb3J5Q29udHJvbGxlci5nZXRTdWJDaGlsZENhdGVnb3J5TGlzdCk7XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvY3JlYXRlJykucG9zdChjYXRlZ29yeUNvbnRyb2xsZXIuYWRkQ2F0ZWdvcnkpO1xyXG5jYXRlZ29yeVJvdXRlci5yb3V0ZSgnL2xpc3QnKS5nZXQoY2F0ZWdvcnlDb250cm9sbGVyLmdldExpc3QpO1xyXG5jYXRlZ29yeVJvdXRlci5yb3V0ZSgnL2dldENhdGVnb3J5QnlJZCcpLmdldCggY2F0ZWdvcnlDb250cm9sbGVyLmdldENhdGVnb3J5QnlJZCk7XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvY3JlYXRlLXN1YicpLnBvc3QoIGNhdGVnb3J5Q29udHJvbGxlci5hZGRTdWJDYXRlZ29yeSk7XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvY3JlYXRlLXN1Yi1jaGlsZCcpLnBvc3QoY2F0ZWdvcnlDb250cm9sbGVyLmFkZFN1YkNoaWxkQ2F0ZWdvcnkpO1xyXG5jYXRlZ29yeVJvdXRlci5yb3V0ZSgnL3VwZGF0ZScpLnBvc3QoY2F0ZWdvcnlDb250cm9sbGVyLnVwZGF0ZUNhdGVnb3J5KTtcclxuXHJcbi8vY2F0ZWdvcnkgbGlzdCBcclxuY2F0ZWdvcnlSb3V0ZXIucm91dGUoJy9tYWluLWxpc3QnKS5nZXQoY2F0ZWdvcnlDb250cm9sbGVyLmdldE1haW5MaXN0KTtcclxuY2F0ZWdvcnlSb3V0ZXIucm91dGUoJy9tYWluLWxpc3QvdXBkYXRlJykucG9zdChjYXRlZ29yeUNvbnRyb2xsZXIuZ2V0TWFpbkxpc3RVcGRhdGUpO1xyXG4vL3N1YiBjYXRlZ29yeSBsaXN0IFxyXG5jYXRlZ29yeVJvdXRlci5yb3V0ZSgnL3N1Yi1saXN0JykuZ2V0KGNhdGVnb3J5Q29udHJvbGxlci5nZXRTdWJDYXRlZ29yeSk7XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvc3ViLWxpc3QvdXBkYXRlJykucG9zdChjYXRlZ29yeUNvbnRyb2xsZXIuZ2V0U3ViQ2F0TGlzdFVwZGF0ZSk7XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvc3ViLWxpc3QvZGVsZXRlJykuZGVsZXRlKCBjYXRlZ29yeUNvbnRyb2xsZXIuZ2V0RGVsZXRlZFN1YkNhdExpc3QpO1xyXG4vL2NoaWxkIGNhdGVnb3J5XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvY2hpbGQvZGVsZXRlQnlJZCcpLmRlbGV0ZSggY2F0ZWdvcnlDb250cm9sbGVyLmRlbGV0ZUNhdGVnb3J5KTtcclxuXHJcbi8vZ2V0IGFsbCBjYXRlZ29yeSBieSBzbHVnXHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvY24vbGlzdCcpLmdldChjYXRlZ29yeUNvbnRyb2xsZXIuZ2V0QWxsQ2F0ZWdvcnlCeVNsdWcpO1xyXG5jYXRlZ29yeVJvdXRlci5yb3V0ZSgnL2MvOnNsdWcvOmlkJykuZ2V0KGNhdGVnb3J5Q29udHJvbGxlci5maWx0ZXJCeUNhdGVnb3J5TGlzdCk7XHJcblxyXG4vL1NlYXJjaGluZyBmaWx0ZXIgY2F0ZWdvcnlcclxuY2F0ZWdvcnlSb3V0ZXIucm91dGUoJy9jYXRsb2dzZWFyY2gvY2hpbGQtY2F0ZWdvcnknKS5wb3N0KGNhdGVnb3J5Q29udHJvbGxlci5nZXRGaWx0ZXJieUNhdGVnb3J5KTtcclxuY2F0ZWdvcnlSb3V0ZXIucm91dGUoJy9jYXRsb2dzZWFyY2gvcHJvZHVjdCcpLnBvc3QoIGNhdGVnb3J5Q29udHJvbGxlci5nZXRQcm9kdWN0QnlTdWJjYXRlZ29yeSk7XHJcblxyXG4vL21vYmlsZSB2aWV3XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvbW9iaWxlL2dldEFsbENhdGVnb3J5JykuZ2V0KGNhdGVnb3J5Q29udHJvbGxlci5nZXRBbGxNb2JpbGVDYXRlZ29yeSk7XHJcbmNhdGVnb3J5Um91dGVyLnJvdXRlKCcvbW9iaWxlL2dldEFsbFN1YkNhdGVnb3J5QnlJZCcpLnBvc3QoY2F0ZWdvcnlDb250cm9sbGVyLmdldEFsbFN1YkNhdGVnb3J5QnlJZCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLFNBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTyxJQUFNRSxjQUFjLEdBQUdDLG1CQUFPLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0FBQUNDLE9BQUEsQ0FBQUgsY0FBQSxHQUFBQSxjQUFBO0FBQy9DQSxjQUFjLENBQUNJLEtBQUssQ0FBQyxvQkFBb0IsRUFBRUMsb0JBQWtCLENBQUNDLHFCQUFxQixDQUFDO0FBQ3BGTixjQUFjLENBQUNJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDRyxHQUFHLENBQUVGLG9CQUFrQixDQUFDRyxlQUFlLENBQUM7QUFDaEZSLGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUNHLEdBQUcsQ0FBRUYs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