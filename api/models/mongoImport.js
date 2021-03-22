// mongoimport --db products --collection products --type csv --headerline --file "/Users/adnannoori/sdc/products/data/product.csv"

// mongoimport --db products --collection styles --type csv --headerline --file "/Users/adnannoori/sdc/products/data/styles.csv"

// mongoimport --db products --collection features --type csv --headerline --file "/Users/adnannoori/sdc/products/data/features.csv"

// mongoimport --db products --collection related --type csv --headerline --file "/Users/adnannoori/sdc/products/data/related.csv"

// mongoimport --db products --collection skus --type csv --headerline --file "/Users/adnannoori/sdc/products/data/skus.csv"

// mongoimport --db products --collection photos --type csv --headerline --file "/Users/adnannoori/sdc/products/data/photos.csv"

// styles.updateMany( {}, { $rename: { "default_style": "default?" } } )
// db.styles.createIndex({"style_id": 1})
// db.styles.dropIndex({"styleId": 1})
// db.styles.getIndexes()

//db.photos.createIndex({"style_id": 1})

// db.skus.createIndex({"styleId": 1})
// db.products.createIndex({"id": 1})

// db.related.createIndex({"current_product_id": 1})
// db.features.createIndex({"productId": 1})
// db.styles.createIndex({"productId": 1})

// db.styles.updateMany({}, {$rename: {'id': 'style_id'}})

const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');


// make a connection
mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

// get reference to database

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");

    // define Schema
    let PhotoSchema = mongoose.Schema({
      id: Number,
      productId: Number,
      url: String,
      thumbnail_url: String
    });

    // compile schema to model
    var Photo = mongoose.model('testPhotos', PhotoSchema);

    var rl = readline.createInterface({
      input: fs.createReadStream('/Users/adnannoori/sdc/products/data/photos.csv'),
      // output: process.stdout,
      // console: false
    });

    rl.on('line', function(line) {
      // process line here
      line = line.split(',');
      // let url = array[2].split('"')[1];
      // let thumbnail = array[3].split('"')[1];

      var photo = new Photo(
        {
          id: line[0],
          styleId: line[1],
          url: line[2].split('"')[1],
          thumbnail_url: line[3].split('"')[1]
        }
      );
      //save model to database
      photo.save(function (err, photo) {
        if (err) return console.error(err);
      });
    });

    rl.on('close', function() {
      console.log('done')
    });
});

