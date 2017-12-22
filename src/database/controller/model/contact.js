import { log, debug } from '../../../';
import { db } from '../../';
import helper from '../helper';

const TABLE = 'Contact';

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
<<<<<<< HEAD
  post: (userId, companyId, data, callback) => {
    debug('in contact post db', data);
    const sql =
      `INSERT INTO Contact (userId, companyId, firstName, 
          lastName, title, notes, email, phone) 
        VALUES (${userId}, ${companyId}, '${data.contactFirstName}', 
          '${data.contactLastName}', '${data.contactTitle}' 'na', 
          '${data.contactEmail}', '${data.contactPhone}')`;
=======
  post: (data, callback) => {
    console.log('in contact post db', data);
    const sql = "INSERT INTO contact (userId, companyId, firstName, lastName, title, notes, email, phone) VALUES (1, " + data.companyId + ", '" + data.contactFirstName + "', '" + data.contactLastName + "', '" + data.contactTitle + "', 'na', '" + data.contactEmail + "', '" + data.contactPhone + "')";
>>>>>>> [fix]
    db.query(sql, (err, results) => {
      debug('in db contact', results);
      callback(err, results);
    });
  },
};
