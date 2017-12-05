import express from 'express';
import bodyParser from 'body-parser';
import Router from './routes/index';

const app = express();
const port = 3200;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', Router);

app.listen(port, () => {
  console.log(`rest-server listening on port ${port}`);
});

module.exports = app;