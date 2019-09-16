
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());


connectDB();

const art = require('./routes/api/art');
app.use('/api/art', art);


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));