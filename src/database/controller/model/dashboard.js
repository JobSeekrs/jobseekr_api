import { db } from './../../';

export default {
  get: (callback) => {
    const sql = `SELECT j.id, j.status, j.priority as rating, CAST(j.deadline as DATE) as deadline, j.link as url, j.name as job_title_name, c.name as company_name, MIN(CAST(e.timeStamp as DATE)) as created_date FROM Job j INNER JOIN Company c on j.companyId = c.id INNER JOIN Event e on j.id = e.jobId GROUP BY j.id, c.name;`
    db.query(sql, (err, data) => {
      console.log(sql);
      callback(err, data);
    });      
  },
};

