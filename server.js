const express = require("express");
const logger = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:4200', 'https://erderkage.nu'],
  optionsSuccessStatus: 200
};
const mongoose = require('mongoose');
const apiRouter = require('./server/routes/api');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/erderkagenu", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
//  db.dropDatabase();
  console.log("Database connection ready");

  const server = app.listen(process.env.PORT || 3000, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});


function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.use('/api', apiRouter);

module.exports = app;
