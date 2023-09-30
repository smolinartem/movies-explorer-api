const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { PORT, DB_URL } = require('./config');

const { register, login, exit } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

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

app.use(requestLogger);

app.post('/signup', register);
app.post('/signin', login);
app.post('/signout', exit);

app.use(auth);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use(errorLogger);
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
