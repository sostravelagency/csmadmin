"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _uuid = require("uuid");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var _default = {
  /* Add user api start here................................*/index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var id, _req$body, storename, status, shopaddress, shopdesc, ownername, owneraddress, email, password, phone, areaId, accountNo, accountHolderName, IFSC, bankName, branch, adharCardNo, panCardNo, GSTNo;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = (0, _uuid.v4)();
            _req$body = req.body, storename = _req$body.storename, status = _req$body.status, shopaddress = _req$body.shopaddress, shopdesc = _req$body.shopdesc, ownername = _req$body.ownername, owneraddress = _req$body.owneraddress, email = _req$body.email, password = _req$body.password, phone = _req$body.phone, areaId = _req$body.areaId, accountNo = _req$body.accountNo, accountHolderName = _req$body.accountHolderName, IFSC = _req$body.IFSC, bankName = _req$body.bankName, branch = _req$body.branch, adharCardNo = _req$body.adharCardNo, panCardNo = _req$body.panCardNo, GSTNo = _req$body.GSTNo;
            _models.db.vendor.findOne({
              where: {
                id: id
              }
            }).then(function (supplier) {
              if (supplier) {
                return _models.db.vendor.update({
                  storename: storename ? storename : supplier.storename,
                  status: status ? status : supplier.status,
                  shopaddress: shopaddress ? shopaddress : supplier.shopaddress,
                  shopdesc: shopdesc ? shopdesc : supplier.shopdesc,
                  ownername: ownername ? ownername : supplier.ownername,
                  owneraddress: owneraddress ? owneraddress : supplier.owneraddress,
                  email: email ? email : supplier.email,
                  phone: phone ? phone : supplier.phone,
                  accountNo: accountNo ? accountNo : supplier.accountNo,
                  accountHolderName: accountHolderName ? accountHolderName : supplier.accountHolderName,
                  IFSC: IFSC ? IFSC : supplier.IFSC,
                  bankName: bankName ? bankName : supplier.bankName,
                  branch: branch ? branch : supplier.branch,
                  adharCardNo: adharCardNo ? adharCardNo : supplier.adharCardNo,
                  panCardNo: panCardNo ? panCardNo : supplier.panCardNo,
                  GSTNo: GSTNo ? GSTNo : supplier.GSTNo
                }, {
                  where: {
                    id: id
                  }
                });
              }
              return _models.db.vendor.create({
                storename: storename,
                status: status,
                shopaddress: shopaddress,
                shopdesc: shopdesc,
                ownername: ownername,
                owneraddress: owneraddress,
                email: email,
                password: password,
                phone: phone,
                accountNo: accountNo,
                accountHolderName: accountHolderName,
                IFSC: IFSC,
                bankName: bankName,
                branch: branch,
                adharCardNo: adharCardNo,
                panCardNo: panCardNo,
                GSTNo: GSTNo
              });
            }).then(function (vendor) {
              if (areaId) {
                var areaList = [];
                for (var i = 0; i < areaId.length; i++) {
                  areaList.push({
                    vendorId: vendor.id,
                    areaId: areaId[i]
                  });
                }
                return _models.db.vendor_area.bulkCreate(areaList);
              }
              return true;
            }).then(function (success) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted supplier"
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
            _context.next = 10;
            break;
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            throw new RequestError('Error');
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }))();
  },
  vendorAddProduct: function vendorAddProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$body2, supplierId, productId, unitSize, buyerPrice, id;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, supplierId = _req$body2.supplierId, productId = _req$body2.productId, unitSize = _req$body2.unitSize, buyerPrice = _req$body2.buyerPrice;
            id = productId;
            _models.db.vendor_product.findAll({
              where: {
                supplierId: supplierId,
                productId: productId,
                unitSize: unitSize
              }
            }).then(function (data) {
              if (!data.length > 0) {
                return _models.db.vendor_product.create({
                  supplierId: supplierId,
                  productId: productId,
                  unitSize: unitSize,
                  price: buyerPrice
                });
              } else {
                return _models.db.vendor_product.update({
                  unitSize: unitSize ? unitSize : data.unitSize,
                  price: buyerPrice ? buyerPrice : data.buyerPrice
                }, {
                  where: {
                    supplierId: supplierId,
                    productId: productId
                  }
                });
              }
            }).then(function (success) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted product in VendorList"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context2.next = 9;
            break;
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            throw new RequestError('Error');
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 6]]);
    }))();
  },
  getAllvendor: function getAllvendor(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _models.db.vendor.findAll({
              include: [{
                model: _models.db.area,
                attributes: ["id", "name"],
                include: [{
                  model: _models.db.location,
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
            _context3.next = 7;
            break;
          case 4:
            _context3.prev = 4;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 4]]);
    }))();
  },
  getAllVendorProduct: function getAllVendorProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _models.db.product.findAll({
              attributes: ["id", "name", "brand"],
              include: [{
                model: _models.db.vendor_product,
                attributes: ["id", "supplierId", "productId", "unitSize", "price"],
                include: [{
                  model: _models.db.vendor,
                  attributes: ["id", "storename", "ownername"]
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
            _context4.next = 7;
            break;
          case 4:
            _context4.prev = 4;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 4]]);
    }))();
  },
  getProductByVendor: function getProductByVendor(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _models.db.vendor_product.findAll({
              attributes: ["id", "supplierId", "productId", "unitSize", "price"],
              where: {
                supplierId: req.body.id
              },
              include: [{
                model: _models.db.product,
                attributes: ["id", "name", "brand", "photo", "status"]
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
  vendorUpdate: function vendorUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _req$body3, id, storename, status, shopaddress, shopdesc, ownername, owneraddress, email, password, phone;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, id = _req$body3.id, storename = _req$body3.storename, status = _req$body3.status, shopaddress = _req$body3.shopaddress, shopdesc = _req$body3.shopdesc, ownername = _req$body3.ownername, owneraddress = _req$body3.owneraddress, email = _req$body3.email, password = _req$body3.password, phone = _req$body3.phone;
            _models.db.vendor.findOne({
              where: {
                id: id
              }
            }).then(function (list) {
              if (list) {
                return _models.db.vendor.update({
                  storename: storename,
                  status: parseInt(status) ? 'active' : 'inactive',
                  shopaddress: shopaddress ? shopaddress : list.shopaddress,
                  shopdesc: shopdesc ? shopdesc : list.shopdesc,
                  ownername: ownername ? ownername : list.ownername,
                  owneraddress: owneraddress ? owneraddress : list.owneraddress,
                  email: email ? email : list.email,
                  password: password ? password : list.password,
                  phone: phone ? phone : list.phone
                }, {
                  where: {
                    id: id
                  }
                });
              }
              throw new RequestError("No data found", 409);
            }).then(function (e) {
              res.status(200).json({
                'success': true,
                msg: 'Updated Successfully'
              });
            })["catch"](function (err) {
              next(err);
            });
            _context6.next = 8;
            break;
          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 5]]);
    }))();
  },
  vendorDelete: function vendorDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.vendor.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (data) {
              if (data) {
                return _models.db.vendor.destroy({
                  where: {
                    id: data.id
                  }
                });
              }
              throw new RequestError('Sellar is not found');
            }).then(function (re) {
              return res.status(200).json({
                success: true,
                'status': "deleted Product Seccessfully"
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
  vendorProductDelete: function vendorProductDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            console.log("hi", req.body);
            _models.db.vendor_product.findOne({
              where: {
                id: req.body.id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.vendor_product.destroy({
                  where: {
                    id: req.body.id
                  }
                });
              }
              throw new RequestError('Product is not found');
            }).then(function (re) {
              return res.status(200).json({
                success: true,
                'status': "Seccessfully deleted Product from Vendorlist"
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
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl91dWlkIiwiU2VxdWVsaXplIiwiT3AiLCJfZGVmYXVsdCIsImluZGV4IiwicmVxIiwicmVzIiwibmV4dCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiaWQiLCJfcmVxJGJvZHkiLCJzdG9yZW5hbWUiLCJzdGF0dXMiLCJzaG9wYWRkcmVzcyIsInNob3BkZXNjIiwib3duZXJuYW1lIiwib3duZXJhZGRyZXNzIiwiZW1haWwiLCJwYXNzd29yZCIsInBob25lIiwiYXJlYUlkIiwiYWNjb3VudE5vIiwiYWNjb3VudEhvbGRlck5hbWUiLCJJRlNDIiwiYmFua05hbWUiLCJicmFuY2giLCJhZGhhckNhcmRObyIsInBhbkNhcmRObyIsIkdTVE5vIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwidjQiLCJib2R5IiwiZGIiLCJ2ZW5kb3IiLCJmaW5kT25lIiwid2hlcmUiLCJ0aGVuIiwic3VwcGxpZXIiLCJ1cGRhdGUiLCJjcmVhdGUiLCJhcmVhTGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmVuZG9ySWQiLCJ2ZW5kb3JfYXJlYSIsImJ1bGtDcmVhdGUiLCJzdWNjZXNzIiwianNvbiIsIm1zZyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJ0MCIsIlJlcXVlc3RFcnJvciIsInN0b3AiLCJ2ZW5kb3JBZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkyIiwic3VwcGxpZXJJZCIsInByb2R1Y3RJZCIsInVuaXRTaXplIiwiYnV5ZXJQcmljZSIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInZlbmRvcl9wcm9kdWN0IiwiZmluZEFsbCIsImRhdGEiLCJwcmljZSIsImdldEFsbHZlbmRvciIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiaW5jbHVkZSIsIm1vZGVsIiwiYXJlYSIsImF0dHJpYnV0ZXMiLCJsb2NhdGlvbiIsImxpc3QiLCJnZXRBbGxWZW5kb3JQcm9kdWN0IiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJwcm9kdWN0IiwiZ2V0UHJvZHVjdEJ5VmVuZG9yIiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJ2ZW5kb3JVcGRhdGUiLCJfY2FsbGVlNiIsIl9yZXEkYm9keTMiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJwYXJzZUludCIsImUiLCJ2ZW5kb3JEZWxldGUiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsInF1ZXJ5IiwiZGVzdHJveSIsInJlIiwidmVuZG9yUHJvZHVjdERlbGV0ZSIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3ZlbmRvci92ZW5kb3IuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7djQgfSBmcm9tIFwidXVpZFwiXHJcbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XHJcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvKiBBZGQgdXNlciBhcGkgc3RhcnQgaGVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKi9cclxuXHJcbiAgICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkPSB2NCgpXHJcbiAgICAgICAgICAgIGNvbnN0IHsgIHN0b3JlbmFtZSwgc3RhdHVzLCBzaG9wYWRkcmVzcywgc2hvcGRlc2MsIG93bmVybmFtZSwgb3duZXJhZGRyZXNzLCBlbWFpbCxwYXNzd29yZCwgcGhvbmUsIGFyZWFJZCwgYWNjb3VudE5vLCBhY2NvdW50SG9sZGVyTmFtZSwgSUZTQywgYmFua05hbWUsIGJyYW5jaCwgYWRoYXJDYXJkTm8sIHBhbkNhcmRObywgR1NUTm8gfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICBkYi52ZW5kb3IuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZH0gfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHN1cHBsaWVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcGxpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnZlbmRvci51cGRhdGUoe3N0b3JlbmFtZTogc3RvcmVuYW1lID8gc3RvcmVuYW1lOiBzdXBwbGllci5zdG9yZW5hbWUsIHN0YXR1czogc3RhdHVzID8gc3RhdHVzOiBzdXBwbGllci5zdGF0dXMsIHNob3BhZGRyZXNzOiBzaG9wYWRkcmVzcyA/IHNob3BhZGRyZXNzOiBzdXBwbGllci5zaG9wYWRkcmVzcywgc2hvcGRlc2M6IHNob3BkZXNjID8gc2hvcGRlc2M6IHN1cHBsaWVyLnNob3BkZXNjLCBvd25lcm5hbWU6IG93bmVybmFtZSA/IG93bmVybmFtZTogc3VwcGxpZXIub3duZXJuYW1lLCBvd25lcmFkZHJlc3M6IG93bmVyYWRkcmVzcyA/IG93bmVyYWRkcmVzcyA6IHN1cHBsaWVyLm93bmVyYWRkcmVzcywgZW1haWw6IGVtYWlsID8gZW1haWw6IHN1cHBsaWVyLmVtYWlsLCBwaG9uZTogcGhvbmUgPyBwaG9uZTogc3VwcGxpZXIucGhvbmUsIGFjY291bnRObzogYWNjb3VudE5vID8gYWNjb3VudE5vIDogc3VwcGxpZXIuYWNjb3VudE5vLCBhY2NvdW50SG9sZGVyTmFtZTogYWNjb3VudEhvbGRlck5hbWUgPyBhY2NvdW50SG9sZGVyTmFtZTogc3VwcGxpZXIuYWNjb3VudEhvbGRlck5hbWUsIElGU0M6IElGU0MgPyBJRlNDOiBzdXBwbGllci5JRlNDLCBiYW5rTmFtZTogYmFua05hbWUgPyBiYW5rTmFtZTogc3VwcGxpZXIuYmFua05hbWUsIGJyYW5jaDogYnJhbmNoID8gYnJhbmNoIDogc3VwcGxpZXIuYnJhbmNoLCBhZGhhckNhcmRObzogYWRoYXJDYXJkTm8gPyBhZGhhckNhcmRObzogc3VwcGxpZXIuYWRoYXJDYXJkTm8sIHBhbkNhcmRObzogcGFuQ2FyZE5vID8gcGFuQ2FyZE5vOiBzdXBwbGllci5wYW5DYXJkTm8sIEdTVE5vOiBHU1RObz8gR1NUTm86IHN1cHBsaWVyLkdTVE5vfSwge3doZXJlOnsgaWQ6IGlkfX0gKSBcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi52ZW5kb3IuY3JlYXRlKHtzdG9yZW5hbWU6IHN0b3JlbmFtZSxzdGF0dXM6IHN0YXR1cywgc2hvcGFkZHJlc3M6IHNob3BhZGRyZXNzLCBzaG9wZGVzYzogc2hvcGRlc2MsIG93bmVybmFtZTogb3duZXJuYW1lLCBvd25lcmFkZHJlc3M6IG93bmVyYWRkcmVzcywgZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc3dvcmQsIHBob25lOiBwaG9uZSwgYWNjb3VudE5vOiBhY2NvdW50Tm8sIGFjY291bnRIb2xkZXJOYW1lOiBhY2NvdW50SG9sZGVyTmFtZSwgSUZTQzogSUZTQywgYmFua05hbWU6IGJhbmtOYW1lLCBicmFuY2g6IGJyYW5jaCwgYWRoYXJDYXJkTm86IGFkaGFyQ2FyZE5vLCBwYW5DYXJkTm86IHBhbkNhcmRObywgR1NUTm86IEdTVE5vfSkgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHZlbmRvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYUlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZWFMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8IGFyZWFJZC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYUxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZW5kb3JJZDogdmVuZG9yLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYUlkOiBhcmVhSWRbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnZlbmRvcl9hcmVhLmJ1bGtDcmVhdGUoYXJlYUxpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oc3VjY2VzcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgc3VwcGxpZXJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBhc3luYyB2ZW5kb3JBZGRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3R7IHN1cHBsaWVySWQsIHByb2R1Y3RJZCwgdW5pdFNpemUsIGJ1eWVyUHJpY2V9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHByb2R1Y3RJZFxyXG4gICAgICAgICAgICBkYi52ZW5kb3JfcHJvZHVjdC5maW5kQWxsKHsgd2hlcmU6IHsgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCwgcHJvZHVjdElkOiBwcm9kdWN0SWQsIHVuaXRTaXplOiB1bml0U2l6ZSB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnZlbmRvcl9wcm9kdWN0LmNyZWF0ZSh7c3VwcGxpZXJJZDogc3VwcGxpZXJJZCwgcHJvZHVjdElkOiBwcm9kdWN0SWQsIHVuaXRTaXplOiB1bml0U2l6ZSwgcHJpY2U6IGJ1eWVyUHJpY2V9KSAgXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi52ZW5kb3JfcHJvZHVjdC51cGRhdGUoeyB1bml0U2l6ZTogdW5pdFNpemUgPyB1bml0U2l6ZTogZGF0YS51bml0U2l6ZSwgcHJpY2U6YnV5ZXJQcmljZSA/IGJ1eWVyUHJpY2U6IGRhdGEuYnV5ZXJQcmljZX0seyB3aGVyZTogeyBzdXBwbGllcklkOiBzdXBwbGllcklkLCBwcm9kdWN0SWQ6IHByb2R1Y3RJZH19KSAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHN1Y2Nlc3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3QgaW4gVmVuZG9yTGlzdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0QWxsdmVuZG9yKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIudmVuZG9yLmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmFyZWEsIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSAsIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5sb2NhdGlvbiwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dfV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOmxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAgYXN5bmMgZ2V0QWxsVmVuZG9yUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3QuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOltcImlkXCIsXCJuYW1lXCIsXCJicmFuZFwiXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi52ZW5kb3JfcHJvZHVjdCwgYXR0cmlidXRlczpbXCJpZFwiLCBcInN1cHBsaWVySWRcIixcInByb2R1Y3RJZFwiLCBcInVuaXRTaXplXCIsIFwicHJpY2VcIl0sICBpbmNsdWRlOiBbeyBtb2RlbDogZGIudmVuZG9yLCBhdHRyaWJ1dGVzOltcImlkXCIsIFwic3RvcmVuYW1lXCIsIFwib3duZXJuYW1lXCJdIH1dIH1dLFxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOmxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRQcm9kdWN0QnlWZW5kb3IocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi52ZW5kb3JfcHJvZHVjdC5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6W1wiaWRcIixcInN1cHBsaWVySWRcIixcInByb2R1Y3RJZFwiLFwidW5pdFNpemVcIixcInByaWNlXCJdLFxyXG4gICAgICAgICAgICAgICAgd2hlcmU6eyBzdXBwbGllcklkOiByZXEuYm9keS5pZH0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOlt7IG1vZGVsOiBkYi5wcm9kdWN0LCBhdHRyaWJ1dGVzOltcImlkXCIsIFwibmFtZVwiLCBcImJyYW5kXCIsIFwicGhvdG9cIixcInN0YXR1c1wiXSB9XSBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOmxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyB2ZW5kb3JVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7aWQsIHN0b3JlbmFtZSwgc3RhdHVzLCBzaG9wYWRkcmVzcywgc2hvcGRlc2MsIG93bmVybmFtZSwgb3duZXJhZGRyZXNzLCBlbWFpbCxwYXNzd29yZCwgcGhvbmUsfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICBkYi52ZW5kb3IuZmluZE9uZSh7IHdoZXJlOiB7aWQgOiBpZH19KVxyXG4gICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxpc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi52ZW5kb3IudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVuYW1lOiBzdG9yZW5hbWUsIHN0YXR1czpwYXJzZUludChzdGF0dXMpPydhY3RpdmUnOidpbmFjdGl2ZScsIHNob3BhZGRyZXNzOiBzaG9wYWRkcmVzcz9zaG9wYWRkcmVzczpsaXN0LnNob3BhZGRyZXNzLCBzaG9wZGVzYzogc2hvcGRlc2M/c2hvcGRlc2M6bGlzdC5zaG9wZGVzYywgb3duZXJuYW1lOiBvd25lcm5hbWU/b3duZXJuYW1lOmxpc3Qub3duZXJuYW1lLCBvd25lcmFkZHJlc3M6IG93bmVyYWRkcmVzcz9vd25lcmFkZHJlc3M6bGlzdC5vd25lcmFkZHJlc3MsIGVtYWlsOiBlbWFpbD9lbWFpbDpsaXN0LmVtYWlsLCBwYXNzd29yZDogcGFzc3dvcmQ/cGFzc3dvcmQ6bGlzdC5wYXNzd29yZCwgcGhvbmU6IHBob25lP3Bob25lOmxpc3QucGhvbmUsIFxyXG4gICAgICAgICAgICAgICAgICAgIH0se3doZXJlOiB7aWQ6IGlkfX0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiTm8gZGF0YSBmb3VuZFwiLDQwOSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZT0+e1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUgLCBtc2c6J1VwZGF0ZWQgU3VjY2Vzc2Z1bGx5J30pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgXHJcbiAgICBhc3luYyB2ZW5kb3JEZWxldGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi52ZW5kb3IuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudmVuZG9yLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdTZWxsYXIgaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgJ3N0YXR1cyc6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAgYXN5bmMgdmVuZG9yUHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGlcIixyZXEuYm9keSlcclxuICAgICAgICAgICAgZGIudmVuZG9yX3Byb2R1Y3QuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnZlbmRvcl9wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignUHJvZHVjdCBpcyBub3QgZm91bmQnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCAnc3RhdHVzJzogXCJTZWNjZXNzZnVsbHkgZGVsZXRlZCBQcm9kdWN0IGZyb20gVmVuZG9ybGlzdFwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufVxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsS0FBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBTUUsU0FBUyxHQUFHRixPQUFPLENBQUMsV0FBVyxDQUFDO0FBQ3RDLElBQU1HLEVBQUUsR0FBR0QsU0FBUyxDQUFDQyxFQUFFO0FBQUMsSUFBQUMsUUFBQSxHQUNUO0VBQ1gsNERBRU1DLEtBQUssV0FBQUEsTUFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQUMsUUFBQTtNQUFBLElBQUFDLEVBQUEsRUFBQUMsU0FBQSxFQUFBQyxTQUFBLEVBQUFDLE1BQUEsRUFBQUMsV0FBQSxFQUFBQyxR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