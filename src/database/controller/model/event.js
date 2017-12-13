import { log, debug } from '../../../'
import { db } from '../../';
import helper from '../helper';

const TABLE = 'event';

export default {
  getAll: (callback) => {
    const sql = `SELECT * FROM ${TABLE}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  get: (id, callback) => {
    const sql = `SELECT * FROM $${TABLE} WHERE id=${id}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });      
  },
  query: (queryString, callback) => {
    const sql = `SELECT * FROM ${TABLE} ${helper.where(queryString)}`;
    console.log('sql', sql)
    db.query(sql, (err, data) => {
      callback(err, data);
    }); 
  },
  post: (data, callback) => {
    console.log('in event post db', data);
    const sql = "INSERT INTO event (jobId, name, type, timeStamp) VALUES (" + data.jobId + ", '" + data.eventName + "', '" + data.eventType + "', CURRENT_TIMESTAMP())";
    db.query(sql, (err, results) => {
      console.log('in db event', results);
      callback(err, results);
    });
  },
};