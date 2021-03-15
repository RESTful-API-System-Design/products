module.exports = (app) => {

  app.route('/products')
    .get();

  app.route('//products/:product_id')
    .get();

  app.route('/products/:product_id/styles')
    .get();

  app.route('/products/:product_id/related')
    .get();
}