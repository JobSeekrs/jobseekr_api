import { db } from './../../';
import helper from './../helper';

const TABLE = 'user';

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
    db.query(sql, (err, data) => {
      callback(err, data);
    }); 
  },
  addOne: (object, callback) => {
    const cols = Object.keys(object).join(', ');
    const values = `"${Object.values(object).join('", "')}"`;
    const sql = `INSERT INTO ${TABLE} (${cols}) VALUES (${values}) ;`;
    db.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  addMany: (array, callback) => {
    const cols = Object.keys(array[0]).join(', ');
    const values = `\"${Object.values(object).join('", "')}\"`;
    const sql = `INSERT INTO ${TABLE} (${cols}) VALUES ?;`;
    db.query(sql, [data], (err, data) => {
      callback(err, data);
    });
  }
};