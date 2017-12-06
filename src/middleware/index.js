import express from 'express';
const Router = express.Router();
import controller from '../controllers/index';

Router.post('/github', controller.github);

module.exports = Router;

