const express = require('express');
const mySQLRoutes = require('./api/routes/productRoute.js');
const mongoRoutes = require('./api/routes/mongoRoute.js');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// require('newrelic');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mySQLRoutes(app);
mongoRoutes(app);

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/loaderio-4122854d04a5cf0a9ac8d9869e696f00/', (req, res) => {
  res.sendFile(__dirname + '/loaderio.txt');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})