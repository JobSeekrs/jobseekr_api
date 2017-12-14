import { log, debug } from '../../../'
import { db } from '../../';
import helper from '../helper';

const TABLE = 'job';

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
    console.log('in job post db', data);
    const sql = "INSERT INTO job (companyId, name, description, notes, source, status, priority, deadline, link) VALUES (1, '" + data.jobTitle + "', '" + data.jobDescription + "', '" + data.jobNotes + "', '" + data.jobSource + "', '" + data.jobStatus + "', " + data.jobPriority + ", '" + data.jobDeadline.split('T').join(' ').split('.')[0] + "', '" + data.jobLink + "')";
    console.log('in jobs db query', sql);
    db.query(sql, (err, results) => {
      console.log('in db job', results);
      callback(err, results);
    });
  },
  searchPost: (data, callback) => {
    data.jobs.map((job, i) => {
      job.description = JSON.stringify(job.description.replace(/<(?:.|\n)*?>/gm, ''));
      const subquery = `SELECT id FROM Company WHERE name = '${job.company.name}'`;
      const subquery2 = `SELECT id from Job WHERE name = '${job.title}'`
      const check =  `SELECT * FROM Job WHERE name = '${job.title}'`
      const sql = `INSERT INTO Job (userId, companyId, name, description, priority, source, status, link) VALUES (1, (${subquery}), '${job.title}', ${job.description}, 3, 'Search', 'Will Apply', '${job.apply_url}')`;
      const sql2 = `INSERT INTO Event (jobId, name, type) VALUES ((${subquery2}), 'Created', 'Searched')`;
      db.query(check, (err, results) => {
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting job in db', job.title);
            db.query(sql2, (err, results) => {
              console.log('posting into event', job.title);
            })
          })
        } else {
          console.log('not posting job in db', job.title);
        }
      });
    })
    callback('finished')
  },
};
