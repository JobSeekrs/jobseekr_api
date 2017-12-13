import { log, debug } from '../../'
import db from '../';

const TYPE = 'event';

export default  {
  get: (req, res) => {
    if (Object.keys(req.query).length === 0) {
      db.model[TYPE].getAll((err, data) => {
        res.status(200).send(data);
      });
    } else if (req.query.id && Object.keys(req.query).length === 1) {
      db.model[TYPE].get(req.query.id,(err, data) => {
        res.status(200).send(data);
      });
    } else {
      db.model[TYPE].query(req.query, (err, data) => {
        res.status(200).send(data);	
      });  
    };
  },
  post: (req, res) => {
    db.model[TYPE].post(req.body, (err, data) => {
      res.status(200).send(data);
    });
  }
};
