import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 3200;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`rest-server listening on port ${port}`)
});
