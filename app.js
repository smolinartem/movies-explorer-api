import express from 'express';

const app = express();

function start(port) {
  try {
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
}
start(3000);
