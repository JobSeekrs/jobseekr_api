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
      `INSERT INTO Event (jobId, contactId, name, type, timeStamp) 
        VALUES (${data.jobId}, ${data.contactId}, 
          '${data.eventName}', '${data.eventType}', ${Date.now()})`;
    db.query(sql, (err, results) => {
      console.log('in db event', results);
      callback(err, results);
    });
  },
  activityLogGet: (data, callback) => {
    const sql = `SELECT * from Event WHERE jobId = ${data.jobId}`;
    db.query(sql, (err, results) => {
      console.log('getting all data from event table for activity table', results);
      callback(err, results);
    });
  },
  activityLogPost: (data, callback) => {
    const dateTime = data.timeStamp.split('T').join(' ').split('.')[0];
    const sql = `
      INSERT INTO Event (jobId, name, notes, type, timeStamp)
      VALUES (${data.jobId}, '${data.name}', '${data.notes}', '${data.type}', '${dateTime}')
      `;
    db.query(sql, (err, results) => {
      debug('in db event', results);
      callback(err, results);
    });
  },
};
