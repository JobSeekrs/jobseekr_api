import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import Router from './router/index';
import { initializeDb } from './database';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', Router);

dotenv.config();
const port = process.env.PORT;
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
