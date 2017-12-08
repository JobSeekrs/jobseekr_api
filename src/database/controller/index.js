<<<<<<< HEAD
import { log, debug } from '../../'
import { db } from '../';
import company from './model/company'
import contact from './model/contact'
import event from './model/event'
import job from './model/job'
import user from './model/user'
import resource from './model/resource'

const model = {
  db: db,
=======
import { database } from './../';
import company from './model/company';
import contact from './model/contact';
import event from './model/event';
import job from './model/job';
import user from './model/user';
import resource from './model/resource';

const model = {
  database: database,
>>>>>>> [add]
  company: company,
  contact: contact,
  event: event,
  job: job,
  resource: resource,
  user: user,
<<<<<<< HEAD
}

export default model;
=======
};

export default model;
>>>>>>> [add]
