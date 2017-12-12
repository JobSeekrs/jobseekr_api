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
    data.jobs.map((job, i) => {
      const subsquery = `SELECT id from company where name = '${job.company.name}'`;
      const sqll = "INSERT INTO job (companyId, name, description, city, state) VALUES ("+ subquery + ',' + job.company.name + "', '" + job.description + "', '" + job.company.location.city + "', '" + job.company.location.state + "')";
      const sql = `INSERT INTO Job (companyId, name, description, city, state) VALUES ('${subquery}', '${job.company.name}', '${job.description}', '${job.company.location.city}', '${job.company.location.state}')`;
      db.query(sql, (err, results) => {
        callback(err, results);
      });
    })
  },
};
