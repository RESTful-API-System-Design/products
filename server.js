const express = require('express');
const mySQLRoutes = require('./api/routes/productRoute.js');
const mongoRoutes = require('./api/routes/mongoRoute.js');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mySQLRoutes(app);
// mongoRoutes(app);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})



