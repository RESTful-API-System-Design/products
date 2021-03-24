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

app.get('loaderio-34d53e0a16f3b0376dd16b6db07fb425/', (req, res) => {
  res.send('./loaderio.txt');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// scp -i ./SDC.pem /Users/adnannoori/sdc/products/data/skus.csv ubuntu@ec2-18-144-47-101.us-west-1.compute.amazonaws.com:./products/data

// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000