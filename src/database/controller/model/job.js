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
  searchPost: (data, callback) => {
    data.jobs.map((job, i) => {
      job.description = JSON.stringify(job.description.replace(/<(?:.|\n)*?>/gm, ''));
      const subquery = `SELECT id FROM Company WHERE name = '${job.company.name}'`;
      const check =  `SELECT * FROM Job WHERE name = '${job.title}'`
      const sql = `INSERT INTO Job (userId, companyId, name, description, priority, source, status, link) VALUES (1, (${subquery}), '${job.title}', ${job.description}, 3, 'Search', 'Will Apply', '${job.apply_url}')`;
      db.query(check, (err, results) => {
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting job in db', job.title);
          })
        } else {
          console.log('not posting job in db', job.title);
        }
      });
    })
    callback('finished')
  },
};
