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
  searchPost: (data, callback) => {
    data.jobs.map((job, i) => {
      const check = `SELECT * from company where name = '${job.company.name}'`
      const sql = `INSERT INTO ${TABLE} (userId, name, city, state) VALUES (1, '${job.company.name}', '${job.company.location.city}', '${job.company.location.state}')`
      db.query(check, (err, results) => {
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting in db');
          })
        } else {
          console.log('not posting in db');
        }
      })
    })
    callback('finished');
  },
};