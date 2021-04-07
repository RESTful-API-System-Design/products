const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'products';
const client = new MongoClient(url);

// Connect to the db
client.connect(function (err) {
  assert.equal(null, err)

  console.log('CONNECT SUFFESSFULLY');

  const db = client.db(dbName);

  db.collection('products', (err, products) => {
    db.collection('features', (err, features) => {
      features.find().forEach(feature => {
        products.updateMany({id: feature.productId}, {
          $push: {
            features: {
              feature: feature.feature,
              value: feature.value
            }
          }
        })
      })
    })
  })
});

client.close();