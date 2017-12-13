import { log, debug } from '../../'
import { db } from '../';
import company from './model/company'
import contact from './model/contact'
import event from './model/event'
import job from './model/job'
import user from './model/user'
import resource from './model/resource'
import dashboard from './model/dashboard'

const model = {
  db: db,
  company: company,
  contact: contact,
  event: event,
  job: job,
  resource: resource,
  user: user,
  dashboard: dashboard,
}

export default model;
