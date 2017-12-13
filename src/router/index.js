
import express from 'express';
import { log, debug } from '../';
import auth from '../helper/authentication';
import controller from '../controller';


const router = express.Router();
const validateJWT = auth.validateJWT;

router.route('/signup')
  .post(controller.user.signup);

router.route('/login')
  .post(controller.user.login);

// router.route('/github')
//   .post(controller.github.post);

// router.route('/user')
//   .get(controller.user.get);
//   // .post()
//   // .put()
//   // .delete();

// router.route('/company')
//   .get(controller.company.get)
//   .post(controller.company.post)
//   //   .put()
//   //   .delete();
//   .get(validateJWT, controller.company.get);
// //   .post()
//   .get(controller.company.get)
//   .post(controller.company.post);
// //   .put()
// //   .delete();

// router.route('/company/search')
// .post(controller.company.searchPost);

// router.route('/contact')
//   .get(controller.contact.get)
//   .post(controller.contact.post)
//   //   .put()
//   //   .delete();

// router.route('/job')
//   .get(controller.job.get)
//   .post(controller.job.post)
//   //   .put()
//   //   .delete();

// router.route('/dashboard')
//   .get(controller.dashboard.get);
//   .get(validateJWT, controller.job.get);
// //   .post() 
//   .get(controller.job.get)
//   .post(controller.job.post); 
// //   .put()
// //   .delete();
// router.route('/job/search')
// .post(controller.job.searchPost);

// router.route('/event')
//   .get(controller.event.get)
//   //   .post()
//   //   .put()
//   //   .delete();

// router.route('/resource')
//   .get(controller.resource.get);
//   //   .post()
//   //   .put()
//   //   .delete();
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
//   .get(validateJWT, controller.event.get)

router.route('/company')
//   .put()
//   .delete();

router.route('/company/search')
.post(controller.company.searchPost);

router.route('/contact')
  .get(validateJWT, controller.contact.get)
  .post(validateJWT, controller.contact.post);
//   .put()
//   .delete();

router.route('/job')
  .get(validateJWT, controller.job.get)
  .post(validateJWT, controller.job.post);
//   .put()
//   .delete();

router.route('/dashboard')
  .get(validateJWT, controller.dashboard.get);
//   .post()
//   .put()
//   .delete();
router.route('/job/search')
.post(controller.job.searchPost);

router.route('/event')
  .get(validateJWT, controller.event.get)
  .post(validateJWT, controller.event.post);
// .put()
// .delete();

router.route('/resource')
  .get(validateJWT, controller.resource.get);
//   .post()
//   .put()
//   .delete();

export default router;

