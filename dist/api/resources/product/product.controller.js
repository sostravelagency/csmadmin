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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _require = require("sequelize"),
  Op = _require.Op,
  Sequelize = _require.Sequelize;
// import { queue } from '../../../kue';
var _default = {
  /* Add user api start here................................*/getPhotoProduct: function getPhotoProduct(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var productId;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            productId = req.query.productId;
            _models.db.productphoto.findAll({
              where: {
                productId: productId
              }
            }).then(function (product) {
              return res.status(200).json({
                ok: true,
                data: product
              });
            });
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  addProduct: function addProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage;
            _models.db.product.create({
              categoryId: categoryId,
              subCategoryId: subCategoryId,
              childCategoryId: childCategoryId || 0,
              name: name,
              slug: slug,
              status: parseInt(status) ? "active" : "inactive",
              brand: brand,
              unitSize: unitSize,
              sortDesc: sortDesc,
              desc: desc,
              buyerPrice: buyerPrice,
              price: price,
              qty: qty,
              discount: discount,
              discountPer: discountPer,
              total: total,
              netPrice: netPrice,
              photo: req.file ? req.file.path : ""
            }).then(function (product) {
              var _JSON$parse, _JSON$parse3;
              (_JSON$parse = JSON.parse(image)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.map(function (item) {
                return _models.db.productphoto.create({
                  imgUrl: item === null || item === void 0 ? void 0 : item.path,
                  productId: product.dataValues.id
                });
              });
              if (newaddimage) {
                var _JSON$parse2;
                (_JSON$parse2 = JSON.parse(newaddimage)) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.map(function (item) {
                  return _models.db.productphoto.create({
                    imgUrl: item === null || item === void 0 ? void 0 : item.imageUrl,
                    productId: product.dataValues.productId
                  });
                });
              }
              (_JSON$parse3 = JSON.parse(size)) === null || _JSON$parse3 === void 0 ? void 0 : _JSON$parse3.map(function (item) {
                return _models.db.productsize.create({
                  size: item === null || item === void 0 ? void 0 : item.size,
                  productId: product.dataValues.id,
                  amount: item === null || item === void 0 ? void 0 : item.amount
                });
              });
              res.status(200).json({
                success: true,
                msg: "Successfully inserted product"
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
            _context2.next = 8;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json(_context2.t0));
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 5]]);
    }))();
  },
  index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$query, supplierId, categoryId, subCategoryId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$query = req.query, supplierId = _req$query.supplierId, categoryId = _req$query.categoryId, subCategoryId = _req$query.subCategoryId;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              where: {
                supplierId: supplierId,
                categoryId: categoryId,
                subCategoryId: subCategoryId
              }
            }).then(function (product) {
              res.status(200).json({
                success: true,
                product: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }))();
  },
  getAllProductList: function getAllProductList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.SubCategory,
                attributes: ["id", "sub_name"],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                product: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context4.next = 7;
            break;
          case 4:
            _context4.prev = 4;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 4]]);
    }))();
  },
  update: function update(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage;
            _models.db.product.findOne({
              where: {
                id: productId
              }
            }).then(function (product) {
              if (product) {
                return _models.db.product.update({
                  categoryId: categoryId ? categoryId : product.categoryId,
                  subCategoryId: subCategoryId ? subCategoryId : product.subCategoryId,
                  childCategoryId: childCategoryId ? childCategoryId : product.childCategoryId,
                  name: name,
                  slug: slug,
                  status: parseInt(status) ? "active" : "inactive",
                  brand: brand,
                  unitSize: unitSize,
                  desc: desc,
                  buyerPrice: buyerPrice,
                  price: price,
                  qty: qty,
                  discount: discount,
                  discountPer: discountPer,
                  total: total,
                  netPrice: netPrice,
                  photo: req.file ? req.file.location : product.photo
                }, {
                  where: {
                    id: productId
                  }
                });
              }
              throw new RequestError("Not Found Product", 409);
            }).then(function (p) {
              if (newaddimage) {
                var _JSON$parse4;
                (_JSON$parse4 = JSON.parse(newaddimage)) === null || _JSON$parse4 === void 0 ? void 0 : _JSON$parse4.map(function (item) {
                  return _models.db.productphoto.create({
                    imgUrl: item === null || item === void 0 ? void 0 : item.imageUrl,
                    productId: productId
                  });
                });
              }
              if (size) {
                _models.db.productsize.destroy({
                  where: {
                    productId: productId
                  }
                });
                _models.db.productsize.bulkCreate(JSON.parse(size).map(function (_ref) {
                  var size = _ref.size,
                    amount = _ref.amount;
                  return {
                    size: size,
                    amount: amount,
                    productId: productId
                  };
                }));
              }
              if (images) {
                _models.db.productphoto.destroy({
                  where: {
                    productId: productId
                  }
                });
                _models.db.productphoto.bulkCreate(JSON.parse(images).map(function (item) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    productId: productId
                  });
                }));
              }
              res.status(200).json({
                success: true,
                msg: "Updated Successfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 8;
            break;
          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 5]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              where: {
                categoryId: req.query.categoryId,
                subCategoryId: req.query.subCategoryId
              }
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.product.findAll({
              where: {
                id: req.query.id
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            }).then(function (list) {
              res.status(200).json({
                success: true,
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
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 4]]);
    }))();
  },
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var size;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context8.sent;
            _models.db.product.findOne({
              where: {
                id: req.query.id
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list,
                datasize: size
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 10;
            break;
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body3 = req.body, productId = _req$body3.productId, qty = _req$body3.qty, discount_per = _req$body3.discount_per, discount_price = _req$body3.discount_price, total = _req$body3.total, net_price = _req$body3.net_price;
            _models.db.ProductOffer.findOne({
              where: {
                id: productId
              }
            }).then(function (list) {
              if (!list) {
                return _models.db.ProductOffer.create({
                  productId: productId,
                  image: req.file ? req.file.location : "",
                  qty: qty,
                  discount_per: discount_per,
                  discount_price: discount_price,
                  total: total,
                  net_price: net_price
                });
              } else {
                return _models.db.ProductOffer.update({
                  qty: qty,
                  discount_per: discount_per,
                  discount_price: discount_price,
                  total: total,
                  net_price: net_price
                }, {
                  where: {
                    id: list.id
                  }
                });
              }
            }).then(function (p) {
              res.status(200).json({
                success: true,
                msg: "Successfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 8;
            break;
          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _models.db.ProductOffer.findAll({
              include: [{
                model: _models.db.product,
                attributes: ["id", "categoryId", "price", "item_name", "description", "brand"],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 7;
            break;
          case 4:
            _context10.prev = 4;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 4]]);
    }))();
  },
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: req.body.subCat
              }
            }).then(function (data) {
              if (data) {
                return _models.db.product.findAll({
                  where: {
                    subCategoryId: data.id
                  }
                });
              }
            }).then(function (list) {
              console.log(JSON.stringify(list));
              res.status(200).json({
                success: true,
                data: list
              });
            });
            _context11.next = 7;
            break;
          case 4:
            _context11.prev = 4;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 4]]);
    }))();
  },
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _models.db.product.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.product.destroy({
                  where: {
                    id: product.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _models.db.ProductOffer.findOne({
              where: {
                id: parseInt(req.params.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.ProductOffer.destroy({
                  where: {
                    id: product.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            attachmentEntries = [];
            productId = req.body.productId;
            for (i = 0; i < req.files.length; i++) {
              attachmentEntries.push({
                productId: productId,
                name: req.files[i].filename,
                mime: req.files[i].mimetype,
                imgUrl: req.files[i].path
              });
            }
            _models.db.product.findOne({
              where: {
                id: productId
              }
            }).then(function (r) {
              if (r) {
                // return queue.create('img-upload', {
                //     productId: productId,
                //     productName: r.item_name,
                //     attachmentEntries: attachmentEntries,
                // }).save();
                for (var i = 0; i < req.files.length; i++) {
                  _models.db.productphoto.create(_objectSpread({}, attachmentEntries[i]));
                }
              }
            }).then(function (r) {
              res.status(200).json({
                success: true,
                data: req.files
              });
            })["catch"](function (error) {
              console.log(error);
              res.status(500).json({
                errors: ["Error insert photo"]
              });
            });
          case 4:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              attributes: ["id", "name", "brand"],
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            }).then(function (data) {
              res.status(200).json({
                success: true,
                data: data
              });
            })["catch"](function (err) {
              next(err);
            });
            _context15.next = 7;
            break;
          case 4:
            _context15.prev = 4;
            _context15.t0 = _context15["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 4]]);
    }))();
  },
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _models.db.productphoto.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.productphoto.destroy({
                  where: {
                    id: req.query.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
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
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _models.db.product.findAll({
              // attributes: ["id", "slug"],
              // where: { discount: 'grocery-staple' },
              order: [["discountPer", "DESC"]],
              limit: 8
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product || []
              });
            })["catch"](function (err) {
              next(err);
            });
            _context17.next = 7;
            break;
          case 4:
            _context17.prev = 4;
            _context17.t0 = _context17["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 4]]);
    }))();
  },
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _models.db.category.findOne({
              attributes: ["id"],
              include: [{
                model: _models.db.product,
                order: [["createdAt", "DESC"]],
                include: [{
                  model: _models.db.productphoto,
                  attributes: ["id", "imgUrl"]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context18.next = 7;
            break;
          case 4:
            _context18.prev = 4;
            _context18.t0 = _context18["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var search;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            search = "%%";
            if (req.query.search) {
              search = "%" + req.query.search + "%";
            }
            _models.db.SubCategory.findAll({
              attributes: ["id", "sub_name"],
              include: [{
                model: _models.db.product,
                order: [["createdAt", "DESC"]],
                required: true,
                where: (0, _defineProperty2["default"])({}, Op.or, [{
                  name: (0, _defineProperty2["default"])({}, Op.like, search),
                  slug: (0, _defineProperty2["default"])({}, Op.like, search)
                }])
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context19.next = 9;
            break;
          case 6:
            _context19.prev = 6;
            _context19.t0 = _context19["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: req.body.name
              },
              include: [{
                model: _models.db.SubChildCategory,
                include: [{
                  model: _models.db.product,
                  order: [["createdAt", "DESC"]],
                  include: [{
                    model: _models.db.productphoto,
                    attributes: ["id", "imgUrl"]
                  }]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context20.next = 7;
            break;
          case 4:
            _context20.prev = 4;
            _context20.t0 = _context20["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 4]]);
    }))();
  },
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            try {
              _req$body4 = req.body, id = _req$body4.id, imgUrl = _req$body4.imgUrl; // db.productphoto.destroy({where: {imgUrl, id}})
              // deleteFileFromS3(imgUrl)
              _models.db.productphoto.destroy({
                where: {
                  id: id
                }
              }).then(function (success) {
                res.status(200).json({
                  success: true,
                  msg: "Successflly deleted image from s3 Bucket"
                });
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context21.stop();
        }
      }, _callee21);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            try {
              _req$body5 = req.body, subCategoryId = _req$body5.subCategoryId, childCategoryId = _req$body5.childCategoryId;
              _models.db.product.findAll({
                where: {
                  childCategoryId: childCategoryId,
                  subCategoryId: childCategoryId
                }
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            try {
              // const{ subCategoryId, childCategoryId } = req.body;
              _models.db.product.findAll({
                // where: { childCategoryId: childCategoryId, subCategoryId: childCategoryId },
                order: Sequelize.literal("RAND()"),
                limit: 8
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var productId;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            try {
              productId = req.query.productId;
              _models.db.productsize.findAll({
                where: {
                  productId: productId
                }
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });
            } catch (err) {
              next(err);
              res.status(500).json({
                success: false,
                msg: err
              });
            }
          case 1:
          case "end":
            return _context24.stop();
        }
      }, _callee24);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJpbmRleCIsIl9jYWxsZWUzIiwiX3JlcSRxdWVyeSIsInN1cHBsaWVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJvcmRlciIsIlJlcXVlc3RFcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJpbmNsdWRlIiwibW9kZWwiLCJTdWJDYXRlZ29yeSIsImF0dHJpYnV0ZXMiLCJjYXRlZ29yeSIsInVwZGF0ZSIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MiIsImltYWdlcyIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImZpbmRPbmUiLCJsb2NhdGlvbiIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpc3QiLCJnZXRQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4Iiwic2VudCIsImRhdGFzaXplIiwiYWRkUHJvZHVjdE9mZmVyIiwiX2NhbGxlZTkiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJQcm9kdWN0T2ZmZXIiLCJnZXRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTAiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsInNlYXJjaFByb2R1Y3RCeVN1YkNhdCIsIl9jYWxsZWUxMSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwic3ViX25hbWUiLCJzdWJDYXQiLCJzdHJpbmdpZnkiLCJwcm9kdWN0RGVsZXRlIiwiX2NhbGxlZTEyIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJyZSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIl9jYWxsZWUxMyIsIl9jYWxsZWUxMyQiLCJfY29udGV4dDEzIiwicGFyYW1zIiwibXVsdGlwbGVQaG90b1VwbG9hZCIsIl9jYWxsZWUxNCIsImF0dGFjaG1lbnRFbnRyaWVzIiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJmaWxlcyIsImZpbGVuYW1lIiwibWltZSIsIm1pbWV0eXBlIiwiciIsImVycm9yIiwiZXJyb3JzIiwiZ2V0QWxsUGhvdG8iLCJfY2FsbGVlMTUiLCJfY2FsbGVlMTUkIiwiX2NvbnRleHQxNSIsImRlbGV0ZVNsaWRlclBob3RvIiwiX2NhbGxlZTE2IiwiX2NhbGxlZTE2JCIsIl9jb250ZXh0MTYiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJfY2FsbGVlMTciLCJfY2FsbGVlMTckIiwiX2NvbnRleHQxNyIsImxpbWl0IiwiZ2V0QWxsUHJvZHVjdEJ5U2x1ZyIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwiZ2V0RmlsdGVyYnlQcm9kdWN0IiwiX2NhbGxlZTE5Iiwic2VhcmNoIiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJyZXF1aXJlZCIsIm9yIiwibGlrZSIsIkdldEFsbEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMjAiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJfY2FsbGVlMjEiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiLCJfY2FsbGVlMjIiLCJfcmVxJGJvZHk1IiwiX2NhbGxlZTIyJCIsIl9jb250ZXh0MjIiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsIl9jYWxsZWUyMyIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwibGl0ZXJhbCIsImdldFNpemVQcm9kdWN0IiwiX2NhbGxlZTI0IiwiX2NhbGxlZTI0JCIsIl9jb250ZXh0MjQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XHJcbmNvbnN0IHsgT3AsIFNlcXVlbGl6ZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcclxuLy8gaW1wb3J0IHsgcXVldWUgfSBmcm9tICcuLi8uLi8uLi9rdWUnO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXHJcbiAgYXN5bmMgZ2V0UGhvdG9Qcm9kdWN0KHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgYWRkUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGNhdGVnb3J5SWQsXHJcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzbHVnLFxyXG4gICAgICAgIGJyYW5kLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICB1bml0U2l6ZSxcclxuICAgICAgICBzb3J0RGVzYyxcclxuICAgICAgICBkZXNjLFxyXG4gICAgICAgIGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgcHJpY2UsXHJcbiAgICAgICAgcXR5LFxyXG4gICAgICAgIGRpc2NvdW50LFxyXG4gICAgICAgIGRpc2NvdW50UGVyLFxyXG4gICAgICAgIHRvdGFsLFxyXG4gICAgICAgIG5ldFByaWNlLFxyXG4gICAgICAgIGltYWdlLFxyXG4gICAgICAgIHNpemUsXHJcbiAgICAgICAgbmV3YWRkaW1hZ2UsXHJcbiAgICAgIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuY3JlYXRlKHtcclxuICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXHJcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfHwgMCxcclxuICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICBzbHVnOiBzbHVnLFxyXG4gICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcclxuICAgICAgICAgIGJyYW5kOiBicmFuZCxcclxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcclxuICAgICAgICAgIHNvcnREZXNjOiBzb3J0RGVzYyxcclxuICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxyXG4gICAgICAgICAgcHJpY2U6IHByaWNlLFxyXG4gICAgICAgICAgcXR5OiBxdHksXHJcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXHJcbiAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXHJcbiAgICAgICAgICB0b3RhbDogdG90YWwsXHJcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXHJcbiAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5wYXRoIDogXCJcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICBKU09OLnBhcnNlKGltYWdlKT8ubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcclxuICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LnBhdGgsXHJcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XHJcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMucHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBKU09OLnBhcnNlKHNpemUpPy5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgc2l6ZTogaXRlbT8uc2l6ZSxcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgICBhbW91bnQ6IGl0ZW0/LmFtb3VudCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXNcclxuICAgICAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBwcm9kdWN0XCIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBzdXBwbGllcklkLCBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkIH0gPSByZXEucXVlcnk7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdExpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXHJcbiAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIHByb2R1Y3RJZCxcclxuICAgICAgICBjYXRlZ29yeUlkLFxyXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgc2x1ZyxcclxuICAgICAgICBicmFuZCxcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgdW5pdFNpemUsXHJcbiAgICAgICAgZGVzYyxcclxuICAgICAgICBidXllclByaWNlLFxyXG4gICAgICAgIHByaWNlLFxyXG4gICAgICAgIHF0eSxcclxuICAgICAgICBkaXNjb3VudCxcclxuICAgICAgICBkaXNjb3VudFBlcixcclxuICAgICAgICB0b3RhbCxcclxuICAgICAgICBuZXRQcmljZSxcclxuICAgICAgICBpbWFnZXMsXHJcbiAgICAgICAgc2l6ZSxcclxuICAgICAgICBuZXdhZGRpbWFnZSxcclxuICAgICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA/IHN1YkNhdGVnb3J5SWRcclxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA/IGNoaWxkQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHNsdWc6IHNsdWcsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxyXG4gICAgICAgICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgICAgICAgICBwcmljZTogcHJpY2UsXHJcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcclxuICAgICAgICAgICAgICAgIHBob3RvOiByZXEuZmlsZSA/IHJlcS5maWxlLmxvY2F0aW9uIDogcHJvZHVjdC5waG90byxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJOb3QgRm91bmQgUHJvZHVjdFwiLCA0MDkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHApID0+IHtcclxuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xyXG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2l6ZSkge1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5kZXN0cm95KHtcclxuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmJ1bGtDcmVhdGUoXHJcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XHJcbiAgICAgICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50LFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGltYWdlcykge1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XHJcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKFxyXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxyXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc2l6ZSA9IGF3YWl0IGRiLnByb2R1Y3RzaXplLmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxyXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIHF0eSwgZGlzY291bnRfcGVyLCBkaXNjb3VudF9wcmljZSwgdG90YWwsIG5ldF9wcmljZSB9ID1cclxuICAgICAgICByZXEuYm9keTtcclxuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFsaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgcXR5OiBxdHksXHJcbiAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXHJcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxyXG4gICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLnVwZGF0ZShcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxyXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxyXG4gICAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHApID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgIFwiaWRcIixcclxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcclxuICAgICAgICAgICAgICBcInByaWNlXCIsXHJcbiAgICAgICAgICAgICAgXCJpdGVtX25hbWVcIixcclxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgICAgXCJicmFuZFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IGRhdGEuaWQgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBkYi5wcm9kdWN0XHJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocmUpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgcHJvZHVjdE9mZmVyRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucGFyYW1zLmlkKSB9IH0pXHJcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGFzeW5jIG11bHRpcGxlUGhvdG9VcGxvYWQocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGxldCBhdHRhY2htZW50RW50cmllcyA9IFtdO1xyXG4gICAgdmFyIHByb2R1Y3RJZCA9IHJlcS5ib2R5LnByb2R1Y3RJZDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGF0dGFjaG1lbnRFbnRyaWVzLnB1c2goe1xyXG4gICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgIG5hbWU6IHJlcS5maWxlc1tpXS5maWxlbmFtZSxcclxuICAgICAgICBtaW1lOiByZXEuZmlsZXNbaV0ubWltZXR5cGUsXHJcbiAgICAgICAgaW1nVXJsOiByZXEuZmlsZXNbaV0ucGF0aCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGIucHJvZHVjdFxyXG4gICAgICAuZmluZE9uZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAvLyByZXR1cm4gcXVldWUuY3JlYXRlKCdpbWctdXBsb2FkJywge1xyXG4gICAgICAgICAgLy8gICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgLy8gICAgIHByb2R1Y3ROYW1lOiByLml0ZW1fbmFtZSxcclxuICAgICAgICAgIC8vICAgICBhdHRhY2htZW50RW50cmllczogYXR0YWNobWVudEVudHJpZXMsXHJcbiAgICAgICAgICAvLyB9KS5zYXZlKCk7XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHsgLi4uYXR0YWNobWVudEVudHJpZXNbaV0gfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLmZpbGVzIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbXCJFcnJvciBpbnNlcnQgcGhvdG9cIl0gfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldEFsbFBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiLCBcImJyYW5kXCJdLFxyXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZGVsZXRlU2xpZGVyUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGRiLnByb2R1Y3RwaG90b1xyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcclxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChyZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIC8vQWxsIEdyb2NlcnlTdGFtcGxlIHByb2R1Y3RcclxuICAvLyBlZGl0IHRvIHNhbGUgcHJvZHVjdFxyXG4gIGFzeW5jIGdldEFsbEdyb2NlcnJ5U3RhcGxlcyhyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic2x1Z1wiXSxcclxuICAgICAgICAgIC8vIHdoZXJlOiB7IGRpc2NvdW50OiAnZ3JvY2VyeS1zdGFwbGUnIH0sXHJcbiAgICAgICAgICBvcmRlcjogW1tcImRpc2NvdW50UGVyXCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgICBsaW1pdDogOCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfHwgW10gfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBnZXRBbGxQcm9kdWN0QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5jYXRlZ29yeVxyXG4gICAgICAgIC5maW5kT25lKHtcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCJdLFxyXG4gICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gZmlsdGVyIHByb2R1Y3RcclxuXHJcbiAgYXN5bmMgZ2V0RmlsdGVyYnlQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgc2VhcmNoID0gXCIlJVwiO1xyXG4gICAgICBpZiAocmVxLnF1ZXJ5LnNlYXJjaCkge1xyXG4gICAgICAgIHNlYXJjaCA9IFwiJVwiICsgcmVxLnF1ZXJ5LnNlYXJjaCArIFwiJVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgW09wLm9yXTogW1xyXG4gICAgICAgICAgICAgICAgeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHNsdWc6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSB9LFxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBHZXRBbGxCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkubmFtZSB9LFxyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnksXHJcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gYXdzIGltYWdlIGRlbGV0ZVxyXG4gIGFzeW5jIGF3c1Byb2R1Y3RQaG90b0RlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCwgaW1nVXJsIH0gPSByZXEuYm9keTtcclxuICAgICAgLy8gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe3doZXJlOiB7aW1nVXJsLCBpZH19KVxyXG4gICAgICAvLyBkZWxldGVGaWxlRnJvbVMzKGltZ1VybClcclxuXHJcbiAgICAgIGRiLnByb2R1Y3RwaG90b1xyXG4gICAgICAgIC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcclxuXHJcbiAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcclxuICAgICAgICAgIHJlc1xyXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAgICAgLmpzb24oe1xyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgbXNnOiBcIlN1Y2Nlc3NmbGx5IGRlbGV0ZWQgaW1hZ2UgZnJvbSBzMyBCdWNrZXRcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWJDaGlsZENhdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXHJcbiAgICAgICAgICBvcmRlcjogU2VxdWVsaXplLmxpdGVyYWwoXCJSQU5EKClcIiksXHJcbiAgICAgICAgICBsaW1pdDogOCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRTaXplUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgZGIucHJvZHVjdHNpemVcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUFxQyxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEs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