import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import router from './router';
import { initializeDb } from './database';


dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());
// app.use(router);

app.listen(port, () => {
  console.log(`rest-server listening on port ${port}`);
});

initializeDb((err) => {
  if (err) {
    console.error('Error initializing DB:', err);
  } else {
    console.log('Database initialized');
  }
});

module.exports = app;
