import { log, debug } from '../'
import express from 'express';
import controller from '../controller';
import authentication from '../helper/authentication';

const router = express.Router();
const validateJWT = authentication.validateJWT;


// debug('FUNCTION', authentication.validateJWT)

router.route('/signup')
  .post(controller.user.signup);

router.route('/login')
  .post(controller.user.login);

router.route('/github')
  .post(validateJWT, controller.github.post);

router.route('/user')
  .get(validateJWT, controller.user.get);
  // .post()
  // .put()
  // .delete();

router.route('/company')
  .get(validateJWT, controller.company.get);
//   .post()
//   .put()
//   .delete();

router.route('/contact')
  .get(validateJWT, controller.contact.get)
//   .post()
//   .put()
//   .delete();

router.route('/job')
  .get(validateJWT, controller.job.get);
//   .post() 
//   .put()
//   .delete();

router.route('/event')
  .get(validateJWT, controller.event.get);
//   .post()
//   .put()
//   .delete();

router.route('/resource')
  .get(validateJWT, controller.resource.get);
//   .post()
//   .put()
//   .delete();

export default router;

