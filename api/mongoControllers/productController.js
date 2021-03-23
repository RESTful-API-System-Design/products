const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'products';
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = {

  products: (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: false });
    client.connect((err) => {

      if (err) {
        res.sendStatus(404);
      }
      assert.equal(null, err);
      const db = client.db(dbName);

      db.collection('products', (err, products) => {
        if (err) {
          res.sendStatus(418)
          res.send(err);
        }
        products.find()
          .project({'_id': 0, features: 0})
          .toArray()
          .then((products) => {
            res.send(products);
          })
          .catch((err) => {
            res.sendStatus(404);
          });
      });
    });
  },

  product: (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: false });
    client.connect((err) => {

      if (err) {
        res.sendStatus(404);
      }
      assert.equal(null, err);
      const db = client.db(dbName);

      db.collection('products', (err, products) => {

        if (err) {
          res.sendStatus(418);
        }

        products.findOne({id: parseInt(req.params.product_id)}, {projection: {_id: 0}})
          .then((product) => {
            // db.collection('features', (err, features) => {
            //   if (err) {
            //     res.sendStatus(418);
            //   }
            //   features.find({productId: 5})
            //     .project({ _id: 0, feature: 1, value: 1 })
            //     .toArray()
            //     .then((features) => {
            //       product.features = features;
            //       res.send(product);
            //     })
            //     .catch((err) => {
            //       res.sendStatus(404);
            //     });
            // })
            res.send(product);
          })
          .catch((err) => {
            res.sendStatus(404)
          });
      });
    });
  },

  styles: (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: false });
    client.connect((err) => {

      if (err) {
        res.sendStatus(404);
      }
      assert.equal(null, err);
      const db = client.db(dbName);

      db.collection('styles', (err, styles) => {
        if (err) {
          res.sendStatus(418);
        }

        styles.find({productId: parseInt(req.params.product_id)})
          .project({_id: 0, productId: 0})
          .toArray()
          .then((styles) => {
            res.send({product_id: req.params.product_id, results: styles});
            // styles.forEach((style) => {

            //   style.sale_price = style.sale_price === 'null'? null : style.sale_price;
            //   style.photos = style.photos? style.photos : [{url: null, thumbnail_url: null}];
              // if (style.skus) {
              //   let skuObj = {};
              //   style.skus.forEach((sku) => {
              //     skuObj[sku.id] = {size: sku.size, quantity: sku.quantity};
              //   })
              //   style.skus = skuObj;
              // } else {
              //   style.skus = {};
              // }
            // });
            // res.send({product_id: req.params.product_id, results: styles});
            // db.collection('photos', (err, photos) => {
            //   if (err) {
            //     res.sendStatus(418);
            //   }
            //   var photosPromises = photosQuery(styles, photos);
            //   Promise.all(photosPromises)
            //     .then((data) => {
            //       db.collection('skus', (err, skus) => {
            //         if (err) {
            //           res.sendStatus(418);
            //         }
            //         var skuPromises = skusQuery(data, skus);
            //         Promise.all(skuPromises)
            //           .then((data) => {
            //             res.send(data);
            //           })
            //           .catch((err) => {
            //             res.sendStatus(404);
            //           });
            //       });
            //     })
            //     .catch((err) => {
            //       res.sendStatus(418);
            //     })
            // });
          })
          .catch((err) => {
            res.sendStatus(418);
          })
      });
    });
  },

  related: (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: false });
    client.connect((err) => {

      if (err) {
        res.sendStatus(404);
      }
      assert.equal(null, err);
      const db = client.db(dbName);

      db.collection('related', (err, related) => {
        if (err) {
          res.sendStatus(418)
        }

        related.find({current_product_id: parseInt(req.params.product_id)})
          .project({_id: 0, related_product_id: 1})
          .toArray()
          .then((relatedItems) => {
            res.send(
              relatedItems.map((item) => {
                return item.related_product_id
              })
            )
          })
          .catch((err) => {
            res.sendStatus(404);
          });
      });
    });
  }
}

// const photosQuery = (styles, photos) => {
//   return styles.map((style) => {
//     return new Promise((resolve, reject) => {
//       photos.find({style_id: style.style_id})
//       .project({_id: 0, style_id: 0, id: 0})
//       .toArray()
//       .then((photoArray) => {
//         resolve({...style, photos: photoArray})
//       })
//       .catch((err) => {
//         reject(err);
//       });
//     });
//   });
// };

// const skusQuery = (styles, skus) => {
//   return styles.map((style) => {
//     return new Promise((resolve, reject) => {
//       skus.find({styleId: style.style_id})
//       .project({_id: 0, styleId: 0})
//       .toArray()
//       .then((skusArray) => {
//         var skuObject = {}
//         skusArray.forEach((sku) => {
//           skuObject[sku.id] = {quantity: sku.quantity, size: sku.size};
//         });
//         resolve({...style, skus: skuObject});
//       })
//       .catch((err) => {
//         reject(err);
//       });
//     });
//   });
// }