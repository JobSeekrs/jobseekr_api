import { log, debug } from '../../../';
import { db } from '../../';
import helper from '../helper';

const TABLE = 'Job';

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
  post: (data, callback) => {
    // console.log('in job post db', data);
    const sql = "INSERT INTO job (companyId, name, description, notes, source, status, priority, deadline, link) VALUES (1, '" + data.jobTitle + "', '" + data.jobDescription + "', '" + data.jobNotes + "', '" + data.jobSource + "', '" + data.jobStatus + "', " + data.jobPriority + ", '" + data.jobDeadline.split('T').join(' ').split('.')[0] + "', '" + data.jobLink + "')";
    // console.log('in jobs db query', sql);
    db.query(sql, (err, results) => {
      // console.log('in db job', results);
      callback(err, results);
    });
  },
  searchPost: (userId, data, callback) => {
    debug('USER ID in DB search post', userId);
    // debug('DATA', data)
    data.jobs.map((job, i) => {
      job.description = JSON.stringify(job.description.replace(/<(?:.|\n)*?>/gm, ''));
      console.log('this is the job', job)
      const subquery = `SELECT id FROM Company WHERE name = '${job.company.name}'`;
      const subquery2 = `SELECT id from Job WHERE name = '${job.title}'`;
      const check =  `SELECT * FROM Job WHERE name = '${job.title}'`;
      const sql = `INSERT INTO Job (companyId, name, description, priority, notes, source, status, link) VALUES ((${subquery}), '${job.title}', ${job.description}, 3, '', 'Search', 'Will Apply', '${job.apply_url}')`;
      const sql2 = `INSERT INTO Event (jobId, name, notes, timeStamp, type) VALUES ((${subquery2}), 'Created', '', CURRENT_TIMESTAMP(), 'Searched')`;  
      const sql3 = `INSERT INTO Contact (userId, companyId, firstName, lastName) VALUES (${userId}, (${subquery}), 'N/A', 'N/A')`;
      db.query(check, (err, results) => {
        if (results.length === 0) {
          // debug('hitting')
          db.query(sql, (err, results) => {
            // debug('posting job in db', job.title);
            db.query(sql2, (err, results) => {
              // debug('posting into event', job.title);
            });
            db.query(sql3, (err, results) => {
              // debug('posting into contact', job.title);
            });
          });
        } else {
          // debug('not posting job in db', job.title);
        }
      });
    });
    callback('finished');
  },

  manualAdd: (userId, data, callback) => {

    debug('USERID', userId);
    debug('DATA', data);

    const postData = data;
    let sql;

    try {
      db.beginTransaction((err) => {
        if (err) throw err;

        postData.company.userId = userId;
        sql = helper.insertOne('company', postData.company);
        db.query(sql, (err, company) => {
          if (err) throw err;
          debug('company insert', company, 'ERR', err);

          postData.job.companyId = company.insertId;
          sql = helper.insertOne('job', postData.job);
          db.query(sql, (err, job) => {
            if (err) throw err;
            debug('job insert', job, 'ERR', err);

            postData.contact.userId = userId;
            postData.contact.companyId = company.insertId;
            sql = helper.insertOne('contact', postData.contact);
            db.query(sql, (err, contact) => {
              if (err) throw err;
              debug('contact insert', contact, 'ERR', err);

              postData.event.jobId = job.insertId;
              postData.event.contactId = contact.insertId;
              sql = helper.insertOne('event', postData.event);
              db.query(sql, (err, event) => {
                if (err) throw err;
                debug('event insert', event, 'ERR', err);

                db.commit((err, msg) => {
                  if (err) throw err;
                  debug('COMMIT', err, msg);
                  callback(null, true);
                });
              });
            });
          });
        });
      });
    } catch (err) {
      db.rollback((err, msg) => {
        debug('ROLLBACK', err, msg);
        callback(err);
      });
    }
  },
};







