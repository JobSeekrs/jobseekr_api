import express from 'express';
import controller from '../controller/index';
const Router = express.Router();

Router.post('/github', controller.github);

module.exports = Router;
