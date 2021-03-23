const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'products';
const client = new MongoClient(url);

client.connect(function (err) {
  assert.equal(null, err)

  console.log('CONNECT SUFFESSFULLY');

  const db = client.db(dbName);

  db.collection('styles2', (err, styles) => {
    db.collection('skus', (err, skus) => {
      styles.find().forEach(style => {
        console.log(style.style_id)
        let obj = {};
        skus.find({styleId: style.style_id}).forEach((sku) => {
          obj[sku.id] = {
            size: sku.size,
            quantity: sku.quantity
          }
        })
        .then(() => {
          styles.update({style_id: style.style_id}, {
            $set: {
              skus: obj
            }
          });
        })
      });
    });
  });
});

client.close();