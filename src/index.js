import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import Router from './router/index';
import { initializeDb } from './database';



dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', Router);


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
