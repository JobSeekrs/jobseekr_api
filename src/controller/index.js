import { log, debug } from '../'
import request from 'request';
<<<<<<< HEAD
import db from '../database/controller';
import company from './local/company';
import contact from './local/contact';
import event from './local/event';
import job from './local/job';
import resource from './local/resource';
import user from './local/user';
import github from './external-api/github.js';
=======
import data from './../database/controller';
import company from './internal/company';
import contact from './internal/contact';
import event from './internal/event';
import job from './internal/job';
import resource from './internal/resource';
import user from './internal/user';
import github from './external/github.js';
>>>>>>> [add]

export default {
  model: db,
  company: company,
  contact: contact,
  event: event,
  job: job,
  resource: resource,
  user: user,
  github: github
<<<<<<< HEAD
};
=======
};
>>>>>>> [add]
