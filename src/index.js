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

console.log(`\n- Starting API server...`);
app.listen(port, (err) => {
  if(err) {
    console.error('** FATAL: Error starting Express Server **');
  } else {
    console.log(`  ...Express serving port ${port}\n`);
    initializeDb(err => {
      if (err) {
        console.error('** FATAL: Error initializing DB:', err);
      } else {
        console.log('---System Online---\n');
      }
    });
  }
});


module.exports = app;
