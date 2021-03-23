const express = require('express');
const mySQLRoutes = require('./api/routes/productRoute.js');
const mongoRoutes = require('./api/routes/mongoRoute.js');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
require('newrelic');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mySQLRoutes(app);
mongoRoutes(app);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// scp -i ./SDC.pem /Users/adnannoori/sdc/products/data/skus.csv ubuntu@ec2-18-144-47-101.us-west-1.compute.amazonaws.com:./products/data