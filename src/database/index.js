import { log, debug } from '../';
import mysql from 'mysql2';
import { createDb, seedDb } from './init';
export let db;

export const initializeDb = (callback) => {
  //Do not alter this constant
  const noDbMsg = `Unknown database '${process.env.DB_NAME.toLowerCase()}'`;
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      multipleStatements: true,
    });
    log('- Connecting to DBMS...');
    connection.connect((err) => {
      if (err) {
        throw err;
      } else {
        log('  ...MySql connected\n');
        db = connection;
        log(`- Checking for DB...`);
        db.query(`USE ${process.env.DB_NAME}`, (err) => {
          if (err) {
            if (err.sqlMessage !== noDbMsg) {
              throw err;
            } else {
              log('  ...No DB found, creating...');
              createDb((err) => {
                if (err) {
                  throw err;
                } else {
                  log(`  ...${process.env.DB_NAME} DB created\n`);
                  seedDb((err) => {
                    if (err) {
                      throw err;
                    } else {
                      callback();
                    }
                  });
                }
              });
            }
          } else {
            log(`  ...${process.env.DB_NAME} DB found\n`);
            seedDb((err) => {
              if (err) {
                throw err;
              } else {
                callback();
              }
            });
          }
        });
      }
    });
  } catch (err) {
    callback(err);
  }
};
