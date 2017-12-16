import { db } from './../../';
import jobDetailsNotes from './custom/jobDetailsNotes/jobDetailsNotes';
import jobDetailsEvents from './custom/jobDetailsNotes/jobDetailsEvents';

export default {
  put: (data, callback) => {
    const sql = jobDetailsNotes(data.jobId, data.jobNotes);
    db.query(sql, (err, data) => {
      console.log(sql);
      callback(err, data);
    });      
  },
  post: (data, callback) => {
    const sql = jobDetailsEvents(data.jobId);
    db.query(sql, (err, data) => {
      console.log(sql);
      callback(err, data);
    });      
  },
};