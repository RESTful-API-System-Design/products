// const productController = require('../mongoControllers/productController.js')
const productController = require('../mongoControllers/productControllerMongoose.js')
// const productController = require('../mongoControllers/productControllerNewAttempt.js')

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