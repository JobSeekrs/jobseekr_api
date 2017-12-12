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
};