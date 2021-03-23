// r = require('rethinkdb');

const fsp = require('fs').promises;

fsp.readFile('data/productTest.csv')
  .then((styleData) => {
      styleData = styleData.toString().split('\n');
      let styleResult = {};

    styleData.forEach((style) => {
      style = style.split(',');
      console.log(style);
      console.log(JSON.parse(style[1]));
    });
  });

// var connection = null;
// r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
//     if (err) throw err;
//     connection = conn;

//     r.db('test').tableCreate('authors').run(connection, function(err, result) {
//       if (err) throw err;
//       console.log(JSON.stringify(result, null, 2));
//     })

// })



// CREATE TABLE styles (
// id INT(7) PRIMARY KEY,
// product_id INT(7),
// name VARCHAR(28),
// sale_price INT(4),
// original_price int(4),
// default_style VARCHAR(1)
// );

// LOAD DATA LOCAL INFILE './products/data/styles.csv'
// INTO TABLE styles
// FIELDS TERMINATED BY ','
// OPTIONALLY ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// IGNORE 1 LINES;

// DROP TABLE IF EXISTS products;

// CREATE TABLE products (
//   id INT(7) PRIMARY KEY,
//   name VARCHAR(25),
//   slogan VARCHAR(60),
//   description VARCHAR(375),
//   category VARCHAR(12),
//   default_price VARCHAR(3)
// );

// LOAD DATA LOCAL INFILE '/Users/adnannoori/sdc/products/data/product.csv'
// INTO TABLE products
// FIELDS TERMINATED BY ','
// OPTIONALLY ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// IGNORE 1 ROWS;

// LOAD DATA LOCAL INFILE '/Users/adnannoori/sdc/products/data/productTest.csv'
// INTO TABLE products
// FIELDS TERMINATED BY ','
// OPTIONALLY ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// (id,name,slogan,description,category, @default_price, @extra)
// SET default_price = IFNULL(@extra, @default_price);

// CREATE TABLE skus (
//   id INT(8) PRIMARY KEY,
//   styleId INT(8),
//   size VARCHAR(3),
//   quantity VARCHAR(2)
// );

// LOAD DATA LOCAL INFILE '/Users/adnannoori/sdc/products/data/skus.csv'
// INTO TABLE skus
// FIELDS TERMINATED BY ','
// OPTIONALLY ENCLOSED BY '"'
// LINES TERMINATED BY '\n';

// CREATE TABLE related (
//   id INT(7) PRIMARY KEY,
//   current_product_id INT(7),
//   related_product_id INT(6)
// );

// LOAD DATA LOCAL INFILE '/Users/adnannoori/sdc/products/data/related.csv'
// INTO TABLE related
// FIELDS TERMINATED BY ','
// LINES TERMINATED BY '\n'

// CREATE TABLE features (
//   id INT(7) PRIMARY KEY,
//   product_id INT(7),
//   feature VARCHAR(25),
//   value VARCHAR(30)
// );

// LOAD DATA LOCAL INFILE '/Users/adnannoori/sdc/products/data/features.csv'
// INTO TABLE features
// FIELDS TERMINATED BY ','
// OPTIONALLY ENCLOSED BY '"'
// LINES TERMINATED BY '\n';

// CREATE TABLE photos (
//   id INT(8) PRIMARY KEY,
//   styleId INT(7),
//   url VARCHAR(135),
//   thumbnail_url VARCHAR(135)
// );

// LOAD DATA LOCAL INFILE '/Users/adnannoori/sdc/products/data/photos.csv'
// INTO TABLE photos
// FIELDS TERMINATED BY ','
// OPTIONALLY ENCLOSED BY '"'
// LINES TERMINATED BY '\n';



