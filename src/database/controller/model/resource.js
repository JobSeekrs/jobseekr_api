import { log, debug } from '../../../';
import { db } from '../../';
import helper from '../helper';

const TABLE = 'Resource';

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
};
