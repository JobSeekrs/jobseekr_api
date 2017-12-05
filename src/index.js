import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());

app.listen(port, () => {
  console.log(`rest-server listening on port ${port}`);
});

module.exports = app;
