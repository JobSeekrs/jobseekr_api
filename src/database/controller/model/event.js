import { database } from './../../';
import helper from './../helper';

const TABLE = 'event';

export default {
  getAll: (callback) => {
    const sql = `SELECT * FROM ${TABLE}`;
    database.query(sql, (err, data) => {
      callback(err, data);
    });
  },
  get: (id, callback) => {
    const sql = `SELECT * FROM $${TABLE} WHERE id=${id}`;
    database.query(sql, (err, data) => {
      callback(err, data);
    });      
  },
  query: (queryString, callback) => {
    const sql = `SELECT * FROM ${TABLE} ${helper.where(queryString)}`;
    database.query(sql, (err, data) => {
      callback(err, data);
    });       
  },
};