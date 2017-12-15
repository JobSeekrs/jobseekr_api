import { db } from './../../';
import jobDetailGet from './custom/jobDetailGet';

export default {
  get: (callback) => {
    const sql = jobDetailGet(104);
    db.query(sql, (err, data) => {
      console.log(sql);
      callback(err, data);
    });      
  },
};