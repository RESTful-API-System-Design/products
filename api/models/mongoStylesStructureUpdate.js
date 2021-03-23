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
    styles.find().forEach(style => {
      console.log(style.style_id)
      if (style.sale_price === "null") {
        styles.update({style_id: style.style_id}, {
          $set: {
            sale_price: null
          }
        });
      }
      if (!style.photos) {
        styles.update({style_id: style.style_id}, {
          $set: {
            photos: [{'url': null, 'thumbnail_url': null}]
          }
        });
      }
    });
  });
});

client.close();