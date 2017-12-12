import { log, debug } from '../../../'
import { db } from '../../';
import helper from '../helper';

const TABLE = 'contact';

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
    console.log('in contact post db', data);
    const sql = "INSERT INTO contact (userId, companyId, firstName, lastName, title, notes, email, phone) VALUES (1, " + data.companyId + ", '" + data.contactFirstName + "', '" + data.contactLastName + "', '" + data.contactTitle + "', 'na', '" + data.contactEmail + "', '" + data.contactPhone + "')";
    db.query(sql, (err, results) => {
      console.log('in db contact', results);
      callback(err, results);
    });
  },
};