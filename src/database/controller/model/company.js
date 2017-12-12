import { log, debug } from '../../../'
import { db } from '../../';
import helper from '../helper';

const TABLE = 'Company';

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
    console.log('this is jobs', typeof data.jobs[0].company.name);
    data.jobs.map((job, i) => {
      const sql = `INSERT INTO ${TABLE} (userId, name, description, city, state) VALUES (1, '${job.company.name}', '${job.description}', '${job.company.location.city}', '${job.company.location.state}')`
      db.query(sql, (err, results) => {
        callback(err, results);
      });
    })
  },
};