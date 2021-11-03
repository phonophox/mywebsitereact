// Requirments
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require("path");
const http = require('http');
const cors = require('cors');

// Define the port we will use locally
const port = process.env.PORT || 8082;

const app = express();

require("dotenv").config();

// Tell the app to use cors and bodyParser
// TODO figure out why
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "mern-client", "build")));

// Async call to db connecting on URI specified in config/default.json
connectDB();

// Specify API routes
const art = require('./routes/api/art');
app.use('/api/art', art);

// Specify API routes
//const art = require('./routes/api/harvard');
//app.use('/api/harvard', harvard);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "mern-client", "build", "index.html"));
});

// Define the server
var server = http.createServer(app);

// Start the server
function startServer() {
    app.mernsite = server.listen(port, () => console.log(`Server running on port ${port}`));
}
setImmediate(startServer);


exports = module.exports = app;
