import path from 'path';
import fs from 'fs';
import { database } from './../';
import users from './seed/user.json';
import companies from './seed/company.json';
import jobs from './seed/job.json';
import contacts from './seed/contact.json';
import events from './seed/event.json';

export const createDb = (callback) => {
  try {
    const filePath = path.join(__dirname, '/schema.sql');
    const fileData = fs.readFileSync(filePath).toString();
    const schema = fileData
      .trim()
      .replace(/\s\s+/g, ' ')
      .split(';')
      .map(line => line.trim());
    schema.forEach((sql) => {
      if (sql) {
        database.query(sql, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
    callback();
  } catch (err) {
    callback(err);
  }
};

const insert = (table, cols, data) => {
  const sql = `INSERT INTO ${table} (${cols}) VALUES ?;`;
  database.query(sql, [data], (err) => {
    if (err) throw err;
  });
};

export const seedDb = (callback) => {
  console.log('Checking for data in DB...');
  try {
    database.query('select count(*) as count from user', (err, msg) => {
      if (msg[0].count === 0) {
        console.log('No data in DB, seeding data...');
        insert('User', users.cols.join(','), users.data);
        insert('Company', companies.cols.join(','), companies.data);
        insert('Job', jobs.cols.join(','), jobs.data);
        insert('Contact', contacts.cols.join(','), contacts.data);
        insert('Event', events.cols.join(','), events.data);
        console.log('DB seeded, system online');
      } else {
        console.log('Data found, system online');
      }
    });
    callback();
  } catch (err) {
    callback(err);
  }

};
