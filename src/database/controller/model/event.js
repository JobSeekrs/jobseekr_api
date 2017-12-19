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
    const sql = "INSERT INTO event (jobId, contactId, name, type, timeStamp) VALUES (" + data.jobId + ", " + data.contactId + ", '" + data.eventName + "', '" + data.eventType + "', CURRENT_TIMESTAMP())";
    db.query(sql, (err, results) => {
      console.log('in db event', results);
      callback(err, results);
    });
  },
  activityLogGet: (data, callback) => {
    console.log('this is jobid', data.jobId);
    const sql = `SELECT * from event WHERE jobId = ${data.jobId}`;
    db.query(sql, (err, results) => {
      console.log('getting all data from event table for activity table', results);
      callback(err, results);
    });
  },
  activityLogPost: (data, callback) => {
    console.log('this is the events data', data);
    console.log('this ist time', data.timeStamp.split('T').join(' ').split('.')[0])
    const sql = `INSERT INTO event (jobId, name, notes, type, timeStamp) VALUES (${data.jobId}, '${data.name}', '${data.notes}', '${data.type}', '${data.timeStamp.split('T').join(' ').split('.')[0]}')`;
    db.query(sql, (err, results) => {
      callback(err, results);
    });
  },
};
