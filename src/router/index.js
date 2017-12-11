import express from 'express';
import controller from '../controller';
import { validateJWT } from '../helper/authentication.js';

const router = express.Router();

router.route('/signup')
  .post(controller.user.signup);

router.route('/login')
  .post(controller.user.login);

  router.route('/user')
  .get(controller.user.get);
  // .post()
  // .put()
  // .delete();

router.route('/company')
  .get(controller.company.get);
//   .post()
//   .put()
//   .delete();

router.route('/contact')
  .get(controller.contact.get)
//   .post()
//   .put()
//   .delete();

router.route('/job')
  .get(controller.job.get);
//   .post() 
//   .put()
//   .delete();

router.route('/event')
  .get(controller.event.get);
//   .post()
//   .put()
//   .delete();

router.route('/resource')
  .get(controller.resource.get);
//   .post()
//   .put()
//   .delete();

router.route('/github')
  .post(controller.github.post);

export default router;

