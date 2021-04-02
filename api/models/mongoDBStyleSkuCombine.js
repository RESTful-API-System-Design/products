const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'products';
const client = new MongoClient(url);

client.connect(function (err) {
  assert.equal(null, err)

  console.log('CONNECT SUFFESSFULLY');

  const db = client.db(dbName);

  db.collection('styles', (err, styles) => {
    db.collection('skus', (err, skus) => {
      skus.find().forEach(sku => {
        console.log(sku.styleId)
        styles.update({style_id: sku.styleId}, {
          $push: {
            skus: {
              id: sku.id,
              size: sku.size,
              quantity: sku.quantity
            }
          }
        })
      })
    });
  });
});

client.close();