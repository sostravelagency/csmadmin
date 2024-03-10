"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _require = require("sequelize"),
  Op = _require.Op;
var _default = {
  /* Add user api start here................................*/addCategory: function addCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, name, slug;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, slug = _req$body.slug;
            _models.db.category.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                return _models.db.category.update({
                  slug: slug
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              return _models.db.category.create({
                name: name,
                slug: slug
              });
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context.next = 8;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 5]]);
    }))();
  },
  addSubCategory: function addSubCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$body2, categoryId, sub_name;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, categoryId = _req$body2.categoryId, sub_name = _req$body2.sub_name;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: sub_name
              }
            }).then(function (data) {
              if (data) {
                throw new RequestError('Category already exist', 409);
              }
              return _models.db.SubCategory.create({
                categoryId: categoryId,
                sub_name: sub_name
              });
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context2.next = 8;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 5]]);
    }))();
  },
  addSubChildCategory: function addSubChildCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body3, categoryId, subcategoryId, name;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, categoryId = _req$body3.categoryId, subcategoryId = _req$body3.subcategoryId, name = _req$body3.name;
            _models.db.SubChildCategory.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                throw new RequestError('Category already exist', 409);
              }
              return _models.db.SubChildCategory.create({
                categoryId: categoryId,
                subcategoryId: subcategoryId,
                name: name
              });
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }))();
  },
  updateCategory: function updateCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$body4, childcategoryId, subcategoryId, sub_name, name;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body4 = req.body, childcategoryId = _req$body4.childcategoryId, subcategoryId = _req$body4.subcategoryId, sub_name = _req$body4.sub_name, name = _req$body4.name;
            _models.db.SubCategory.findOne({
              where: {
                id: subcategoryId
              }
            }).then(function (data) {
              if (data) {
                return _models.db.SubCategory.update({
                  sub_name: sub_name
                }, {
                  where: {
                    id: subcategoryId
                  }
                });
              }
              throw new RequestError('Category Not Found', 409);
            });
            _models.db.SubChildCategory.findOne({
              where: {
                id: childcategoryId
              }
            }).then(function (data) {
              if (data) {
                return _models.db.SubChildCategory.update({
                  name: name
                }, {
                  where: {
                    id: childcategoryId
                  }
                });
              }
              throw new RequestError('Category Not Found', 409);
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully Updated"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context4.next = 9;
            break;
          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError('Error');
          case 9:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 6]]);
    }))();
  },
  getCategoryList: function getCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _models.db.category.findAll({
              attributes: ["id", "name"],
              include: [{
                model: _models.db.SubCategory
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 7;
            break;
          case 4:
            _context5.prev = 4;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 4]]);
    }))();
  },
  getCategoryListHeader: function getCategoryListHeader(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _models.db.category.findAll({
              limit: 3
            }).then(function (list) {
              return res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (e) {
              return next(e);
            });
            _context6.next = 7;
            break;
          case 4:
            _context6.prev = 4;
            _context6.t0 = _context6["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 4]]);
    }))();
  },
  getSubCategoryList: function getSubCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.SubCategory.findAll({
              where: {
                categoryId: req.query.categoryId
              },
              include: [{
                model: _models.db.category,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context7.next = 7;
            break;
          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 4]]);
    }))();
  },
  getSubChildCategoryList: function getSubChildCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var subcategoryId;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            subcategoryId = req.query.subcategoryId;
            _models.db.SubChildCategory.findAll({
              where: {
                subcategoryId: subcategoryId
              }
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 8;
            break;
          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 5]]);
    }))();
  },
  getList: function getList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _models.db.SubChildCategory.findAll({
              include: [{
                model: _models.db.category,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 7;
            break;
          case 4:
            _context9.prev = 4;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 4]]);
    }))();
  },
  getCategoryById: function getCategoryById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var categoryId;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            categoryId = req.query.categoryId;
            _models.db.SubChildCategory.findAll({
              where: {
                categoryId: categoryId
              },
              include: [{
                model: _models.db.SubCategory,
                attributes: ['id', 'sub_name'],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 8;
            break;
          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 5]]);
    }))();
  },
  // category list
  getMainList: function getMainList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _models.db.category.findAll().then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
            _context11.next = 7;
            break;
          case 4:
            _context11.prev = 4;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 4]]);
    }))();
  },
  getMainListUpdate: function getMainListUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var _req$body5, id, name, slug;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _req$body5 = req.body, id = _req$body5.id, name = _req$body5.name, slug = _req$body5.slug;
            _models.db.category.findOne({
              where: {
                id: id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.category.update({
                  name: name,
                  slug: slug
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              throw new RequestError('Category is not found');
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully Updated category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context12.next = 8;
            break;
          case 5:
            _context12.prev = 5;
            _context12.t0 = _context12["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 5]]);
    }))();
  },
  // Sub category list
  getSubCategory: function getSubCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _models.db.SubCategory.findAll({
              include: [{
                model: _models.db.category,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context13.next = 7;
            break;
          case 4:
            _context13.prev = 4;
            _context13.t0 = _context13["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 4]]);
    }))();
  },
  getSubCatListUpdate: function getSubCatListUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var _req$body6, id, sub_name;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _req$body6 = req.body, id = _req$body6.id, sub_name = _req$body6.sub_name;
            _models.db.SubCategory.findOne({
              where: {
                id: id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.SubCategory.update({
                  sub_name: sub_name
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              throw new RequestError('Sub_Category is not found');
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully Updated Sub_Category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context14.next = 8;
            break;
          case 5:
            _context14.prev = 5;
            _context14.t0 = _context14["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 5]]);
    }))();
  },
  getDeletedSubCatList: function getDeletedSubCatList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (list) {
              if (list) {
                return _models.db.SubCategory.destroy({
                  where: {
                    id: list.id
                  }
                });
              }
              throw new RequestError('Id is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted Sub_Category Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context15.next = 7;
            break;
          case 4:
            _context15.prev = 4;
            _context15.t0 = _context15["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 4]]);
    }))();
  },
  //child category 
  deleteCategory: function deleteCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _models.db.category.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (data) {
              if (data) {
                return _models.db.category.destroy({
                  where: {
                    id: data.id
                  }
                }).then(function (r) {
                  return [r, data];
                });
              }
              throw new RequestError('child_category is not found');
            }).then(function (re) {
              return res.status(200).json({
                'status': "deleted category Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    }))();
  },
  getAllCategoryBySlug: function getAllCategoryBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _models.db.category.findOne({
              include: [{
                model: _models.db.SubCategory,
                include: [{
                  model: _models.db.SubChildCategory
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context17.next = 7;
            break;
          case 4:
            _context17.prev = 4;
            _context17.t0 = _context17["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 4]]);
    }))();
  },
  filterByCategoryList: function filterByCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _models.db.product.findAll({
              where: {
                childCategoryId: req.params.id
              }
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context18.next = 7;
            break;
          case 4:
            _context18.prev = 4;
            _context18.t0 = _context18["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 4]]);
    }))();
  },
  getFilterbyCategory: function getFilterbyCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var _req$body7, id, name;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _req$body7 = req.body, id = _req$body7.id, name = _req$body7.name;
            _models.db.SubCategory.findOne({
              attributes: ["id", "sub_name"],
              where: {
                id: id,
                sub_name: name
              },
              include: [{
                model: _models.db.SubChildCategory
              }]
            }).then(function (product) {
              res.status(200).json({
                'success': true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context19.next = 8;
            break;
          case 5:
            _context19.prev = 5;
            _context19.t0 = _context19["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[0, 5]]);
    }))();
  },
  getProductBySubcategory: function getProductBySubcategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var _req$body8, id, name, search;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _req$body8 = req.body, id = _req$body8.id, name = _req$body8.name;
            search = '%%';
            if (name) {
              search = '%' + name + '%';
            }
            _models.db.SubCategory.findAll({
              attributes: ["id", "sub_name"],
              include: [{
                model: _models.db.product,
                order: [['createdAt', 'DESC']],
                required: true,
                where: (0, _defineProperty2["default"])({}, Op.or, [{
                  name: (0, _defineProperty2["default"])({}, Op.like, search),
                  subCategoryId: id
                }])
              }]
            }).then(function (product) {
              res.status(200).json({
                'success': true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context20.next = 10;
            break;
          case 7:
            _context20.prev = 7;
            _context20.t0 = _context20["catch"](0);
            throw new RequestError('Error');
          case 10:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 7]]);
    }))();
  },
  //mobile
  getAllMobileCategory: function getAllMobileCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _models.db.category.findAll({
              attributes: ["id", "name"],
              include: [{
                model: _models.db.SubCategory,
                include: [{
                  model: _models.db.SubChildCategory
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context21.next = 7;
            break;
          case 4:
            _context21.prev = 4;
            _context21.t0 = _context21["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 4]]);
    }))();
  },
  getAllSubCategoryById: function getAllSubCategoryById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            _models.db.product.findAll({
              where: {
                subCategoryId: req.body.subId
              }
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context22.next = 7;
            break;
          case 4:
            _context22.prev = 4;
            _context22.t0 = _context22["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[0, 4]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9yZXF1aXJlIiwiT3AiLCJfZGVmYXVsdCIsImFkZENhdGVnb3J5IiwicmVxIiwicmVzIiwibmV4dCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwibmFtZSIsInNsdWciLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwiZGIiLCJjYXRlZ29yeSIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJkYXRhIiwidXBkYXRlIiwiaWQiLCJjcmVhdGUiLCJzdGF0dXMiLCJqc29uIiwibXNnIiwiZXJyIiwidDAiLCJSZXF1ZXN0RXJyb3IiLCJzdG9wIiwiYWRkU3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMiIsIl9yZXEkYm9keTIiLCJjYXRlZ29yeUlkIiwic3ViX25hbWUiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJTdWJDYXRlZ29yeSIsImFkZFN1YkNoaWxkQ2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkYm9keTMiLCJzdWJjYXRlZ29yeUlkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiU3ViQ2hpbGRDYXRlZ29yeSIsInVwZGF0ZUNhdGVnb3J5IiwiX2NhbGxlZTQiLCJfcmVxJGJvZHk0IiwiY2hpbGRjYXRlZ29yeUlkIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZ2V0Q2F0ZWdvcnlMaXN0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsImluY2x1ZGUiLCJtb2RlbCIsImxpc3QiLCJnZXRDYXRlZ29yeUxpc3RIZWFkZXIiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpbWl0IiwiZSIsImdldFN1YkNhdGVnb3J5TGlzdCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwicXVlcnkiLCJnZXRTdWJDaGlsZENhdGVnb3J5TGlzdCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0TGlzdCIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiZ2V0Q2F0ZWdvcnlCeUlkIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJnZXRNYWluTGlzdCIsIl9jYWxsZWUxMSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwiY29uc29sZSIsImxvZyIsImdldE1haW5MaXN0VXBkYXRlIiwiX2NhbGxlZTEyIiwiX3JlcSRib2R5NSIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZ2V0U3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsImdldFN1YkNhdExpc3RVcGRhdGUiLCJfY2FsbGVlMTQiLCJfcmVxJGJvZHk2IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJnZXREZWxldGVkU3ViQ2F0TGlzdCIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicGFyc2VJbnQiLCJkZXN0cm95IiwicmUiLCJkZWxldGVDYXRlZ29yeSIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiciIsImdldEFsbENhdGVnb3J5QnlTbHVnIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJmaWx0ZXJCeUNhdGVnb3J5TGlzdCIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwicHJvZHVjdCIsImNoaWxkQ2F0ZWdvcnlJZCIsInBhcmFtcyIsImdldEZpbHRlcmJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMTkiLCJfcmVxJGJvZHk3IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJnZXRQcm9kdWN0QnlTdWJjYXRlZ29yeSIsIl9jYWxsZWUyMCIsIl9yZXEkYm9keTgiLCJzZWFyY2giLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsIm9yZGVyIiwicmVxdWlyZWQiLCJfZGVmaW5lUHJvcGVydHkyIiwib3IiLCJsaWtlIiwic3ViQ2F0ZWdvcnlJZCIsImdldEFsbE1vYmlsZUNhdGVnb3J5IiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJnZXRBbGxTdWJDYXRlZ29yeUJ5SWQiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsInN1YklkIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2NhdGVnb3J5L2NhdGVnb3J5LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xyXG5jb25zdCB7IE9wIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cclxuICAgIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xyXG5cclxuICAgIGFzeW5jIGFkZENhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBzbHVnIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IG5hbWU6IG5hbWUgfSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmNhdGVnb3J5LnVwZGF0ZSh7IHNsdWc6IHNsdWcgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS5jcmVhdGUoeyBuYW1lOiBuYW1lLCBzbHVnOiBzbHVnIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGNhdGVnb3J5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYXN5bmMgYWRkU3ViQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGNhdGVnb3J5SWQsIHN1Yl9uYW1lIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IHN1Yl9uYW1lOiBzdWJfbmFtZSB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBhbHJlYWR5IGV4aXN0JywgNDA5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LmNyZWF0ZSh7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsIHN1Yl9uYW1lOiBzdWJfbmFtZSB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGNhdGVnb3J5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBjYXRlZ29yeVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgYWRkU3ViQ2hpbGRDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgc3ViY2F0ZWdvcnlJZCwgbmFtZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLlN1YkNoaWxkQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IG5hbWU6IG5hbWUgfSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignQ2F0ZWdvcnkgYWxyZWFkeSBleGlzdCcsIDQwOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDaGlsZENhdGVnb3J5LmNyZWF0ZSh7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsIHN1YmNhdGVnb3J5SWQ6IHN1YmNhdGVnb3J5SWQsIG5hbWU6IG5hbWUgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgY2F0ZWdvcnlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyB1cGRhdGVDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRjYXRlZ29yeUlkLCBzdWJjYXRlZ29yeUlkLCBzdWJfbmFtZSwgbmFtZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogc3ViY2F0ZWdvcnlJZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkudXBkYXRlKHsgc3ViX25hbWU6IHN1Yl9uYW1lIH0sIHsgd2hlcmU6IHsgaWQ6IHN1YmNhdGVnb3J5SWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBOb3QgRm91bmQnLCA0MDkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGNoaWxkY2F0ZWdvcnlJZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2hpbGRDYXRlZ29yeS51cGRhdGUoeyBuYW1lOiBuYW1lIH0sIHsgd2hlcmU6IHsgaWQ6IGNoaWxkY2F0ZWdvcnlJZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IE5vdCBGb3VuZCcsIDQwOSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWRcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDYXRlZ29yeSB9XSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRDYXRlZ29yeUxpc3RIZWFkZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGxpbWl0OiAzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGxpc3Q9PiByZXMuc3RhdHVzKDIwMCkuanNvbih7J3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0fSkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlPT4gbmV4dChlKSlcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRTdWJDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkIH0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRTdWJDaGlsZENhdGVnb3J5TGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3ViY2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViY2F0ZWdvcnlJZDogc3ViY2F0ZWdvcnlJZCB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldENhdGVnb3J5QnlJZChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeUlkID0gcmVxLnF1ZXJ5LmNhdGVnb3J5SWQ7XHJcbiAgICAgICAgICAgIGRiLlN1YkNoaWxkQ2F0ZWdvcnkuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkIH0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFsnaWQnLCAnc3ViX25hbWUnXSwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0gfV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2F0ZWdvcnkgbGlzdFxyXG4gICAgYXN5bmMgZ2V0TWFpbkxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldE1haW5MaXN0VXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBpZCwgbmFtZSwgc2x1ZyB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmNhdGVnb3J5LnVwZGF0ZSh7IG5hbWU6IG5hbWUsIHNsdWc6IHNsdWcgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IGlzIG5vdCBmb3VuZCcpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWQgY2F0ZWdvcnlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU3ViIGNhdGVnb3J5IGxpc3RcclxuICAgIGFzeW5jIGdldFN1YkNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFN1YkNhdExpc3RVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGlkLCBzdWJfbmFtZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LnVwZGF0ZSh7IHN1Yl9uYW1lOiBzdWJfbmFtZSB9LCB7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignU3ViX0NhdGVnb3J5IGlzIG5vdCBmb3VuZCcpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWQgU3ViX0NhdGVnb3J5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXREZWxldGVkU3ViQ2F0TGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignSWQgaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ21zZyc6ICdzdWNjZXNzJywgJ3N0YXR1cyc6IFwiZGVsZXRlZCBTdWJfQ2F0ZWdvcnkgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy9jaGlsZCBjYXRlZ29yeSBcclxuICAgIGFzeW5jIGRlbGV0ZUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KS50aGVuKHIgPT4gW3IsIGRhdGFdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignY2hpbGRfY2F0ZWdvcnkgaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N0YXR1cyc6IFwiZGVsZXRlZCBjYXRlZ29yeSBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRBbGxDYXRlZ29yeUJ5U2x1ZyhyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LCBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSB9XSB9XVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZmlsdGVyQnlDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgY2hpbGRDYXRlZ29yeUlkOiByZXEucGFyYW1zLmlkIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldEZpbHRlcmJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgeyBpZCwgbmFtZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBpZCwgc3ViX25hbWU6IG5hbWUgfSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5IH1dXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldFByb2R1Y3RCeVN1YmNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHsgaWQsIG5hbWUgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICBsZXQgc2VhcmNoID0gJyUlJztcclxuICAgICAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaCA9ICclJyArIG5hbWUgKyAnJSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxyXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3tcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCwgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLCByZXF1aXJlZDogdHJ1ZSwgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgW09wLm9yXTogW3sgbmFtZTogeyBbT3AubGlrZV06IHNlYXJjaCB9LCBzdWJDYXRlZ29yeUlkOiBpZCB9XSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL21vYmlsZVxyXG4gICAgYXN5bmMgZ2V0QWxsTW9iaWxlQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDYXRlZ29yeSwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnkgfV0gfV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0QWxsU3ViQ2F0ZWdvcnlCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IHJlcS5ib2R5LnN1YklkIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn1cclxuXHJcblxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxRQUFBLEdBQWVELE9BQU8sQ0FBQyxXQUFXLENBQUM7RUFBM0JFLEVBQUUsR0FBQUQsUUFBQSxDQUFGQyxFQUFFO0FBQTBCLElBQUFDLFFBQUEsR0FFckI7RUFFWCw0REFFTUMsV0FBVyxXQUFBQSxZQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEs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