const productController = require('../mySQLControllers/productController.js')

module.exports = (app) => {

  app.route('/products')
    .get(productController.products);

  app.route('/products/:product_id')
    .get(productController.product);

  app.route('/products/:product_id/styles')
    .get(productController.styles);

  app.route('/products/:product_id/related')
    .get(productController.related);
}


// SELECT * FROM features where product_Id = 111111;

// SELECT
// products.id,
// products.name,
// products.slogan,
// products.slogan,
// products.description,
// products.category,
// products.default_price,
// features.feature,
// features.value
// FROM features
// JOIN products
// WHERE products.id = 1
// AND features.product_Id = 1;

// SELECT
// id style_id,
// name,
// sale_price,
// original_price,
// default_style 'default?'
// FROM styles
// WHERE product_id = 1;


