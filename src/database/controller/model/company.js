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
    console.log('in company post db', data);
    const sql = "INSERT INTO company (userId, name, description, notes, phone, address1, address2, city, state, zip) VALUES (1, '" + data.companyName + "', '" + data.companyDescription + "', 'na', '" + data.companyPhone + "', '" + data.companyAddress1 + "', '" + data.companyAddress2 + "', '" + data.companyCity + "', '" + data.companyState + "', '" + data.companyZip + "')";
    db.query(sql, (err, results) => {
      console.log('in db company', results);
      callback(err, results);
    });
  },
  searchPost: (data, callback) => {
    data.jobs.map((job, i) => {
      const check = `SELECT * from company where name = '${job.company.name}'`
      if (job.company.location === undefined) {
        job.company.location.city = null;
        job.company.location.state = null
      }
      const sql = `INSERT INTO ${TABLE} (userId, name, city, state) VALUES (1, '${job.company.name}', '${job.company.location.city}', '${job.company.location.state}')`
      db.query(check, (err, results) => {
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting company in db', job.company.name);
          })
        } else {
          console.log('not posting company in db', job.company.name);
        }
      })
    })
    callback('finished');
  },
};