import express from 'express';
import controller from '../controller';

const Router = express.Router();

Router.post('/github', controller.github);

// router.get('/company', controller.company.get);
// router.post('/company', controller.company.post);

// router.get('/contact', controller.contact.get);
// router.post('/contact', controller.contact.post);

// router.get('/event', controller.event.get);
// router.post('/event', controller.event.post);

// router.get('/job', controller.job.get);
// router.post('/job', controller.job.post);

// router.get('/resource', controller.resource.get);
// router.post('/resource', controller.resource.post);

// router.get('/user', controller.user.get);
// router.post('/user', controller.user.post);

export default Router;

