
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require("path");
const port = process.env.PORT || 8082;


const app = express();
const http = require('http');
var cors = require('cors');

var server = http.createServer(app);

require("dotenv").config();



app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "mern-client", "build")));

connectDB();

const art = require('./routes/api/art');
app.use('/api/art', art);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "mern-client", "build", "index.html"));
});
function startServer() {
app.mernsite = server.listen(port, () => console.log(`Server running on port ${port}`));

}
setImmediate(startServer);



exports = module.exports = app;
