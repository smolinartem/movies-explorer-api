require('dotenv').config();

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'secret-key',
  NODE_ENV,
} = process.env;

module.exports = {
  PORT, DB_URL, JWT_SECRET, NODE_ENV,
};
