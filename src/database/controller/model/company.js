import { log, debug } from '../../../';
import { db } from '../../';
import helper from '../helper';

const TABLE = 'Company';

export default {
  getAll: (userId, callback) => {
    const sql = `SELECT * 
                  FROM ${TABLE}
                  WHERE userId=${userId}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  get: (id, callback) => {
    const sql = `SELECT * 
                  FROM ${TABLE} 
                  WHERE id=${id}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  query: (queryString, callback) => {
    const sql = `SELECT * 
                  FROM ${TABLE} 
                  WHERE ${helper.where(queryString)}`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  post: (userId, data, callback) => {
    debug('in company post db', data);
    const sql =
      `INSERT INTO company (userId, name, description,
          notes, phone, address1, address2, city, state, zip) 
        VALUES (${userId}, 
          '${data.companyName}', '${data.companyDescription}', 'na', 
          '${data.companyPhone}', '${data.companyAddress1}', '${data.companyAddress2}', 
          '${data.companyCity}', '${data.companyState}', '${data.companyZip}')`;
    db.query(sql, (err, results) => {
      debug('in db company', results);
      callback(err, results);
    });
  },
  searchPost: (userId, data, callback) => {
    data.jobs.map((job, i) => {
      console.log('this is userId', userId);
      const check = `SELECT * from company where name = '${job.company.name}'`;
      if (job.company.location === undefined) {
        job.company.location = {
          city: null,
          state: null,
        };
      }
      const sql =
        `INSERT INTO ${TABLE} (userId, name, city, state) 
          VALUES (${userId}, '${job.company.name}', 
              '${job.company.location.city}', 
              '${job.company.location.state}')`;
      debug('company post sql', sql);
      db.query(check, (err, results) => {
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            debug('posting company in db', job.company.name);
          });
        } else {
          debug('not posting company in db', job.company.name);
        }
      });
    });
    callback('finished');
  },
};
