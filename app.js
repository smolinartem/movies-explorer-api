const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { PORT, DB_URL } = require('./config');

const connectToMongoDB = async (path) => {
  try {
    await mongoose.connect(path);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};
connectToMongoDB(DB_URL);

const app = express();
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const startExpressApp = (port) => {
  try {
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
startExpressApp(PORT);
