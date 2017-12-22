import { log, debug } from '../../'
import path from 'path';
import fs from 'fs';
import { db } from '../';
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
        db.query(sql, (err) => {
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
  db.query(sql, [data], (err) => {
    if (err) throw err;
  });
};

export const seedDb = (callback) => {
  log('- Checking for data...');
  try {
    db.query('select count(*) as count from User', (err, msg) => {
      if (msg[0].count === 0) {
        log('  ...No data found, seeding DB...');
        insert('User', users.cols.join(','), users.data);
        insert('Company', companies.cols.join(','), companies.data);
        insert('Job', jobs.cols.join(','), jobs.data);
        insert('Contact', contacts.cols.join(','), contacts.data);
        insert('Event', events.cols.join(','), events.data);
        log('  ...DB seeded\n');
        callback();
      } else {
        log('  ...Table data found\n');
        callback();
      }
    }); 
  } catch (err) {
    callback(err);
  }

};
