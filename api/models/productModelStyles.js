
const r = require('rethinkdb');
const fsp =  require('fs').promises;
const fs = require('fs');

var insertToDB = (data) => {
  var connection = null;
  r.connect( {host: 'localhost', port: 28015, db: 'Products'})
    .then((conn) => {
      connection = conn;
    })
    // .then(() => {
    //   return r.db('Products').tableCreate('styles').run(connection)
    //     .then((result) => {
    //       console.log(JSON.stringify(result, null, 2));
    //     })
    // })
    .then(() => {
      return r.table('styles2').insert(data).run(connection)
    })
    .then((result) => {
    })
    .catch(err => {throw err})
    .then(() => {
      connection.close((err) => { if (err) throw err; })
    })
}

fsp.readFile('data/styleTest.csv')
  .then((styleData) => {
      styleData = styleData.toString().split('\n');
      styleData.shift();
      let styleResult = {};

    styleData.forEach((style) => {
      style = style.split(',');
      if (styleResult[JSON.parse(style[1])]) {;
        styleResult[JSON.parse(style[1])].push({id: JSON.parse(style[0]), name: JSON.parse(style[2]), sale_price: JSON.parse(style[3]), original_price: JSON.parse(style[4]), default_style: JSON.parse(style[5])});
      } else {
        styleResult[JSON.parse(style[1])] = [{id: JSON.parse(style[0]), name: JSON.parse(style[2]), sale_price: JSON.parse(style[3]), original_price: JSON.parse(style[4]), default_style: JSON.parse(style[5])}];
      }
    })
      return styleResult;
    })
  .then((styleData) => {
    return fsp.readFile('data/testSku.csv')
      .then((skuData) => {
        skuData = skuData.toString().split('\n');

        skuData.shift();

        let skuResult = {};

        skuData.forEach((sku) => {
          sku = sku.split(',');
          if (skuResult[JSON.parse(sku[1])]) {;
            skuResult[JSON.parse(sku[1])][JSON.parse(sku[0])] = {size: JSON.parse(sku[2]), quantity: JSON.parse(sku[3])};
          } else {
            skuResult[JSON.parse(sku[1])] = {};
            skuResult[JSON.parse(sku[1])][JSON.parse(sku[0])] = {size: JSON.parse(sku[2]), quantity: JSON.parse(sku[3])};
          }
        })
        return [styleData, skuResult];
      });
  })
  .then((data) => {
    return fsp.readFile('data/testPhotos.csv')
      .then((photoData) => {
        photoData = photoData.toString().split('\n');
        photoData.shift();
        let thumbnail;
        let url;
        let photoResult = {};
        photoData.forEach((photo) => {
          photo = photo.split(',');
          thumbnail = photo[3].split('"');
          url = photo[2].split('"');
          if (photoResult[JSON.parse(photo[1])]) {;
            photoResult[JSON.parse(photo[1])].push({thumbnail_url: thumbnail[1]}, {url: url[1]});
          } else {
            photoResult[JSON.parse(photo[1])] = [{thumbnail_url: thumbnail[1], url: url[1]}];
          }
        })
        data.push(photoResult);
        return data;
      });
  })
  .then((data) => {
    var result = [];
    for (var key in data[0]) {
      result.push({productId: key, styles: createStyleArray(data[0][key], data[1], data[2])});
    }
    insertToDB(result);
  })
  .catch((err) => {
    throw err;
  })

var createStyleArray = (style, skus, photos) => {
  style.forEach((style) => {
    style.photos = photos[style.id];
    style.skus = skus[style.id]
    if (!style.photos) {
      style.photos = [{thumbnail_url: null, url: null}]
    }
    if (!style.skus) {
      style.skus = null;
    }
  });
  return style;
}



























            // var ProductStyle = thinky.createModel("productStyle", {
            //   style_id: type.number(),
            //   productId: type.number()
            // });

            // var Styles = thinky.createModel("Styles", {
            //   style_id: type.number(),
            //   name: type.string(),
            //   original_price: type.number(),
            //   sale_price: type.number(),
            //   default: type.number(),
            // });

            // ProductStyle.hasMany(Styles, "style", "name", "original_price", "sale_price", "default");

            // var Photos = thinky.createModel("Photos", {
            //   thumbnail_url: type.string(),
            //   url: type,string()
            // })

            // Styles.hasMany(Photos, "thumnail_url", "url");

            // var Skus = thinky.createModel("Skus", {
            //   quantity: type.number(),
            //   size: type.string()
            // });

            // Styles.hasMany(Skus, "quantity", "size");

            // // var style = new Style({
            // //   title: "Hello World!",
            // //   content: "This is an example."
            // // });
            // // post.saveAll().then(function(result) {
            //   /*
            //   post = result = {
            //       id: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
            //       title: "Hello World!",
            //       content: "This is an example.",
            //       idAuthor: "3851d8b4-5358-43f2-ba23-f4d481358901",
            //       author: {
            //           id: "3851d8b4-5358-43f2-ba23-f4d481358901",
            //           name: "Michel"
            //       }
            //   }
            //   */
            // //  console.log(result);
            // // });