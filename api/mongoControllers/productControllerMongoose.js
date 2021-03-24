const mongoose = require('mongoose');
// mongoose.connect('mongodb://54.193.40.159:27017/products', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://54.193.40.159:27017/products', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: Array
});

const stylesSchema = new mongoose.Schema({
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: Number,
  style_id: Number,
  skus: Object,
  photos: Array
});

const relatedSchema = new mongoose.Schema({
  id: Number,
  current_product_id: Number,
  related_product_id: Number
})

const Product = mongoose.model('products', productSchema);
const Styles = mongoose.model('styles', stylesSchema);
const Related = mongoose.model('related', relatedSchema);

module.exports = {

  products: (req, res) => {
    Product.find({}).select({_id: 0, features: 0})
    .then((products) => {
      res.send(products)
    })
    .catch((err) => {
      res.sendStatus(404)
    });
  },

  product: (req, res) => {
    Product.findOne({id: parseInt(req.params.product_id)}).select({_id: 0})
      .then((product) => {
        res.send(product)
      })
      .catch((err) => {
        res.sendStatus(404)
      });

  },

  styles: (req, res) => {
    Styles.find({ productId: parseInt(req.params.product_id) }).select({ _id: 0, productId: 0 })
      .then((styles) => {
        res.send({product_id: req.params.product_id, results: styles});
      })
      .catch((err) => {
        res.sendStatus(404)
      })
  },

  related: (req, res) => {
    Related.find({ current_product_id: 500 })
      .then((relatedItems) => {
        res.send(relatedItems);
      })
      .catch((err) => {
        res.sendStatus(404);
      })
  }
}
