import { db } from './../../';
import dashboardGet from './custom/dashboardGet';

export default {
  get: (callback) => {
    const sql = dashboardGet();
    db.query(sql, (err, data) => {
      console.log(sql);
      callback(err, data);
    });      
  },
};