const { port } = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
let _port = port;
if (process.env.PORT) _port = Number(process.env.PORT);

// initialize database
require('./connections');
require('./models');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.info(req.method, req.url.slice(0, 25));
  next();
})

app.use([
  require('./routes/auth'),
]);

app.get('/health', (req, res) => res.json({ success: true }));

app.listen(_port, () => console.log(`Passwordlesss Auth listening on port ${_port}!`));
