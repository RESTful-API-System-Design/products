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
    if (err) {
      throw err
    }
    db.collection('photos', (err, photos) => {
      if (err) {
        throw err
      }
      styles.find().forEach(style => {
        console.log(style.style_id);
        photos.find({style_id: style.style_id})
          .project({_id: 0, id: 0, style_id: 0})
          .toArray()
          .then((result) => {
            styles.update({style_id: style.style_id}, {
              $set: {
                photos: result
              }
            });
          })
          .catch(err => {
            throw err;
          });
      });
    });
  });
});

client.close();