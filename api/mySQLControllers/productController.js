const mysql = require('mysql');
const connect = require('./connection.js')

module.exports = {

  products: (req, res) => {
    const connection = mysql.createConnection(connect);
    connection.connect((err) => {
      if (err) {
        res.sendStatus(418);
        res.end();
        connection.end();
      } else {
        let query = `
          SELECT * FROM products
        `;
        connection.query(query, (err, result) => {
          if (err) {
            res.sendStatus(404);
            res.end();
          }
          res.send(result);
          connection.end();
        })
      }
    });
  },

  product: (req, res) => {
    const connection = mysql.createConnection(connect);
    connection.connect((err) => {
      if (err) {
        res.sendStatus(418);
        res.end();
        connection.end();
      } else {
        let query = `
          SELECT *
          FROM products
          WHERE id = ${req.params.product_id};
        `

        connection.query(query, (err, product) => {
          if (err) {
            res.sendStatus(404);
            res.end();
            connection.end();
          } else {

            query = `
              SELECT feature, value
              FROM features
              WHERE product_Id = ${req.params.product_id};
            `;
            connection.query(query, (err, features) => {
              if (err) {
                res.sendStatus(404);
                res.end();
              }
              product[0].features = features;
              res.send(product[0])
              connection.end();
            });
          }
        });
      }
    });
  },

  styles: (req, res) => {
    const connection = mysql.createConnection(connect);
    connection.connect((err) => {
      if (err) {
        res.sendStatus(418);
        res.end();
        connection.end();
      } else {
        let query = `
          SELECT
          id style_id,
          name,
          sale_price,
          original_price,
          default_style
          FROM styles
          WHERE product_id = ${parseInt(req.params.product_id)};
        `
        connection.query(query, (err, styles) => {
          if (err) {
            res.send(404);
            res.end();
            connection.end();
          }

          let photoPromises = photosQuery(styles, connection);
          Promise.all(photoPromises)
            .then((data) => {
              let skuPromises = skusQuery(data, connection)
              Promise.all(skuPromises)
                .then((data) => {
                  res.send({product_id: req.params.product_id, results: data});
                  connection.end();
                })
            })
            .catch((err) => {
              res.sendStatus(418);
              connection.end();
            })
        })
      }
    });
  },

  related: (req, res) => {
    const connection = mysql.createConnection(connect);
    connection.connect((err) => {
      if (err) {
        res.sendStatus(418);
        res.end();
        connection.end();
      } else {
        let query = `
          SELECT related_product_id
          FROM related
          WHERE current_product_id = ${req.params.product_id};
        `
        connection.query(query, (err, relatedItems) => {
          if (err) {
            res.sendStatus(404);
            res.end();
          }
          res.send(
            relatedItems.map(item => {
              return item.related_product_id;
            })
          )
          connection.end();
        });
      }
    });
  }
}


const photosQuery = (styles, connection) => {
  return styles.map(style => {
    style.sale_price = style.sale_price === 0 ? null : style.sale_price;
    return new Promise((resolve, reject) => {
      let query = `
        SELECT url, thumbnail_url
        FROM photos
        WHERE styleId = ${style.style_id};
        `;
        connection.query(query, (err, photos) => {
          if (err) {
            reject(err);
          } else {
            photos = photos[0]? photos: {url: null, thumbnail_url: null};
            resolve({...style, photos: photos});
          }
        });
    });
  })
}

const skusQuery = (styles, connection) => {
  return styles.map((style) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT id, size, quantity
        FROM skus
        WHERE styleId = ${style.style_id};
      `;
      connection.query(query, (err, skus) => {
        if (err) {
          reject(err)
        } else {
          let skuObject = {};
          skus.forEach((sku) => {
            skuObject[sku.id] = {quantity: sku.quantity, size: sku.size}
          });

          skuObject = skus[0]? skuObject: {null: {quantity: null, size: null}};
          resolve({...style, skus: skuObject});
        };
      });
    })
  });
}