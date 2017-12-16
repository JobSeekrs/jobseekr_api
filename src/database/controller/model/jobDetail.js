import { db } from './../../';
import jobDetailGet from './custom/jobDetailGet';

export default {
  get: (data, callback) => {
    const sql = jobDetailGet(data.jobId);
    db.query(sql, (err, data) => {
      console.log(sql);
      callback(err, data);
    });      
  },
};