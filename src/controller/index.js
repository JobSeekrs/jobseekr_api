import request from 'request';
import data from './../database/controller';
import company from './internal/company';
import contact from './internal/contact';
import event from './internal/event';
import job from './internal/job';
import resource from './internal/resource';
import user from './internal/user';
import github from './external/github.js';

export default {
  model: data,
  company: company,
  contact: contact,
  event: event,
  job: job,
  resource: resource,
  user: user,
  github: github
};