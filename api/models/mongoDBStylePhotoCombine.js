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
    db.collection('photos', (err, photos) => {
      photos.find().forEach(photo => {
        console.log(photo.style_id);
        styles.updateMany({style_id: photo.style_id}, {
          $push: {
            photos: {
              url: photo.url,
              thumbnail_url: photo.thumbnail_url
            }
          }
        })
      })
    });
  });
});

client.close();