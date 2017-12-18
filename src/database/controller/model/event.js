import { log, debug } from '../../../';
import { db } from '../../';
import helper from '../helper';

const TABLE = 'Event';

export default {
  getAll: (userId, callback) => {
    const sql = `SELECT * 
                  FROM ${TABLE}
                  WHERE userId=${userId}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  get: (id, callback) => {
    const sql = `SELECT * 
                  FROM ${TABLE} 
                  WHERE id=${id}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  query: (queryString, callback) => {
    const sql = `SELECT * 
                  FROM ${TABLE} 
                  WHERE ${helper.where(queryString)}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  post: (data, callback) => {
    debug('in event post db', data);
    const sql =
      `INSERT INTO event (jobId, contactId, name, type, timeStamp) 
        VALUES (${data.jobId}, ${data.contactId}, 
          '${data.eventName}', '${data.eventType}', ${Date.now()})`;
    db.query(sql, (err, results) => {
      debug('in db event', results);
      callback(err, results);
    });
  },
};
