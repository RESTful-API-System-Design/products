const { MongoClient } = require("mongodb");
const assert = require('assert');

const uri = 'mongodb://54.193.40.159:27017/products';
module.exports = {

  products: (req, res) => {

  },

  product: (req, res) => {

  },

  styles: (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    async function run() {
      try {
        await client.connect();
        const database = client.db("products");
        const styles = database.collection("styles");
        const query = { productId: parseInt(req.params.product_id) };
        const options = {
          projection: { _id: 0},
        };
        const stylesArray = await styles.findOne(query, options);
        res.send(stylesArray)
      } finally {
        // await client.close();
      }
    }
    run().catch(console.dir);
  },

  related: (req, res) => {

  }
}