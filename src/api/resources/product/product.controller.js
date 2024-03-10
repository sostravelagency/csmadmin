import { db } from "../../../models";
const { Op, Sequelize } = require("sequelize");
// import { queue } from '../../../kue';
export default {
  /* Add user api start here................................*/
  async getPhotoProduct(req, res) {
    const { productId } = req.query;
    db.productphoto
      .findAll({
        where: {
          productId,
        },
      })
      .then((product) => {
        return res.status(200).json({ ok: true, data: product });
      });
  },
  async addProduct(req, res, next) {
    try {
      const {
        categoryId,
        subCategoryId,
        childCategoryId,
        name,
        slug,
        brand,
        status,
        unitSize,
        sortDesc,
        desc,
        buyerPrice,
        price,
        qty,
        discount,
        discountPer,
        total,
        netPrice,
        image,
        size,
        newaddimage,
      } = req.body;

      db.product
        .create({
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
          photo: req.file ? req.file.path : "",
        })
        .then((product) => {
          JSON.parse(image)?.map((item) =>
            db.productphoto.create({
              imgUrl: item?.path,
              productId: product.dataValues.id,
            })
          );
          if (newaddimage) {
            JSON.parse(newaddimage)?.map((item) =>
              db.productphoto.create({
                imgUrl: item?.imageUrl,
                productId: product.dataValues.productId,
              })
            );
          }
          JSON.parse(size)?.map((item) =>
            db.productsize.create({
              size: item?.size,
              productId: product.dataValues.id,
              amount: item?.amount,
            })
          );
          res
            .status(200)
            .json({ success: true, msg: "Successfully inserted product" });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      // throw new RequestError('Error');
      return res.status(500).json(err);
    }
  },

  async index(req, res, next) {
    try {
      const { supplierId, categoryId, subCategoryId } = req.query;
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          where: {
            supplierId: supplierId,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
          },
        })
        .then((product) => {
          res.status(200).json({ success: true, product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getAllProductList(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.SubCategory,
              attributes: ["id", "sub_name"],
              include: [{ model: db.category, attributes: ["id", "name"] }],
            },
          ],
        })
        .then((product) => {
          res.status(200).json({ success: true, product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async update(req, res, next) {
    try {
      const {
        productId,
        categoryId,
        subCategoryId,
        childCategoryId,
        name,
        slug,
        brand,
        status,
        unitSize,
        desc,
        buyerPrice,
        price,
        qty,
        discount,
        discountPer,
        total,
        netPrice,
        images,
        size,
        newaddimage,
      } = req.body;
      db.product
        .findOne({ where: { id: productId } })
        .then((product) => {
          if (product) {
            return db.product.update(
              {
                categoryId: categoryId ? categoryId : product.categoryId,
                subCategoryId: subCategoryId
                  ? subCategoryId
                  : product.subCategoryId,
                childCategoryId: childCategoryId
                  ? childCategoryId
                  : product.childCategoryId,
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
                photo: req.file ? req.file.location : product.photo,
              },
              { where: { id: productId } }
            );
          }
          throw new RequestError("Not Found Product", 409);
        })
        .then((p) => {
          if (newaddimage) {
            JSON.parse(newaddimage)?.map((item) =>
              db.productphoto.create({
                imgUrl: item?.imageUrl,
                productId: productId,
              })
            );
          }
          if (size) {
            db.productsize.destroy({
              where: { productId },
            });
            db.productsize.bulkCreate(
              JSON.parse(size).map(({ size, amount }) => ({
                size,
                amount,
                productId,
              }))
            );
          }
          if (images) {
            db.productphoto.destroy({
              where: { productId: productId },
            });
            db.productphoto.bulkCreate(
              JSON.parse(images).map((item) => ({ ...item, productId }))
            );
          }
          res.status(200).json({ success: true, msg: "Updated Successfully" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductListByCategory(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          where: {
            categoryId: req.query.categoryId,
            subCategoryId: req.query.subCategoryId,
          },
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductListById(req, res, next) {
    try {
      db.product
        .findAll({
          where: { id: req.query.id },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          order: [["createdAt", "DESC"]],
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getWebProductListById(req, res, next) {
    try {
      const size = await db.productsize.findAll({
        where: { productId: req.query.id },
      });
      db.product
        .findOne({
          where: { id: req.query.id },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          order: [["createdAt", "DESC"]],
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list, datasize: size });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async addProductOffer(req, res, next) {
    try {
      const { productId, qty, discount_per, discount_price, total, net_price } =
        req.body;
      db.ProductOffer.findOne({ where: { id: productId } })
        .then((list) => {
          if (!list) {
            return db.ProductOffer.create({
              productId: productId,
              image: req.file ? req.file.location : "",
              qty: qty,
              discount_per: discount_per,
              discount_price: discount_price,
              total: total,
              net_price: net_price,
            });
          } else {
            return db.ProductOffer.update(
              {
                qty: qty,
                discount_per: discount_per,
                discount_price: discount_price,
                total: total,
                net_price: net_price,
              },
              { where: { id: list.id } }
            );
          }
        })
        .then((p) => {
          res.status(200).json({ success: true, msg: "Successfully" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getProductOffer(req, res, next) {
    try {
      db.ProductOffer.findAll({
        include: [
          {
            model: db.product,
            attributes: [
              "id",
              "categoryId",
              "price",
              "item_name",
              "description",
              "brand",
            ],
            include: [{ model: db.category, attributes: ["id", "name"] }],
          },
        ],
      })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async searchProductBySubCat(req, res, next) {
    try {
      db.SubCategory.findOne({
        where: { sub_name: req.body.subCat },
      })
        .then((data) => {
          if (data) {
            return db.product.findAll({
              where: { subCategoryId: data.id },
            });
          }
        })
        .then((list) => {
          console.log(JSON.stringify(list));
          res.status(200).json({ success: true, data: list });
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async productDelete(req, res, next) {
    db.product
      .findOne({ where: { id: parseInt(req.query.id) } })
      .then((product) => {
        if (product) {
          return db.product.destroy({ where: { id: product.id } });
        }
        throw new RequestError("Product is not found");
      })
      .then((re) => {
        return res.status(200).json({ status: "deleted Product Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },

  async productOfferDelete(req, res, next) {
    db.ProductOffer.findOne({ where: { id: parseInt(req.params.id) } })
      .then((product) => {
        if (product) {
          return db.ProductOffer.destroy({ where: { id: product.id } });
        }
        throw new RequestError("Product is not found");
      })
      .then((re) => {
        return res.status(200).json({ status: "deleted Product Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },

  async multiplePhotoUpload(req, res, next) {
    let attachmentEntries = [];
    var productId = req.body.productId;
    for (var i = 0; i < req.files.length; i++) {
      attachmentEntries.push({
        productId: productId,
        name: req.files[i].filename,
        mime: req.files[i].mimetype,
        imgUrl: req.files[i].path,
      });
    }

    db.product
      .findOne({
        where: { id: productId },
      })
      .then((r) => {
        if (r) {
          // return queue.create('img-upload', {
          //     productId: productId,
          //     productName: r.item_name,
          //     attachmentEntries: attachmentEntries,
          // }).save();
          for (var i = 0; i < req.files.length; i++) {
            db.productphoto.create({ ...attachmentEntries[i] });
          }
        }
      })
      .then((r) => {
        res.status(200).json({ success: true, data: req.files });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ errors: ["Error insert photo"] });
      });
  },

  async getAllPhoto(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          attributes: ["id", "name", "brand"],
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
        })
        .then((data) => {
          res.status(200).json({ success: true, data });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async deleteSliderPhoto(req, res, next) {
    db.productphoto
      .findOne({ where: { id: parseInt(req.query.id) } })
      .then((product) => {
        if (product) {
          return db.productphoto.destroy({ where: { id: req.query.id } });
        }
        throw new RequestError("Product is not found");
      })
      .then((re) => {
        return res.status(200).json({ status: "deleted Product Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },
  //All GroceryStample product
  // edit to sale product
  async getAllGrocerryStaples(req, res, next) {
    try {
      db.product
        .findAll({
          // attributes: ["id", "slug"],
          // where: { discount: 'grocery-staple' },
          order: [["discountPer", "DESC"]],
          limit: 8,
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product || [] });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getAllProductBySlug(req, res, next) {
    try {
      db.category
        .findOne({
          attributes: ["id"],
          include: [
            {
              model: db.product,
              order: [["createdAt", "DESC"]],
              include: [
                { model: db.productphoto, attributes: ["id", "imgUrl"] },
              ],
            },
          ],
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  // filter product

  async getFilterbyProduct(req, res, next) {
    try {
      let search = "%%";
      if (req.query.search) {
        search = "%" + req.query.search + "%";
      }
      db.SubCategory.findAll({
        attributes: ["id", "sub_name"],
        include: [
          {
            model: db.product,
            order: [["createdAt", "DESC"]],
            required: true,
            where: {
              [Op.or]: [
                { name: { [Op.like]: search }, slug: { [Op.like]: search } },
              ],
            },
          },
        ],
      })

        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async GetAllByCategory(req, res, next) {
    try {
      db.SubCategory.findOne({
        where: { sub_name: req.body.name },
        include: [
          {
            model: db.SubChildCategory,
            include: [
              {
                model: db.product,
                order: [["createdAt", "DESC"]],
                include: [
                  { model: db.productphoto, attributes: ["id", "imgUrl"] },
                ],
              },
            ],
          },
        ],
      })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  // aws image delete
  async awsProductPhotoDelete(req, res, next) {
    try {
      const { id, imgUrl } = req.body;
      // db.productphoto.destroy({where: {imgUrl, id}})
      // deleteFileFromS3(imgUrl)

      db.productphoto
        .destroy({ where: { id: id } })

        .then((success) => {
          res
            .status(200)
            .json({
              success: true,
              msg: "Successflly deleted image from s3 Bucket",
            });
        });
    } catch (err) {
      next(err);
      // res.status(500).json({ 'success':false, msg: err})
    }
  },

  async getProductSubChildCat(req, res, next) {
    try {
      const { subCategoryId, childCategoryId } = req.body;
      db.product
        .findAll({
          where: {
            childCategoryId: childCategoryId,
            subCategoryId: childCategoryId,
          },
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      next(err);
      // res.status(500).json({ 'success':false, msg: err})
    }
  },
  async getProductSuggest(req, res, next) {
    try {
      // const{ subCategoryId, childCategoryId } = req.body;
      db.product
        .findAll({
          // where: { childCategoryId: childCategoryId, subCategoryId: childCategoryId },
          order: Sequelize.literal("RAND()"),
          limit: 8,
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      next(err);
      // res.status(500).json({ 'success':false, msg: err})
    }
  },
  async getSizeProduct(req, res, next) {
    try {
      const { productId } = req.query;
      db.productsize
        .findAll({
          where: { productId },
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      next(err);
      res.status(500).json({ success: false, msg: err });
    }
  },
};
