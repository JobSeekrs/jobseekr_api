import mysql from 'mysql2';
import { createDb, seedDb } from './init';

export let database;

export const initializeDb = (callback) => {
  const noDbMsg = `Unknown database '${process.env.DB_NAME.toLowerCase()}'`;

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      multipleStatements: true,
    });
    connection.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log('MySql connected');
        database = connection;
        database.query(`USE ${process.env.DB_NAME}`, (err) => {
          if (err) {
            if (err.sqlMessage !== noDbMsg) {
              throw err;
            } else {
              console.log('No DB, creating...');
              createDb((err) => {
                if (err) {
                  throw err;
                } else {
                  console.log('DB created');
                  seedDb((err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              });
            }
          } else {
            console.log('DB found');
            seedDb((err) => {
              if (err) {
                throw err;
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
