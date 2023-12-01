const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT, DB_URL } = require('./config');

const router = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const limiter = require('./middlewares/limiter');

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

app.use(
  cors({
    origin: [
      'https://api.movies.krutopognali.nomoredomainsrocks.ru',
      'http://api.movies.krutopognali.nomoredomainsrocks.ru',
      'http://movies.krutopognali.nomoredomainsrocks.ru',
      'https://movies.krutopognali.nomoredomainsrocks.ru',
    ],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(limiter);
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);

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
