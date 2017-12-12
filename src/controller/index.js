import { log, debug } from '../'
import request from 'request';
import db from '../database/controller';
import company from './local/company';
import contact from './local/contact';
import event from './local/event';
import job from './local/job';
import dashboard from './local/dashboard';

import resource from './local/resource';
import user from './local/user';
import github from './external-api/github.js';

export default {
  model: db,
  company: company,
  contact: contact,
  event: event,
  job: job,
  resource: resource,
  user: user,
<<<<<<< HEAD
  github: github
};
=======
  github: github,
  dashboard: dashboard,
};
>>>>>>> home page dashboard DB query update
