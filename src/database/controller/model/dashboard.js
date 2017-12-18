import { db } from './../../';
import dashboardGet from './custom/dashboardGet';

export default {
  get: (userId, callback) => {
    const sql = dashboardGet(userId);
    db.query(sql, (err, data) => {
      // console.log(sql);
      callback(err, data);
    });
  },
};
