import logger from './helper/logger';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import Router from './router/index';
import { initializeDb } from './database';

export const log = logger.log;
export const debug = logger.debug;
export const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", 
  "Authorization, UserId, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', Router);

log('-------------------------------');
log(`- Starting API server...`);
app.listen(port, (err) => {
  if(err) {
    log('** FATAL: Error starting Express Server **');
  } else {
    log(`  ...Express serving port ${port}\n`);
    initializeDb(err => {
      if (err) {
        log('** FATAL: Error initializing DB:', err);
      } else {
        log('   -- SYSTEM ONLINE --');
        log('-------------------------------');
      }
    });
  }
});

