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

