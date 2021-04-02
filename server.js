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

// scp -i ./SDC.pem /Users/adnannoori/sdc/products/data/skus.csv ubuntu@ec2-18-144-47-101.us-west-1.compute.amazonaws.com:./products/data

// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000


// rs.initiate(
//   {
//     _id: "configrs",
//     members: [
//       { _id: 0, host : "13.57.205.218:27019" }
//     ]
//   }
// )

// mongod --replSet rs0 --port 27017 --bind_ip 0.0.0.0 --dbpath /srv/mongodb/rs0-0  --oplogSize 128

// rs.initiate({
//   _id : "rs0",
//   members: [
//      { _id: 0, host: "54.219.137.13" },
//      { _id: 1, host: "3.101.36.143" },
//      { _id: 2, host: "54.219.85.23" }
//   ]
// })

// mongo mongodb://54.219.137.13,3.101.36.143,54.219.85.23/?replicaSet=rs0