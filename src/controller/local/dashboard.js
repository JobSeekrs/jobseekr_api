import { log, debug } from '../../';
import db from './../';

const TYPE = 'dashboard';

export default {

  get: (req, res) => {
		debug('DASHBOARD controller - headers user id', req.headers.userid)
    db.model[TYPE].get(req.headers.userid, (err, data) => {
      res.status(200).send(data);
    });
  },
};
